import { IsFullUrlParamTypes, IsFullUrlReturnTypes } from './utils.types';

// Update the function with the return type
const isFullUrl = ({ url }: IsFullUrlParamTypes): IsFullUrlReturnTypes => {
  try {
    const parsedUrl = new URL(url);
    // Check if the URL has a protocol (like http: or https:) and a host (domain)
    return !!parsedUrl.protocol && !!parsedUrl.host;
  } catch {
    // An error will be thrown if the URL is invalid or incomplete (like a slug)
    return false;
  }
};

export default isFullUrl;
