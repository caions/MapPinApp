import React, { useState, useEffect } from "react";
import { PinType } from "../types/PinType";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { Button, Offcanvas, ListGroup } from "react-bootstrap";
import { fetchPins, addPin } from "../api";

export const Map: React.FC = () => {
  const [pins, setPins] = useState<PinType[]>([]);
  const [selectedPin, setSelectedPin] = useState<PinType | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePinId, setActivePinId] = useState<number | null>(null);

  useEffect(() => {
    const loadPins = async () => {
      try {
        const fetchedPins = await fetchPins();
        setPins(fetchedPins);
        if (fetchedPins.length > 0) {
          setSelectedPin(fetchedPins[0]);
          setActivePinId(fetchedPins[0].id);
        }
      } catch (error) {
        console.error("Error loading pins:", error);
      }
    };

    loadPins();
  }, []);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: async (event) => {
        const newPin = {
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        };
        try {
          const addedPin = await addPin(newPin);
          setPins([...pins, addedPin]);
          setSelectedPin(addedPin);
          setActivePinId(addedPin.id);
        } catch (error) {
          console.error("Error adding pin:", error);
        }
      },
    });
    return null;
  };

  const handlePinClick = (pin: PinType) => {
    setSelectedPin(pin);
    setActivePinId(pin.id);
    setShowSidebar(true);
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
        center={selectedPin || { lat: -3.7327, lng: -38.5267 }}
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
        {pins.map((location) => (
          <Marker
            key={location.id}
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
            {pins.map((pin) => (
              <ListGroup.Item
                key={pin.id}
                action
                onClick={() => handlePinClick(pin)}
                active={activePinId === pin.id}
                style={{ fontSize: "0.9rem" }}
              >
                <strong>Pin:</strong> {pin.id} <br />
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
