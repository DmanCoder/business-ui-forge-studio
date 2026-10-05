import { CONTENTFUL_ENDPOINT } from '@src/typescriptGlobals/constants';

import { FetchAPIParamTypes } from './utils.types';

export default async function fetchAPI<T>({
  url = CONTENTFUL_ENDPOINT,
  method = 'POST',
  query,
  variables,
  cache,
}: FetchAPIParamTypes): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: cache ? cache : 'force-cache',
    });

    if (!response?.ok) {
      // Attempt to parse response as JSON to include in the error message
      let errorDetails;
      try {
        const errorJson = await response.json();
        errorDetails = JSON.stringify(errorJson, null, 4);
      } catch {
        // If there is an error parsing as JSON, default to text
        errorDetails = await response.text();
      }
      throw new Error(
        `Network response was not ok: ${response?.status} ${response?.statusText}\nDetails: ${errorDetails}`
      );
    }

    const data = await response.json();

    if (!data || !data?.data) {
      throw new Error('Response JSON does not contain data.');
    }

    return data?.data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fetching data failed: ${error?.message}`);
    } else {
      throw new Error('An error occurred while fetching data from the API.');
    }
  }
}
