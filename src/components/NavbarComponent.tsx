import React from "react";
import { Button, Navbar } from "react-bootstrap";

interface NavbarComponentProps {
  onSidebarToggle: () => void;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({
  onSidebarToggle,
}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="d-flex">
      <Navbar.Brand href="#home" className="mx-auto">
        Map Pin App
      </Navbar.Brand>
      <Button
        variant="outline-light"
        className="ms-3"
        onClick={onSidebarToggle}
      >
        <i className="bi bi-list"></i>
      </Button>
    </Navbar>
  );
};
