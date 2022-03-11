import React from "react";
import { Link } from "react-router-dom";

import School from "./../images/illustration-pointer-med-text.png";
import Icon2 from "./../images/symbol1.png";
import kaffe from "./../images/kaffe.png";

import IconButton from "./../components/IconButton";

export default function Home() {
  return (
    <>
      <div className="front-page-layout">
        <div className="large-text-container">
          Bli en del av civilsamhällets kamp med att stötta utsatta människor
          från Ukraina
        </div>
        <div className="large-button-container">
          <a
            href={
              "https://forms.monday.com/forms/2a476e0840fe2bb10e71588f5fb27cc2?r=use1"
            }
          >
            <IconButton text={"Bli volontär"} />
          </a>
          <a
            href={
              "https://forms.monday.com/forms/708fca4d836466da0f3ae17d466f461f?r=use1"
            }
          >
            <IconButton text={"Föreslå arbete"} />
          </a>
          <a
            href={
              "https://forms.monday.com/forms/698901a41bcd076751d3fc34de7e4de7?r=use1"
            }
          >
            <IconButton text={"Erbjud boende"} />
          </a>
          <a
            href={
              "https://forms.monday.com/forms/bc5947aba7715dff06035a9e7ea53994?r=use1"
            }
          >
            <IconButton text={"Donera resurser"} />
          </a>
        </div>
      </div>
    </>
  );
}
