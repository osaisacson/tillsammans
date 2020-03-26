import React from 'react';
import { Link } from 'react-router-dom';

//Components
import IconButton from './../components/IconButton';

export default function Home() {
  return (
    <>
      <h6 className="centered">Välj det som stämmer på dig</h6>
      <div>
        <div className="flex-column centered">
          <div className="blurb">
            <div>
              <h6>Vi besegrar Covid-19 genom att isolera oss tillsammans</h6>
              <h4>TJÖRN</h4>
            </div>
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

      {/* <div className="nav-pill float-right">
        <Link to="/admin">Admin</Link>
      </div> */}
    </>
  );
}
