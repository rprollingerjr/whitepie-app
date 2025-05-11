import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// In-memory cache to reduce repeated API calls per session
const imageCache = {};

/**
 * Fetches a pizza-related Unsplash image based on the provided query.
 * Caches results in memory to avoid hitting Unsplash rate limits.
 * @param {string} query - Search term, like 'pizza' or 'pizza sunset'
 * @returns {Promise<string|null>} - Image URL or null on error
 */
export const fetchPizzaImage = async (query = 'pizza') => {
  // Return from in-memory cache if available
  if (imageCache[query]) {
    console.log(`Cache hit for "${query}"`);
    return imageCache[query];
  }

  // Check if stored in localStorage
  const localKey = `unsplash:${query}`;
  const cached = localStorage.getItem(localKey);
  if (cached) {
    console.log(`Loaded "${query}" from localStorage`);
    imageCache[query] = cached;
    return cached;
  }

  try {
    console.log(`Fetching Unsplash image for "${query}"...`);
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 1,
        orientation: 'landscape',
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const photo = response.data.results[0];
    const imageUrl = photo?.urls?.regular || null;

    if (imageUrl) {
      imageCache[query] = imageUrl;
      localStorage.setItem(localKey, imageUrl);
    }

    return imageUrl;
  } catch (err) {
    console.error(`❌ Unsplash fetch failed for "${query}"`, err.response?.data || err.message);
    return null;
  }
};