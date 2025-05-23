import { CoordinatesTuple, MapProps } from 'shared/types';
const CachedLocations = new Map<string, MapProps>();
export async function getCoordinates(query: string): Promise<MapProps> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=1`;
  if (CachedLocations.has(query)) {
    return CachedLocations.get(query)!;
  }
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'ReactMapFinder/1.0 (daniil24kiselev@gmail.com)',
      },
    });
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    const data = await res.json();
    if (data.length === 0) throw new Error('Ничего не найдено');

    const coords: CoordinatesTuple = [Number(data[0].lat), Number(data[0].lon)];
    const responce = {
      coords: coords,
      display_name: data[0].display_name,
    };
    CachedLocations.set(query, responce);
    return responce;
  } catch (error) {
    throw new Error(`Ошибка при получении координат: Ничего не найдено`);
  }
}
