import React from "react";

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
          Tjörns Kommun
          <em>Svenska Kyrkan</em>
          <em>Egnahemsfabriken</em>
          <em>Frivilliga Resursgruppen</em>
          <em>Röda Korset</em>
          <em>Rädda Barnen</em>
          <em>Agapes Vänner</em>
          <em>STO FN-förening</em>
          <em>Naturskyddsföreningen</em>
          <em>Studieförbundet Vuxenskolan</em>
          <em>Frikyrkor på Tjörn</em>
          <em>SPF Seniorerna Tjörnveteranerna</em>
          <em>PRO Tjörn</em>
          <em>PRO Kaprifolen</em>
          <em>Guldkanten</em>
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
            Vill du donera pengar till Ukraina hänvisar vi dig till de
            organisationer som är på plats:{" "}
            <a className="simple-link" href="https://www.raddabarnen.se">
              Rädda barnen
            </a>
            ,{" "}
            <a className="simple-link" href="https://www.rodakorset.se">
              Röda Korset
            </a>
            ,{" "}
            <a
              className="simple-link"
              href="https://www.svenskakyrkan.se/act/ge-en-gava"
            >
              ACT
            </a>
            ,{" "}
            <a className="simple-link" href="https://www.sverigeforunhcr.se">
              UNHCR Ukraina
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
            href="https://forms.monday.com/forms/698901a41bcd076751d3fc34de7e4de7?r=use1"
            className="large-button draw meet"
          >
            Erbjud boende
          </a>
          <a
            href="https://forms.monday.com/forms/7898103f8bf4694d8d5c3015ca887c37?r=use1"
            className="large-button draw meet"
          >
            Erbjud arbete
          </a>
          <a
            href="https://forms.monday.com/forms/bc5947aba7715dff06035a9e7ea53994?r=use1"
            className="large-button draw meet"
          >
            Donera saker
          </a>
          <a
            href="https://forms.monday.com/forms/69fc84b9ea6633b87d33ee675c97f6c7?r=use1"
            className="large-button large-button-accent draw"
          >
            Anmäl ett behov
          </a>
          <br />
          <a
            className="small-button draw meet"
            href="https://forms.monday.com/forms/e8eb72b489db14da16d374516228f0bb?r=use1"
          >
            Kontakta oss/Ge feedback
          </a>
        </div>
      </div>
    </>
  );
}
