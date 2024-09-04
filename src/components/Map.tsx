import { LatLngExpression } from "leaflet";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

export const Map: React.FC = () => {
  const initialPosition: LatLngExpression = [51.505, -0.09];
  const [position, setPosition] = useState<LatLngExpression>(initialPosition);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click(event) {
        setPosition([event.latlng.lat, event.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 1000, width: 1000 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapClickHandler />
    </MapContainer>
  );
};
