import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function MainHeader(props) {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Link to="/" className="navbar-brand">
        <div className="alla-tillsammans">
          <img
            alt=""
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <div className="text-section hide-on-small">
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
          <Link id="intro" to="/intro" className="nav-link">
            Vad kan man få hjälp med?
          </Link>
          <NavDropdown id="byt-sprak" title="Byt språk">
            <NavDropdown.Item href="#action/3.1">Svenska</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Engelska</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Finska</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    // <div className="main-header-wrapper">
    //   <div className="main-header">
    //     <div>
    //       <Link to="/">
    //         <div className="alla-tillsammans">
    //           <div>
    //             <h3 className="bold">Alla Tillsammans</h3>
    //             <h3>mot Covid-19</h3>
    //           </div>
    //           <h2>Civilsamhället i samverkan</h2>
    //         </div>
    //       </Link>
    //     </div>
    //     <div className="header-links">
    //       <Link className="slide-left-one" to="/sahar-funkar-det">
    //         Såhär funkar det
    //       </Link>
    //       <Link className="slide-left-two" to="/intro">
    //         Vad kan man få hjälp med?
    //       </Link>
    //       <Link className="slide-left-three" to="/kontakt">
    //         Kontakt
    //       </Link>
    //       <Link className="slide-left-four" to="/vilkor">
    //         Byt språk
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="header-label">
    //     <h3>TJÖRN</h3>
    //   </div>
    // </div>
  );
}
