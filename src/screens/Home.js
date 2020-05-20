import React from 'react';
import { Link } from 'react-router-dom';

import School from './../images/illustration-pointer-med-text.png';
import Icon1 from './../images/symbol2.png';
import Icon2 from './../images/symbol1.png';
import Icon3 from './../images/symbol3.png';

import IconButton from './../components/IconButton';
import Footer from './../components/Footer';

export default function Home() {
  return (
    <>
      <div>
        <div className="large-button-container">
          <div className="blurb">
            <img src={School} className="school" alt="" />
          </div>

          <Link to={`/bestallning`}>
            <IconButton
              icon={Icon2}
              text={'Jag vill beställa hjälp med yttre ärenden'}
            />
          </Link>
          <Link to={`/bli-volontar`}>
            <IconButton icon={Icon3} text={'Jag vill bli volontär'} />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
