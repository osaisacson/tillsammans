import React from "react";
import Accordion from "../components/Accordion";

export default function Partners() {
  return (
    <div className="page-layout">
      <h2> Partners och samverkande organisationer</h2>
      <p>
        Alla Tillsammans drivs av frivilliga krafter i civilsamhällets
        organisationer på Tjörn i dialog med Tjörns kommun och med stöd från
        lokalt näringsliv.
      </p>
      <p>Nedan hittar du medverkande partners och deras fokus i samarbetet.</p>
      <div>
        <Accordion
          title="Tjörns Kommun"
          content="<a href=`https://www.tjorn.se/`>Tjörns Kommun</a>"
        />
        <Accordion
          title="Svenska Kyrkan"
          content="<a href=`https://www.svenskakyrkan.se/tjorn`>Svenska Kyrkan Tjörn</a>"
        />
        <Accordion
          title="Egnahemsfabriken"
          content="<a href=`https://www.egnahemsfabriken.se`>Egnahemsfabriken</a>"
        />
        <Accordion
          title="Tjörns Röda Korskrets"
          content="<a href=`https://kommun.redcross.se/tjorn/`>Tjörns Röda Korskrets</a>"
        />
        <Accordion
          title="Rädda Barnen Tjörn"
          content="<a href=`https://www.facebook.com/raddabarnentjorn/`>
          Rädda Barnen Tjörn
        </a>"
        />
        <Accordion
          title="SPF Seniorerna Tjörnveteranerna"
          content="<a href=`https://www.spfseniorerna.se//`>
          SPF Seniorerna Tjörnveteranerna</a>"
        />
        <Accordion
          title="Rädda Barnen Tjörn"
          content="<a href=`https://www.facebook.com/raddabarnentjorn/`>
          Rädda Barnen Tjörn</a>"
        />
        <Accordion
          title="Agapes vänner"
          content="<a href=`https://www.facebook.com/Agapes-v%C3%A4nner-evenemang-STO-204569240323939/`>
          Agapes vänner</a>"
        />
        <Accordion
          title="Studieförbundet Vuxenskolan"
          content="<a href=`https://www.sv.se/`>Studieförbundet Vuxenskolan</a>"
        />
        <Accordion
          title="Frivilliga Resursgruppen"
          content="<a href=`https://www.civil.se/`>Frivilliga Resursgruppen</a>"
        />
      </div>

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
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
