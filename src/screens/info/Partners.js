import React from "react";

export default function Partners() {
  return (
    <div className="page-layout">
      <h2> Partners och samverkande organisationer</h2>
      <p>
        Alla Tillsammans drivs av frivilliga krafter i civilsamhällets
        organisationer på Tjörn i dialog med Tjörns kommun och med stöd från
        lokalt näringsliv.
      </p>
      <p>Medverkande organisationer är:</p>
      <ul>
        {" "}
        <li>
          <a href="https://www.tjorn.se/">Tjörns Kommun</a>
        </li>
        <li>
          <a href="https://www.svenskakyrkan.se/tjorn">Svenska Kyrkan Tjörn</a>
        </li>
        <li>
          <a href="https://www.egnahemsfabriken.se">Egnahemsfabriken</a>
        </li>
        <li>
          <a href="https://kommun.redcross.se/tjorn/">Tjörns Röda Korskrets</a>
        </li>
        <li>
          <a href="https://www.facebook.com/raddabarnentjorn/">
            Rädda Barnen Tjörn
          </a>
        </li>
        <li>
          <a href="https://www.spfseniorerna.se//">SPF Seniorerna</a>
        </li>
        <li>
          <a href="https://www.facebook.com/Agapes-v%C3%A4nner-evenemang-STO-204569240323939/">
            Agapes vänner
          </a>
        </li>
        <li>
          <a href="https://www.sv.se/">Studieförbundet Vuxenskolan</a>
        </li>
        <li>
          <a href="https://www.civil.se/">Frivilliga Resursgruppen</a>
        </li>
      </ul>
      <br />
      <p>
        Representerar du en organisation eller förening på Tjörn som vill bidra
        i tider av kris?
      </p>
      <a
        className="small-button draw meet"
        href="https://forms.monday.com/forms/b3a169a6cb98cee80a3fad11ded9072d?r=use1"
      >
        Gå med som samarbetspartner
      </a>
    </div>
  );
}
