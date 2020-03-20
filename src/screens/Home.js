import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from './../components/IconButton';
import MainHeader from './../components/MainHeader';

export default function Home() {
  return (
    <>
      <MainHeader />
      <div className="page-layout">
        <p>Välj det som stämmer på dig:</p>

        <div className="flex-column centered">
          <Link to="/ansök-om-assistans">
            <IconButton
              text={
                'Jag är sjuk och självisolerar mig för att inte smitta andra'
              }
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
    </>
  );
}
