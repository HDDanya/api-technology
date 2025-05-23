import { useEffect, useState } from 'react';
import { getCoordinates } from './api';
import { ErrorAlert } from 'shared/ui';
import { Map } from 'entities/map';
import { MapProps } from 'shared/types';
interface Props {
  query: string;
}
export const SearchLocation: React.FC<Props> = ({ query }) => {
  const [mapProps, setMapProps] = useState<MapProps | undefined>();
  const [errorMessege, setErrorMessege] = useState<string>();

  useEffect(() => {
    if (query.length < 1) return;
    getCoordinates(query)
      .then((data) => setMapProps(data))
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setErrorMessege(err.message);
        } else {
          setErrorMessege('Произошла неизвестная ошибка');
        }
      });
  }, [query]);

  return (
    <>
      {errorMessege && (
        <ErrorAlert
          message={errorMessege}
          onClose={() => setErrorMessege('')}
        />
      )}

      {mapProps && <Map {...mapProps} />}
    </>
  );
};
