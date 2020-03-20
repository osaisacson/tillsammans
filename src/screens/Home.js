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
      <MainHeader useLarge={true} />
      <h6 className="centered">Välj det som stämmer på dig:</h6>
      <div className="page-layout">
        <div className="flex-column centered">
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
          <Link to={`/bli-voluntär/`}>
            {' '}
            <IconButton text={'Jag vill bli voluntär'} />
          </Link>
        </div>
      </div>
      <div className="nav-pill">
        <Link to="/admin">Admin</Link>
      </div>
    </>
  );
}
