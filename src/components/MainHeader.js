import React from 'react';
import { Link } from 'react-router-dom';

const Large = () => (
  <div className="start-main-header">
    <h3>Alla Tillsammans</h3>
    <h6>Upprätthåll din karantän, beställ volontärhjälp här!</h6>
  </div>
);

const ForPage = () => (
  <div className="main-header">
    <Link to={`/`}>
      <div className="flex-side-by-side">
        <h3>Alla Tillsammans</h3>
      </div>
      <h6>Upprätthåll din karantän, beställ volontärhjälp här!</h6>
    </Link>
  </div>
);

export default function MainHeader(props) {
  return props.useLarge ? <Large /> : <ForPage />;
}
