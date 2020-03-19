import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Välkommen!</h2>
      <p>
        Här ska det vara en välkomsttext och några val som leder till olika
        sidor
      </p>
      <ul>
        <li>
          <Link to="/apply">Ansök om assistans</Link>
        </li>
        <li>
          <Link to="/volunteer">Jag vill bli voluntär</Link>
        </li>
      </ul>
    </div>
  );
}
