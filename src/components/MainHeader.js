import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function MainHeader(props) {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Link to="/#" className="navbar-brand">
          <div className="brand">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <div className="text-section">
              <div className="flex">
                <h3 className="bold">Alla Tillsammans</h3>
              </div>
              <h2>Civilsamhället i samverkan</h2>
            </div>
          </div>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Link to="/om-samarbetet" className="nav-link">
              Om Samarbetet
            </Link>
            <Link to="/kontakt" className="nav-link">
              Kontakt
            </Link>
            <Link to="/partners" className="nav-link">
              Partners
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="header-label">TJÖRN</div>
    </>
  );
}
