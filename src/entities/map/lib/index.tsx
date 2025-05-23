import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { CoordinatesTuple } from 'shared/types';
interface RecenterMapProps {
  coords: CoordinatesTuple;
}
export const RecenterMap: React.FC<RecenterMapProps> = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);

  return null;
};
