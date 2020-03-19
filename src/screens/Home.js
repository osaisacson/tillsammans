import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from './../components/IconButton';

export default function Home() {
  return (
    <div className="page-layout">
      <h3>Alla Tillsammans</h3>
      <h6>Vi besegrar Covid-19 genom att isolera oss tillsammans</h6>
      <h1>TJÖRN</h1>
      <p>Välj det som stämmer på dig:</p>

      <div className="flex-column centered">
        <Link to="/ansök-om-assistans">
          <IconButton
            text={'Jag är sjuk och självisolerar mig för att inte smitta andra'}
          />
        </Link>
        <Link to="/ansök-om-assistans">
          <IconButton
            text={
              'Jag är riskgrupp och självisolerar mig för att inte bli smittad'
            }
          />
        </Link>
        <Link to="/bli-voluntär">
          <IconButton text={'Jag vill bli voluntär'} />
        </Link>
      </div>
    </div>
  );
}
