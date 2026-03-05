import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://autumn8.me';
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/audit`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
