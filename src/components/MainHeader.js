import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/actions";

export default function MainHeader(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

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
            <Link id="tips" to="/tips" className="nav-link">
              Tips
            </Link>
            {isAuthenticated && (
              <React.Fragment>
                <Link className="nav-link" to="/admin/account">
                  användarkonto
                </Link>
                <Link
                  to="/#"
                  className="nav-link"
                  onClick={() => dispatch(logoutUser())}
                >
                  Logga ut
                </Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="header-label">TJÖRN</div>
    </>
  );
}
