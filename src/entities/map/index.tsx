import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MapProps } from 'shared/types';

import { RecenterMap } from './lib';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/icons/marker-icon-2x.png',
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png',
});

export const Map: React.FC<MapProps> = ({ coords, display_name }) => {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow">
      <MapContainer
        center={coords}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full">
        <RecenterMap coords={coords} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>{display_name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
