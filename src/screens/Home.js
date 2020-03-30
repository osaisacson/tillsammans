import React from 'react';
import { Link } from 'react-router-dom';
//Import images
import School from './../images/illustration-pointer-med-text.png';
import Icon1 from './../images/symbol2.png';
import Icon2 from './../images/symbol1.png';
import Icon3 from './../images/symbol3.png';

//Components
import IconButton from './../components/IconButton';

export default function Home() {
  return (
    <>
      <div className="home-prompt">
        <h6>Självisolerar du för att skydda dig själv eller andra?</h6>
        <h6>BRA! Här kan du beställa hjälp med yttre ärenden:</h6>
        <p>
          Om du föredrar att ringa, kontakta oss på{' '}
          <span className="highlight">073-3230515</span>
        </p>
      </div>
      <div>
        <div className="flex-column centered">
          <div className="blurb">
            <img src={School} className="school" alt="" />
            {/* <div>
              <h6>Vi besegrar Covid-19 genom att isolera oss tillsammans</h6>
              <h4>TJÖRN</h4>
            </div> */}
          </div>
          <Link className="slide-right-one" to={`/ansök-om-assistans`}>
            <IconButton
              icon={Icon1}
              text={'Jag självisolerar mig för att inte smitta andra'}
            />
          </Link>
          <Link className="slide-right-two" to={`/ansök-om-assistans`}>
            <IconButton
              icon={Icon2}
              text={
                'Jag är riskgrupp och självisolerar för att inte bli smittad'
              }
            />
          </Link>
          <Link className="slide-right-three" to={`/bli-volontar/`}>
            <IconButton icon={Icon3} text={'Jag vill bli volontär'} />
          </Link>
        </div>
      </div>

      {/* <div className="nav-pill float-right">
        <Link to="/admin">Admin</Link>
      </div> */}
    </>
  );
}
