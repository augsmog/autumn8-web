import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Welcome to Autumn8
        </h1>
        <p className="text-text-secondary text-lg mb-8 leading-relaxed">
          You&apos;re all set. Check your inbox — we&apos;ll send onboarding instructions within the hour, and your operations will be live within 48 hours.
        </p>
        <div className="bg-surface border border-border rounded-xl p-6 mb-8 text-left space-y-3">
          <p className="text-text-secondary text-sm font-semibold text-text-primary">What happens next:</p>
          <div className="flex items-start gap-3 text-sm text-text-secondary">
            <span className="text-brand-orange font-bold">1.</span>
            <span>Check your email for setup instructions and GHL dashboard access</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-text-secondary">
            <span className="text-brand-orange font-bold">2.</span>
            <span>We configure your automations (takes 24–48 hours)</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-text-secondary">
            <span className="text-brand-orange font-bold">3.</span>
            <span>Book your kickoff call — we walk through everything together</span>
          </div>
        </div>
        <Link
          href="/"
          className="text-text-muted text-sm hover:text-text-secondary transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
