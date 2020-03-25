import React from 'react';

//Components
import MainHeader from '../../components/MainHeader';

export default function Apply() {
  return (
    <>
      <MainHeader />
      <div className="page-layout dark-page centered">
        <h3>Tack! Vi har mottagit din beställning.</h3>
        <p>
          Vår samordnare kommer att kontakta dig via den email eller telefon du
          angett. <br /> Om du vill kontakta oss når du oss på
          helasverigetillsammans@gmail.com
        </p>
      </div>
    </>
  );
}
