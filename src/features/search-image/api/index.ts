import { UnsplashImage } from 'shared/types';

interface UnsplashResponse {
  results: UnsplashImage[];
}

const CachedImages = new Map<string, UnsplashResponse>();

export async function searchUnsplash(
  query: string,
  page = 1
): Promise<UnsplashImage[]> {
  const cacheKey = `${query}:${page}`;
  if (CachedImages.has(cacheKey)) {
    return CachedImages.get(cacheKey)!.results;
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=12&page=${page}`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    const data: UnsplashResponse = await res.json();
    CachedImages.set(cacheKey, data);
    return data.results;
  } catch (error) {
    console.error('Ошибка при получении изображений:', error);
    throw error;
  }
}
