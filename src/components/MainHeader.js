import React from 'react';
import { Link } from 'react-router-dom';

export default function MainHeader(props) {
  return (
    <div className="main-header-wrapper">
      <div className="main-header">
        <div>
          <Link to="/">
            <div className="alla-tillsammans">
              <div>
                <h3 className="bold">Alla Tillsammans</h3>
                <h3>mot Covid-19</h3>
              </div>
              <h2>Civilsamhället i samverkan</h2>
            </div>
          </Link>
        </div>
        <div className="header-links">
          <Link className="slide-left-one" to="/sahar-funkar-det">
            Såhär funkar det
          </Link>
          <Link className="slide-left-two" to="/intro">
            Vad kan man få hjälp med?
          </Link>
          <Link className="slide-left-three" to="/kontakt">
            Kontakt
          </Link>
          <Link className="slide-left-four" to="/vilkor">
            Byt språk
          </Link>
        </div>
      </div>
      <div className="header-label">
        <h3>TJÖRN</h3>
      </div>
    </div>
  );
}
