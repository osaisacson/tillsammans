import React from 'react';
import { Link } from 'react-router-dom';

const Large = () => (
  <div className="start-main-header">
    <h3>Alla Tillsammans</h3>
    <h6>Vi besegrar Covid-19 genom att isolera oss tillsammans</h6>
    <h4>TJÖRN</h4>
  </div>
);

const ForPage = () => (
  <div className="main-header">
    <Link to={`/`}>
      <div className="flex-side-by-side">
        <h3>Alla Tillsammans</h3>
        <h4>TJÖRN</h4>
      </div>
      <h6>Vi besegrar Covid-19 genom att isolera oss tillsammans</h6>
    </Link>
  </div>
);

export default function MainHeader(props) {
  return props.useLarge ? <Large /> : <ForPage />;
}
