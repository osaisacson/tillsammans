import React from 'react';
import { Link } from 'react-router-dom';

export default function Groups() {
  return (
    <div className="page-layout">
      <h2>Grupper</h2>
      <p>Här ska det vara en lista på grupper</p>
      <ul>
        <li>
          <Link to="/">Länk till grupp</Link>
        </li>
        <li>
          <Link to="/">Länk till grupp</Link>
        </li>
        <li>
          <Link to="/">Länk till grupp</Link>
        </li>
      </ul>
    </div>
  );
}
