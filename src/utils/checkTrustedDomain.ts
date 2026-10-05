import getDomainFromUrl from './getDomainFromUrl';

import { CheckTrustedDomainParamType } from './utils.types';

const trustedDomains = ['trustedsource.com', 'anothertrustedsource.com'];

const checkTrustedDomain = ({ href }: CheckTrustedDomainParamType): string => {
  try {
    const domain = getDomainFromUrl({ url: href });
    const isTrustedDomain = trustedDomains.includes(domain);

    // Return the appropriate rel attribute
    return isTrustedDomain ? 'noopener noreferrer' : 'nofollow noopener noreferrer';
  } catch {
    // If there's an issue with the URL (e.g., invalid format), fallback to the default
    return 'nofollow noopener noreferrer';
  }
};

export default checkTrustedDomain;
