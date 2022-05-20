import React from "react";

export default function Contact() {
  return (
    <div className="page-layout">
      <h2>Kontaktpersoner</h2>

      <p>
        Samordnare: Fredrik Siladji Dahne (Tjörns Kommun): Honom når du på
        fredrik.siladji.dahne@tjorn.se
      </p>
      <p>
        Utvecklare: Åsa Isacson (Egnahemsfabriken). Henne når du på
        osa@egnahemsfabriken.se
      </p>
      <br />
      <h2>Feedback och förslag</h2>

      <p>
        Vi uppgraderar kontinuerligt siten för att möta behov, och tar gärna
        emot förslag om utökning och förbättringar!
      </p>
      <p>Har du förslag på hur vi kan göra plattformen bättre?</p>

      <a
        className="small-button draw meet"
        href="https://forms.monday.com/forms/e8eb72b489db14da16d374516228f0bb?r=use1"
      >
        Skicka oss din feedback!
      </a>
      <br />
    </div>
  );
}
