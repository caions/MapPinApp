import React from "react";
import { Offcanvas, ListGroup, Button } from "react-bootstrap";
import { PinType } from "../types/PinType";

interface SidebarProps {
  showSidebar: boolean;
  pins: PinType[];
  activePinId: number | null;
  onPinClick: (pin: PinType) => void;
  onDeletePin: (pinId: number) => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  showSidebar,
  pins,
  activePinId,
  onPinClick,
  onDeletePin,
  onClose,
}) => {
  return (
    <Offcanvas
      show={showSidebar}
      onHide={onClose}
      placement="end"
      className="offcanvas-custom"
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
              onClick={() => onPinClick(pin)}
              active={activePinId === pin.id}
              style={{ fontSize: "0.9rem", position: "relative" }}
            >
              <strong>Pin:</strong> {pin.id} <br />
              <strong>Lat:</strong> {pin.lat.toFixed(5)} <br />
              <strong>Lng:</strong> {pin.lng.toFixed(5)}
              <Button
                variant="link"
                className="position-absolute top-50 end-0 translate-middle-y me-2 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePin(pin.id);
                }}
              >
                <i
                  className="bi bi-trash"
                  style={{ fontSize: "1.2rem", color: "red" }}
                ></i>
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
