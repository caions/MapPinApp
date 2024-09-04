import React, { useState, useEffect } from "react";
import { PinType } from "../types/PinType";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { fetchPins, addPin, deletePin } from "../api";
import { Sidebar } from "./SideBar";
import { NavbarComponent } from "./NavbarComponent";

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

  const handleDeletePin = async (pinId: number) => {
    try {
      await deletePin(pinId);
      setPins(pins.filter((pin) => pin.id !== pinId));
      setSelectedPin(null);
      setActivePinId(null);
    } catch (error) {
      console.error("Error deleting pin:", error);
    }
  };

  return (
    <>
      <NavbarComponent onSidebarToggle={() => setShowSidebar(true)} />

      <div className="d-flex">
        <MapContainer
          center={selectedPin || { lat: -3.7327, lng: -38.5267 }}
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "calc(100vh - 56px)",
            width: showSidebar ? "calc(100vw - 30vw)" : "100vw",
            marginRight: showSidebar ? "30vw" : "0",
            transition: "margin-right 0.3s ease",
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

        <Sidebar
          showSidebar={showSidebar}
          pins={pins}
          activePinId={activePinId}
          onPinClick={handlePinClick}
          onDeletePin={handleDeletePin}
          onClose={() => setShowSidebar(false)}
        />
      </div>
    </>
  );
};
