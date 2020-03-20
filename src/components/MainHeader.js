import React from 'react';

const Large = () => (
  <div className="start-main-header">
    <h3>Alla Tillsammans</h3>
    <h6>Vi besegrar Covid-19 genom att isolera oss tillsammans</h6>
    <h4>TJÖRN</h4>
  </div>
);

const ForPage = () => (
  <div className="main-header">
    <div className="flex-side-by-side">
      <h3>Alla Tillsammans</h3>
      <h4>TJÖRN</h4>
    </div>
    <h6>Vi besegrar Covid-19 genom att isolera oss tillsammans</h6>
  </div>
);

export default function MainHeader(props) {
  return props.useLarge ? <Large /> : <ForPage />;
}
