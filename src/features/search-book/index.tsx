import { useState, useTransition } from 'react';
import { Book } from 'shared/types';
import { getBooksByQuery } from './api';
import { BookList } from 'entities/book-list';

export default function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.length === 0) setBooks([]);
    if (q.length < 3) return;
    startTransition(async () => {
      const result = await getBooksByQuery(q);
      setBooks(result);
    });
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        placeholder="Введите название книги"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <p className="text-blue-500">Загрузка...</p>}
      {books.length > 0 && <BookList books={books} />}
    </div>
  );
}
