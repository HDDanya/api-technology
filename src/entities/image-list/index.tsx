import { SetStateAction, UnsplashImage } from 'shared/types';

interface ImageListProps {
  images: UnsplashImage[];
  page: number;
  setPage: SetStateAction<number>;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  page,
  setPage,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
            <img
              src={img.urls.small}
              alt={img.alt_description || 'Image'}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          disabled={page === 1}>
          Назад
        </button>
        <span className="self-center font-medium">Страница {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
          Далее
        </button>
      </div>
    </>
  );
};
