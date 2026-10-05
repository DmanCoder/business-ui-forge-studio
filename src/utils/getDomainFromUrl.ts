const getDomainFromUrl = ({ url }: { url: string }): string => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace('www.', ''); // Optional: Remove 'www.' if it's part of the domain
  } catch {
    return ''; // Return an empty string if the URL is invalid
  }
};

export default getDomainFromUrl;
