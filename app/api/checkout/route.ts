import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const TIER_PRICES: Record<string, { standard: string | undefined; founders: string | undefined }> = {
  foundation: {
    standard: process.env.STRIPE_PRICE_FOUNDATION,
    founders: process.env.STRIPE_PRICE_FOUNDATION_FOUNDERS,
  },
  growth: {
    standard: process.env.STRIPE_PRICE_GROWTH,
    founders: process.env.STRIPE_PRICE_GROWTH_FOUNDERS,
  },
  scale: {
    standard: process.env.STRIPE_PRICE_SCALE,
    founders: process.env.STRIPE_PRICE_SCALE_FOUNDERS,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { tier, isFounders, businessName, email, industry } = await req.json();

    if (!tier || !email) {
      return NextResponse.json({ error: 'Missing required fields: tier, email' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2026-02-25.clover' as const });

    const priceSet = TIER_PRICES[tier];
    if (!priceSet) {
      return NextResponse.json({ error: `Invalid tier: ${tier}` }, { status: 400 });
    }

    const priceId = isFounders ? priceSet.founders : priceSet.standard;
    if (!priceId) {
      return NextResponse.json(
        { error: `Stripe price not configured for tier=${tier} founders=${isFounders}` },
        { status: 500 }
      );
    }

    const origin = req.headers.get('origin') || 'https://autumn8.me';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          businessName: businessName || '',
          industry: industry || 'pest_control',
          tier,
          isFounders: isFounders ? '1' : '0',
        },
      },
      metadata: {
        businessName: businessName || '',
        industry: industry || 'pest_control',
        tier,
        isFounders: isFounders ? '1' : '0',
      },
      success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
