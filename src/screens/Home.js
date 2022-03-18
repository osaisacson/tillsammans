import React from "react";
import { Link } from "react-router-dom";

import School from "./../images/illustration-pointer-med-text.png";
import Icon2 from "./../images/symbol1.png";
import kaffe from "./../images/kaffe.png";

import IconButton from "./../components/IconButton";

export default function Home() {
  return (
    <>
      <div className="column-container">
        <div className="text-column">
          <h4>
            Bli en del av civilsamhällets kamp med att stötta utsatta människor
            från Ukraina!
          </h4>
           <p>Ett samarbete mellan:</p>
          <em>Tjörns Kommun</em>
          <em>Svenska Kyrkan</em>
          <em>Egnahemsfabriken</em>
          <em>Studieförbundet Vuxenskolan</em>
          <em>Frivilligagruppen</em>
          <em>Agapes Vänner</em>
          <em>Röda Korset</em>
          <em>Rädda Barnen</em>
          <em>FN föreningen</em>
          <em>SPF Tjörn</em>
          <em>PRO Tjörn</em>
          <em>PRO Kaprifolen</em>
          <em>Naturskyddsföreningen</em>
          <a
            className="small-button draw meet"
            href="https://forms.monday.com/forms/b3a169a6cb98cee80a3fad11ded9072d?r=use1"
          >
            Gå med som samarbetspartner
          </a>
          <br />
          <p>
            Notera att det är här du anmäler dig, du behöver inte kontakta oss
            på något annat sätt -{" "}
            <span className="special-color">
              vi samordnar våra resurser via den här plattformen.
            </span>
          </p>
          <p>
            Vill du donera pengar till Ukraina hänvisar vi dig till några av de
            organisationer som är på plats:{" "}
            <a className="simple-link" href="https://www.raddabarnen.se">
              Rädda barnen
            </a>
            ,{" "}
            <a className="simple-link" href="https://www.rodakorset.se">
              Röda Korset
            </a>
            ,{" "}
            <a className="simple-link" href="https://www.unhcr.org">
              UNHCR
            </a>
          </p>
        </div>

        <div className="button-column">
          <a
            href="https://forms.monday.com/forms/2a476e0840fe2bb10e71588f5fb27cc2?r=use1"
            className="large-button draw meet"
          >
            Bli volontär
          </a>

          <a
            href="https://forms.monday.com/forms/708fca4d836466da0f3ae17d466f461f?r=use1"
            className="large-button draw meet"
          >
            Föreslå arbete
          </a>

          <a
            href="https://forms.monday.com/forms/698901a41bcd076751d3fc34de7e4de7?r=use1"
            className="large-button draw meet"
          >
            Erbjud boende
          </a>
          <a
            href="https://forms.monday.com/forms/bc5947aba7715dff06035a9e7ea53994?r=use1"
            className="large-button draw meet"
          >
            Donera resurser
          </a>
          <a
            href="https://forms.monday.com/forms/69fc84b9ea6633b87d33ee675c97f6c7?r=use1"
            className="large-button large-button-accent draw"
          >
            Anmäl ett behov
          </a>
        </div>
      </div>
    </>
  );
}
