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
            <a
              href="https://curmudgeon.notion.site/Samarbetspartners-7a22560101b44ff191a837cf588ffb61"
              className="nav-link"
            >
              Samarbetspartners
            </a>
            <a
              href="https://curmudgeon.notion.site/Om-samarbetet-740df9c3c0fe4062b6a246c7d112be8e"
              className="nav-link"
            >
              Vanliga frågor
            </a>
            <a
              href="https://curmudgeon.notion.site/Kontakter-1977d104960749019da8cb4870e5f280"
              className="nav-link"
            >
              Kontakt
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="header-label">TJÖRN</div>
    </>
  );
}
