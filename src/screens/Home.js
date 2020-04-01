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
        <p className="smaller">
          Om du föredrar att ringa, kontakta oss på <br />
          <span className="highlight">073-3230571</span> (Helena Johannesson,
          Svenska Kyrkan)
        </p>
      </div>
      <div>
        <div className="flex-column centered">
          <div className="blurb">
            <img src={School} className="school" alt="" />
          </div>
          <Link to={`/bestallning`}>
            <IconButton
              icon={Icon1}
              text={'Jag självisolerar mig för att inte smitta andra'}
            />
          </Link>
          <Link to={`/bestallning`}>
            <IconButton
              icon={Icon2}
              text={
                'Jag är riskgrupp och självisolerar för att inte bli smittad'
              }
            />
          </Link>
          <Link to={`/bli-volontar/`}>
            <IconButton icon={Icon3} text={'Jag vill bli volontär'} />
          </Link>
        </div>
      </div>
    </>
  );
}
