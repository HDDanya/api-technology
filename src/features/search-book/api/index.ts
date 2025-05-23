import { Book } from 'shared/types';
interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  key: string;
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}
const CachedBooks = new Map<string, Book[]>();
export async function getBooksByQuery(query: string): Promise<Book[]> {
  if (CachedBooks.has(query)) {
    return CachedBooks.get(query)!;
  }

  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    const data: OpenLibraryResponse = await res.json();

    const books: Book[] = data.docs.slice(0, 10).map((doc) => ({
      title: doc.title,
      author: doc.author_name?.[0] ?? 'Неизвестен',
      year: doc.first_publish_year,
      key: doc.key,
    }));

    CachedBooks.set(query, books);
    return books;
  } catch (error) {
    console.error('Ошибка при получении книг:', error);
    throw error;
  }
}
