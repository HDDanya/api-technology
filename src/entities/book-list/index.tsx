'use server';

import { Book } from "shared/types";

export const BookList = ({ books }: { books: Book[] }) => {
  return (
    <ul className="space-y-3">
      {books.map((book) => (
        <li key={book.key} className="p-4 bg-gray-100 rounded shadow">
          <p className="font-semibold">{book.title}</p>
          <p className="text-sm text-gray-700">
            Автор: {book.author_name?.join(', ') || 'неизвестен'}
          </p>
          {book.first_publish_year && (
            <p className="text-sm text-gray-500">
              Год публикации: {book.first_publish_year}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};
