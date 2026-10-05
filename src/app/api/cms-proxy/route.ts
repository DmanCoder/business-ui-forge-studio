import { ALLOWED_HOSTS, CONTENTFUL_ENDPOINT } from '@src/typescriptGlobals/constants';
import { NextResponse, NextRequest } from 'next/server';

/**
 * Handles POST requests to securely proxy GraphQL queries to the Contentful API.
 *
 * This route ensures sensitive Contentful API keys are not exposed to the client by:
 * 1. Validating the host of incoming requests.
 * 2. Parsing and forwarding the GraphQL query and variables to Contentful.
 * 3. Returning the Contentful API response back to the client.
 *
 * @async
 * @param {NextRequest} req - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A NextResponse containing the API response or an error message.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Extract the 'host' or 'x-forwarded-host' header
  const host = req.headers.get('host') || req.headers.get('x-forwarded-host');

  /**
   * Validate the host against the allowed list.
   * Reject the request with a 403 status if the host is invalid.
   */
  const allowedHostnames = ALLOWED_HOSTS.map((allowed) => new URL(allowed).host);
  if (!host || !allowedHostnames.includes(host)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    // Parse the request body to extract the GraphQL query and variables
    const { query, variables } = await req.json();

    /**
     * Forward the request to the Contentful API.
     *
     * @throws {Error} If the Contentful API response is not successful.
     */
    const contentfulResponse = await fetch(CONTENTFUL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    // Check if Contentful returned an error
    if (!contentfulResponse.ok) {
      const errorDetails = await contentfulResponse.text();
      throw new Error(
        `Contentful API error: ${contentfulResponse.status} ${contentfulResponse.statusText}\nDetails: ${errorDetails}`
      );
    }

    // Parse the response from Contentful
    const contentfulData = await contentfulResponse.json();

    // Ensure the response contains the expected 'data' field
    if (!contentfulData || !contentfulData.data) {
      throw new Error('Contentful response does not contain data.');
    }

    // Return the Contentful API data to the client
    return NextResponse.json({ data: contentfulData.data }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in /api/cms-proxy:', error);

    /**
     * Return a generic error response to the client.
     * Logs the error for server-side debugging.
     */
    return NextResponse.json(
      {
        message: 'Error processing request',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
