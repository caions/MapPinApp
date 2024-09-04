import { LatLngExpression } from "leaflet";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { pinsMock } from "../mock/pinsMock";

export const Map: React.FC = () => {
  const initialPosition: LatLngExpression = pinsMock[0];
  const [position, setSelectedPosition] =
    useState<LatLngExpression>(initialPosition);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click(event) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
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
      {pinsMock.map((location) => (
        <Marker key={location.id} position={[location.lat, location.lng]}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
