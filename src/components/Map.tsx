import { LatLngLiteral } from "leaflet";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { pinsMock } from "../mock/pinsMock";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Offcanvas, ListGroup } from "react-bootstrap";

export const Map: React.FC = () => {
  const initialPosition: LatLngLiteral = pinsMock[0];
  const [pins, setPins] = useState<LatLngLiteral[]>(pinsMock);
  const [selectedPin, setSelectedPin] =
    useState<LatLngLiteral>(initialPosition);
  const [showSidebar, setShowSidebar] = useState(false);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click(event) {
        const newPin = {
          id: pins.length + 1,
          name: `Pino ${pins.length + 1}`,
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        };
        setPins([...pins, newPin]);
        setSelectedPin(newPin);
      },
    });
    return null;
  };

  const handlePinClick = (pin: LatLngLiteral) => {
    setSelectedPin(pin);
    setShowSidebar(false);
  };

  return (
    <div className="d-flex">
      <Button
        variant="primary"
        className="position-fixed top-0 end-0 m-3 z-index-100"
        onClick={() => setShowSidebar(true)}
        style={{ zIndex: 1050, display: showSidebar ? "none" : "block" }}
      >
        ☰
      </Button>
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "100vh",
          width: showSidebar ? "calc(100vw - 30vw)" : "100vw",
          marginRight: showSidebar ? "30vw" : "0",
          transition: "margin-right 0.3s ease",
          position: "relative",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            eventHandlers={{
              click: () => handlePinClick(location),
            }}
          >
            <Popup>
              Lat: {location.lat} lng: {location.lng}
            </Popup>
          </Marker>
        ))}
        <MapClickHandler />
      </MapContainer>

      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="end"
        style={{ width: "30vw", zIndex: 1040 }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Pin Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {pins.map((pin, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handlePinClick(pin)}
                style={{ fontSize: "0.9rem" }}
              >
                <strong>Pin:</strong> {index + 1} <br />
                <strong>Lat:</strong> {pin.lat.toFixed(5)} <br />
                <strong>Lng:</strong> {pin.lng.toFixed(5)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
