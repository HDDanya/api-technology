import { useEffect, useState, useTransition } from 'react';
import { UnsplashImage } from 'shared/types';
import { searchUnsplash } from './api';
import { ImageList } from 'entities/image-list';

interface Props {
  query: string;
}

export const SearchImage = ({ query }: Props) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setError(null);
    if (query.length < 1) return;
    searchUnsplash(query, page)
      .then((data) =>
        startTransition(() => {
          if (data.length === 0) {
            setError('Не удалось загрузить изображения');
          }
          setImages(data);
        })
      )
      .catch(() => setError('Не удалось загрузить изображения'));
  }, [query, page]);

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      {isPending && <p className="text-gray-500">Загрузка...</p>}

      <ImageList images={images} page={page} setPage={setPage} />
    </div>
  );
};
