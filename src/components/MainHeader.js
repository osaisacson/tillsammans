import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions';

export default function MainHeader(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

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
            {/* NOTE TO VISHNU: Commented this out as the admins don't want the admin login/logout to be visible on the page which the users see. They want to instead access login by typing /admin after the url. I changed the prev /login to /admin in the related files and updated the previous /admin to /main-admin */}
            {/* {isAuthenticated ? (
              <a className="nav-link" onClick={() => dispatch(logoutUser())}>
                Logga ut
              </a>
            ) : (
              <Link className="nav-link" to="/admin">
                Logga in
              </Link>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="header-label">TJÖRN</div>
    </>
  );
}
