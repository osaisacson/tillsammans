import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="page-layout">
      <h2>Välkommen!</h2>
      <p>Här ska det vara tabs för admin</p>
      <Link to="/beställningar">Beställningar</Link>

      <Link to="/voluntärer">Voluntärer</Link>

      <Link to="/grupper">Grupper</Link>
    </div>
  );
}
