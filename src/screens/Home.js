import React from "react";

export default function Home() {
  return (
    <>
      <div className="column-container">
        <div className="text-column">
          <h4>Civilsamhället i samverkan!</h4>
          <p>
            Alla tillsammans är en plattform där Tjörns kommun och civilsamhälle
            samarbetar runt insatser i extraordinära situationer, så som
            Covid-19 eller flyktingströmmar från kriget i Ukraina. Vårt
            gemensamma mål är att snabbt möta behov från utsatta och särskilt
            sårbara grupper.
          </p>
          <a
            className="special-color bold"
            href="https://www.facebook.com/groups/allatillsammanstjorn"
          >
            Se löpande uppdateringar i vår Facebook grupp!
          </a>
           <em>Ett samarbete mellan bland andra:</em>
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
            href="https://notionforms.io/forms/samarbetspartners"
          >
            Gå med som samarbetspartner
          </a>
        </div>

        <div className="button-column">
          <a
            href="https://notionforms.io/forms/behov"
            className="large-button large-button-accent draw"
          >
            Skicka in ett behov
          </a>
          <a
            href="https://curmudgeon.notion.site/Bli-volont-r-002d065b73424923a8d982c20467bc10"
            className="large-button draw meet"
          >
            Bli volontär
          </a>
          <a
            href="https://curmudgeon.notion.site/Sk-nk-saker-468f157d619a45cbb4e128dcfc972dab"
            className="large-button draw meet"
          >
            Donera saker
          </a>
          <br />
          {/* <a
            className="small-button draw meet"
            href="https://forms.monday.com/forms/e8eb72b489db14da16d374516228f0bb?r=use1"
          >
            Kontakta oss/Ge feedback
          </a> */}
        </div>
      </div>
    </>
  );
}
