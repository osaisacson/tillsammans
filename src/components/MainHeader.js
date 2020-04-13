import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';

export default function MainHeader(props) {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Link to="/" className="navbar-brand">
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
                <h3>mot Covid-19</h3>
              </div>
              <h2>Civilsamhället i samverkan</h2>
            </div>
          </div>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Link
              id="sahar-funkar-det"
              to="/sahar-funkar-det"
              className="nav-link"
            >
              Såhär funkar det
            </Link>
            <Link id="kontakt" to="/kontakt" className="nav-link">
              Kontakt
            </Link>
            <Link id="partners" to="/partners" className="nav-link">
              Partners
            </Link>
            {/* <NavDropdown id="byt-sprak" title="Byt språk">
              <NavDropdown.Item href="#action/3.1">Svenska</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Engelska</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Finska</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Arabiska</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Polska</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Kurdiska</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Spanska</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="header-label">TJÖRN</div>
    </>
  );
}
