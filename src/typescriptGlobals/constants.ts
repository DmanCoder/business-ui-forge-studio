// -------------- APP CONSTANTS --------------
export const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
export const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
export const IS_PREVIEW = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production';
export const CONTENTFUL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}?access_token=${ACCESS_TOKEN}`;
import { BASE_URL } from '@src/config/site';

export { BASE_URL };
export const ALLOWED_LOCALES = ['en'];
export const ALLOWED_HOSTS =
  process.env.NODE_ENV === 'production'
    ? [BASE_URL]
    : [BASE_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'];
