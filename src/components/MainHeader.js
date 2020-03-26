import React from 'react';
import { Link } from 'react-router-dom';

export default function MainHeader(props) {
  return (
    <>
      <div className="main-header">
        <div>
          <Link to="/">
            <div className="alla-tillsammans">
              <h3 className="bold">Alla Tillsammans</h3>
              <h3>mot Covid-19</h3>
            </div>
            <h2>Civilsamhället i samverkan</h2>
          </Link>
        </div>
        <div className="header-links">
          <Link to="/sahar-funkar-det"> Såhär funkar det</Link>
          <Link to="/intro">Vad kan man få hjälp med?</Link>
          <Link to="/natverk"> Kontakt</Link>
          <Link to="/vilkor"> Byt språk </Link>
        </div>
      </div>
      <div className="header-label">
        <h3>TJÖRN</h3>
      </div>
    </>
  );
}
