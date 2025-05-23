import { useState } from 'react';
import { SearchImage } from 'features/search-image';

export const ImagePage = () => {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Поиск по Unsplash</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(input);
        }}
        className="mb-4 flex gap-2">
        <input
          className="border px-4 py-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите запрос..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Найти
        </button>
      </form>

      <SearchImage query={query} />
    </div>
  );
};
