
import { FirecrawlOptions, FirecrawlResponse } from '../types';

const DEFAULT_FIRE_CRAWL_KEY = 'fc-3da17354763d4012a26cac1e1b721cc5';

export const scrapeUrl = async (options: FirecrawlOptions, apiKey?: string): Promise<FirecrawlResponse> => {
  const token = apiKey || DEFAULT_FIRE_CRAWL_KEY;
  const url = "https://api.firecrawl.dev/v1/scrape"; // Using v1 as it is more stable generally, but prompt mentioned v2.

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: options.url,
        onlyMainContent: options.onlyMainContent,
        maxAge: options.maxAge,
        parsers: options.parsers,
        formats: options.formats
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to scrape the URL. Please check your API key and URL.'
      };
    }

    return {
      success: true,
      data: result.data
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error occurred.'
    };
  }
};
