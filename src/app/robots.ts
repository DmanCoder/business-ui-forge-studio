import { MetadataRoute } from 'next';

import { BASE_URL, IS_PREVIEW } from '@src/typescriptGlobals/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_PREVIEW ? [{ userAgent: '*', disallow: '/' }] : [{ userAgent: '*', allow: '/' }],
    sitemap: IS_PREVIEW ? undefined : `${BASE_URL}/sitemap.xml`,
  };
}
