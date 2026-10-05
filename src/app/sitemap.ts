// VIEW DOCS: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import { MetadataRoute } from 'next';

import { BASE_URL } from '@src/config/site';
import { getPublishedArticles, getCategories } from '@src/lib/insights';
import { getPublishedCaseStudies, shouldIndexTestimonialsPage } from '@src/lib/caseStudies';

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/work', priority: 0.8 },
  { path: '/process', priority: 0.8 },
  { path: '/about', priority: 0.8 },
  { path: '/insights', priority: 0.8 },
  { path: '/start-a-project', priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();
  const categories = await getCategories();
  const caseStudies = await getPublishedCaseStudies();

  const staticEntries = STATIC_ROUTES.map(({ path, priority }) => ({
    url: new URL(path, BASE_URL).toString(),
    changeFrequency: 'monthly' as const,
    priority,
  }));

  const articleEntries = articles.map((article) => ({
    url: new URL(`/insights/${article.slug}`, BASE_URL).toString(),
    lastModified: article.updated ?? article.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const categoryEntries = categories.map((category) => ({
    url: new URL(`/insights/categories/${category.slug}`, BASE_URL).toString(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // /testimonials enters the sitemap only on real verified content — a
  // demo-mode preview of the page is noindexed and never listed.
  const testimonialsEntries = (await shouldIndexTestimonialsPage())
    ? [
        {
          url: new URL('/testimonials', BASE_URL).toString(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        },
      ]
    : [];

  // Published, indexable case studies only — noIndex studies (including all
  // demo case studies) stay out.
  const caseStudyEntries = caseStudies
    .filter((study) => !study.noIndex)
    .map((study) => ({
      url: new URL(`/work/${study.slug}`, BASE_URL).toString(),
      lastModified: study.updatedAt ?? study.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [
    ...staticEntries,
    ...testimonialsEntries,
    ...caseStudyEntries,
    ...articleEntries,
    ...categoryEntries,
  ];
}
