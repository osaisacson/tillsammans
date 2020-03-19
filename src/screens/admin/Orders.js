import React from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
  return (
    <div className="page-layout">
      <h2>Beställningar</h2>
      <p>Här ska det vara en lista på beställningar</p>
      <ul>
        <li>
          <Link to="/">Länk till beställning</Link>
        </li>
        <li>
          <Link to="/">Länk till beställning</Link>
        </li>
        <li>
          <Link to="/">Länk till beställning</Link>
        </li>
      </ul>
    </div>
  );
}
