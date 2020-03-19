import React from 'react';
import { Link } from 'react-router-dom';

export default function Volunteers() {
  return (
    <div className="page-layout">
      <h2>Voluntärer</h2>
      <p>Här ska det vara en lista på voluntärer</p>
      <ul>
        <li>
          <Link to="/">Länk till voluntär</Link>
        </li>
        <li>
          <Link to="/">Länk till voluntär</Link>
        </li>
        <li>
          <Link to="/">Länk till voluntär</Link>
        </li>
      </ul>
    </div>
  );
}
