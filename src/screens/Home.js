import React from 'react';
import { Link } from 'react-router-dom';

//Components
import IconButton from './../components/IconButton';
import MainHeader from './../components/MainHeader';
import LanguageButtons from './../components/LanguageButtons';

export default function Home() {
  return (
    <>
      <LanguageButtons />
      <div className="nav-pill float-right">
        <Link to="/sahar-funkar-det"> Såhär funkar det...</Link>
      </div>
      <MainHeader useLarge={true} />

      <h6 className="centered">Välj det som stämmer på dig</h6>
      <div>
        <div className="flex-column centered">
          <div className="blurb">
            Upprätthåll din karantän, beställ volontärhjälp här!
          </div>
          <Link to={`/ansök-om-assistans`}>
            <IconButton
              text={
                'Jag är sjuk och självisolerar mig för att inte smitta andra'
              }
            />
          </Link>
          <Link to={`/ansök-om-assistans`}>
            <IconButton
              text={
                'Jag är riskgrupp och självisolerar mig för att inte bli smittad'
              }
            />
          </Link>
          <Link to={`/bli-volontar/`}>
            <IconButton text={'Jag är frisk och vill bli volontär'} />
          </Link>
        </div>
      </div>
      <div className="links-bottom-page">
        <div className="nav-pill">
          <Link to="/intro">Introduktion</Link>
        </div>
        <div className="nav-pill">
          <Link to="/natverk"> Civilsamhällets volontärnätverk på Tjörn </Link>
        </div>
        <div className="nav-pill">
          <Link to="/vilkor"> Användarvillkor för tjänsten </Link>
        </div>
      </div>

      {/* <div className="nav-pill float-right">
        <Link to="/admin">Admin</Link>
      </div> */}
    </>
  );
}
