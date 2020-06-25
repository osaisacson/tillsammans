export const sendOrderEmail = (content) => {
  const email = `EMAIL TILL GRUPPLEDARE HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny beställning från ${
    content.förnamn ? content.förnamn : ""
  } ${content.efternamn ? content.efternamn : ""}`;
  const emailBody = `
  %0A 
  %0A 
  ************ KLIPP IN RELEVANT EMAIL ADDRESS I ADDRESSFÄLTET OVAN, RADERA SEN DET HÄR ************: 
  %0A 
  %0A 
  Yttre Grupp Norra Tjörn: helena.johannesson@svenskakyrkan.se, catharina.schonback@svenskakyrkan.se
  %0A 
  %0A 
  Yttre Grupp Skärhamn: gunilla.e.gustafsson@svenskakyrkan.se, jaana.pollari.lindstrom@svenskakyrkan.se
  %0A 
  %0A 
  Yttre Grupp Centrala Tjörn: maria.eriksson1@svenskakyrkan.se, erika.andersson@svenskakyrkan.se, josefin.ulmfelt@svenskakyrkan.se
  %0A 
  %0A 
  Yttre Grupp Mjörn: erik@egnahemsfabriken.se
  %0A 
  %0A 
  Yttre Grupp Rönnäng: Tina.hallin@bredband2.com, erik@egnahemsfabriken.se
  %0A 
  %0A 
  OBS! Under sommarsemestern vecka 28-32 så går alla beställningar till en grupp: Yttre Grupp Centrala Tjörn. Maila lisa.m.sall@svenskakyrkan.se,
  helena.johannesson@svenskakyrkan.se,
  Catharina.Schonback@svenskakyrkan.se,
  elisabeth.samuelsson@svenskakyrkan.se
  ************************************************************************************************
  Hej! %0A
    %0A 
    Ni har fått in en ny beställning till er volontärgrupp från Alla Tillsammans: 
    %0A 
    %0A
    --------------------------------------------
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : "-"}, 
    %0A
    Tid kan vänta: ${content.tidsrymd ? content.tidsrymd : "-"} 
    %0A 
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ""} 
    %0A
    Efternamn: ${content.efternamn ? content.efternamn : ""} 
    %0A
    Email: ${content.email ? content.email : "-"} 
    %0A
    Telefon: ${content.telefon ? content.telefon : "-"} 
    %0A
    Address: ${content.address ? content.address : "-"} 
    %0A
    Postkod: ${content.postkod ? content.postkod : "-"} 
    %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ""} 
    %0A
    Typ: ${content.typ ? content.typ : "Ingen"} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : "-"} 
    %0A
    %0A
    Swish: ${content.swish ? "Ja" : "Nej"} 
    %0A
    Kontant: ${content.kontant ? "Ja" : "Nej"} 
    %0A
    Faktura: ${content.faktura ? "Ja" : "Nej"} 
    %0A
    %0A
    --------------------------------------------
    %0A
    %0A
    Gå in på er sida (kontakta tjorn@allatillsammans.se om ni behöver adressen/login) 
    %0A
    Hitta alla detaljer om beställningen där, och information om nästa steg! 
    %0A
    %0A
    Låt mig veta om ni har några frågor! %0A
    Vänliga hälsningar, 
    %0A
    %0A
    %0A
    %0A
    %0A
    %0A
  `;
  window.open("mailto:" + email + "?subject=" + subject + "&body=" + emailBody);
};

export const sendConfirmationEmail = (content) => {
  const email = `${
    content.email
      ? content.email
      : `INGEN EMAIL - RING ISTÄLLET ${content.telefon}`
  }, tjorn@allatillsammans.se`;
  const subject =
    "Alla Tillsammans - Er beställning har fördelats till volontärgrupp!";
  const emailBody = `Hej ${content.förnamn ? content.förnamn : ""}! %0A
    %0A 
    Er beställning på https://tjorn.allatillsammans.se har mottagits och fördelats till volontärgruppen: 
    %0A 
    %0A 
    ************ RADERA DE SOM INTE ÄR AKTUELLA NEDAN ************: 
    %0A 
    %0A
    YTTRE GRUPP NORRA TJÖRN
    %0A
    Gruppledare: Catharina Schönbeck, Helena Johannesson
    %0A
    Telefon: 0733-230587, 0733-230571
    %0A
    %0A
    YTTRE GRUPP SKÄRHAMN
    %0A
    Gruppledare: Gunilla Gustafsson, Jaana Pollari Lindström
    %0A
    Telefon: 0733-230514, 0733- 230506
    %0A
    %0A
    YTTRE GRUPP CENTRALA TJÖRN
    %0A
    Gruppledare: Maria Eriksson,  Erika Andersson, Josefin Ulmfelt
    %0A
    Telefon: 0733-230515, 0733230535, 0733-23053
    %0A
    %0A
    YTTRE GRUPP MJÖRN
    %0A
    Gruppledare: Erik Berg
    %0A
    Telefon: 0703-022574
    %0A
    %0A
    YTTRE GRUPP RÖNNÄNG: se kontakt under 'grupper'
    %0A 
    %0A 
    ***************************************************************************
    %0A
    %0A
    Så snart vi har möjlighet kommer en volontär från gruppen att kontakta er för att utföra ärendet.
    %0A
    %0A
    Med vänliga hälsningar,
    %0A
    Volontärplattform Tjörn - civilsamhället i samverkan
    %0A
    %0A
    Anna Berglund
    %0A
    Samordnare
    %0A
    tjorn@allatillsammans.se
    %0A
    %0A
    %0A
    %0A
    KOPIA AV DIN BESTÄLLNING:
    %0A
    --------------------------------------------
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : "-"}, 
    %0A
    Tid kan vänta: ${content.tidsrymd ? content.tidsrymd : "-"} 
    %0A 
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ""} 
    %0A
    Efternamn: ${content.efternamn ? content.efternamn : ""} 
    %0A
    Email: ${content.email ? content.email : "-"} 
    %0A
    Telefon: ${content.telefon ? content.telefon : "-"} 
    %0A
    Address: ${content.address ? content.address : "-"} 
    %0A
    Postkod: ${content.postkod ? content.postkod : "-"} 
    %0A
    %0A
    Typ: ${content.typ ? content.typ : "Ingen"} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : "-"} 
    %0A
    %0A
    Swish: ${content.swish ? "Ja" : "Nej"} 
    %0A
    Kontant: ${content.kontant ? "Ja" : "Nej"} 
    %0A
    Faktura: ${content.faktura ? "Ja" : "Nej"} 
    %0A
    %0A
    --------------------------------------------
    %0A
    %0A
    %0A
    %0A
    %0A
    %0A
  `;
  window.open("mailto:" + email + "?subject=" + subject + "&body=" + emailBody);
};

export const sendGroupOrderEmail = (content) => {
  const email = `EMAIL TILL VOLONTÄR HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny beställning att utföra: ${
    content.förnamn ? content.förnamn : ""
  } ${content.efternamn ? content.efternamn : ""}`;
  const emailBody = `Hej! 
    %0A
    %0A 
    Jag har satt upp dig som volontär för att utföra nedan beställning. Kontakta gärna mig om du har några frågor!
    %0A 
    %0A
    -------------------------------------------- 
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : "-"}, 
    %0A
    Tid kan vänta: ${content.tidsrymd ? content.tidsrymd : "-"} 
    %0A 
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ""} 
    %0A
    Efternamn: ${content.efternamn ? content.efternamn : ""} 
    %0A
    Email: ${content.email ? content.email : "-"} 
    %0A
    Telefon: ${content.telefon ? content.telefon : "-"} 
    %0A
    Address: ${content.address ? content.address : "-"} 
    %0A
    Postkod: ${content.postkod ? content.postkod : "-"} 
    %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ""} 
    %0A
    Typ: ${content.typ ? content.typ : "Ingen"} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : "-"} 
    %0A
    %0A
    Swish: ${content.swish ? "Ja" : "Nej"} 
    %0A
    Kontant: ${content.kontant ? "Ja" : "Nej"} 
    %0A
    Faktura: ${content.faktura ? "Ja" : "Nej"} 
    %0A
    %0A
    --------------------------------------------
    %0A
    %0A
    Vänliga hälsningar,
    %0A
    %0A
    %0A
    %0A
    %0A
    %0A
  `;
  window.open("mailto:" + email + "?subject=" + subject + "&body=" + emailBody);
};

export const sendVolunteerEmail = (content) => {
  const email = `EMAIL TILL GRUPPLEDARE HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny volontär: ${content.förnamn ? content.förnamn : ""} ${
    content.efternamn ? content.efternamn : ""
  }`;
  const emailBody = `
  ************ KLIPP IN RELEVANT EMAIL ADDRESS I ADDRESSFÄLTET OVAN, RADERA SEN DET HÄR ************: 
  %0A 
  %0A 
  Yttre Grupp Norra Tjörn: helena.johannesson@svenskakyrkan.se, catharina.schonback@svenskakyrkan.se
  %0A 
  %0A 
  Yttre Grupp Skärhamn: gunilla.e.gustafsson@svenskakyrkan.se, jaana.pollari.lindstrom@svenskakyrkan.se
  %0A 
  %0A 
  Yttre Grupp Centrala Tjörn: maria.eriksson1@svenskakyrkan.se, erika.andersson@svenskakyrkan.se, josefin.ulmfelt@svenskakyrkan.se
  %0A 
  %0A 
  Yttre Grupp Mjörn: erik@egnahemsfabriken.se
  %0A 
  %0A 
  Yttre Grupp Rönnäng: Tina.hallin@bredband2.com, erik@egnahemsfabriken.se
  %0A 
  %0A 
  ************************************************************************************************
  %0A 
  %0A 
  %0A 
  
  Hej! 
  %0A
    %0A 
    Ni har fått in en ny volontär till er volontärgrupp från Alla Tillsammans: 
    %0A
    %0A 
    --------------------------------------------
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : "-"}, %0A
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ""} %0A
    Efternamn: ${content.efternamn ? content.efternamn : ""} %0A
    Email: ${content.email ? content.email : "-"} %0A
    Telefon: ${content.telefon ? content.telefon : "-"} %0A
    Address: ${content.address ? content.address : "-"} %0A
    Postkod: ${content.postkod ? content.postkod : "-"} %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ""} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : "-"} %0A
    %0A
    Födelseår: ${content.födelseår ? content.födelseår : "-"} %0A
    Språk: ${content.språk ? content.språk : "-"} %0A
    %0A
    Körkort: ${content.körkort ? "Ja" : "Nej"} %0A
    Bil: ${content.bil ? "Ja" : "Nej"} %0A
    %0A
    Mat: ${content.mat ? "Ja" : "Nej"} %0A
    Varor: ${content.varor ? "Ja" : "Nej"} %0A
    Ärenden: ${content.ärenden ? "Ja" : "Nej"} %0A
    Djur: ${content.djur ? "Ja" : "Nej"} %0A
    Prat: ${content.prata ? "Ja" : "Nej"} %0A
    Myndigheter: ${content.myndigheter ? "Ja" : "Nej"} %0A
    Teknik: ${content.teknik ? "Ja" : "Nej"} %0A
    %0A
    --------------------------------------------
    %0A
    %0A
    %0A
    Gå in på er sida (kontakta tjorn@allatillsammans.se om ni behöver adressen/login) och hitta alla detaljer om nästa steg där.
    %0A
    %0A
    Allt gott! 
    %0A
    %0A
    %0A
    %0A
    %0A
    %0A
  `;
  window.open("mailto:" + email + "?subject=" + subject + "&body=" + emailBody);
};

export const sendWelcomeEmail = (content) => {
  const email = `${
    content.email
      ? content.email
      : `INGEN EMAIL - RING ISTÄLLET ${content.telefon}`
  }, tjorn@allatillsammans.se`;
  const subject = "Välkommen till Alla Tillsammans - Tjörn!";
  const emailBody = `Hej ${content.förnamn ? content.förnamn : ""} ${
    content.efternamn ? content.efternamn : ""
  }, välkommen till Alla Tillsammans - Tjörn! 
    %0A
    %0A
    Vi har tagit emot din anmälan om att som volontär hjälpa människor med sin vardag mot covid-19. Tack!
    %0A
    %0A
    Du har blivit uppsatt på gruppen nedan. Du kommer snart bli kontaktad av någon därifrån för att träffas och checka av innan det blir avstamp.
    %0A
    %0A 
    %0A 
    ************ RADERA DE SOM INTE ÄR AKTUELLA NEDAN ************: 
    %0A 
    %0A
    YTTRE GRUPP NORRA TJÖRN
    %0A
    Gruppledare: Catharina Schönbeck, Helena Johannesson
    %0A
    Telefon: 0733-230587, 0733-230571
    %0A
    %0A
    YTTRE GRUPP SKÄRHAMN
    %0A
    Gruppledare: Gunilla Gustafsson, Jaana Pollari Lindström
    %0A
    Telefon: 0733-230514, 0733- 230506
    %0A
    %0A
    YTTRE GRUPP CENTRALA TJÖRN
    %0A
    Gruppledare: Maria Eriksson,  Erika Andersson, Josefin Ulmfelt
    %0A
    Telefon: 0733-230515, 0733230535, 0733-23053
    %0A
    %0A
    YTTRE GRUPP MJÖRN
    %0A
    Gruppledare: Erik Berg
    %0A
    Telefon: 0703-022574
    %0A
    %0A
    YTTRE GRUPP RÖNNÄNG: se kontakt under 'grupper'
    %0A 
    %0A 
    ***************************************************************************
    %0A
    %0A
    Om du har några frågor under tiden, kontakta gärna gruppledaren ovan eller tjorn@allatillsammans.se!
    %0A
    %0A
    Allt gott! 
    %0A
    %0A
    %0A
    %0A
    %0A
    %0A
  `;
  window.open("mailto:" + email + "?subject=" + subject + "&body=" + emailBody);
};

export const sendGeneralVolunteerInfo = (content) => {
  const email = `EMAIL TILL DEN SOM SKA HANTERA VOLONTÄREN HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny volontär: ${content.förnamn ? content.förnamn : ""} ${
    content.efternamn ? content.efternamn : ""
  }`;
  const emailBody = `Hej! %0A
    %0A 
    Här kommer informationen om volontären! %0A 
    %0A
    Datum mottaget: ${content.datum ? content.datum : "-"}, %0A
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ""} %0A
    Efternamn: ${content.efternamn ? content.efternamn : ""} %0A
    Email: ${content.email ? content.email : "-"} %0A
    Telefon: ${content.telefon ? content.telefon : "-"} %0A
    Address: ${content.address ? content.address : "-"} %0A
    Postkod: ${content.postkod ? content.postkod : "-"} %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ""} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : "-"} %0A
    %0A
    Födelseår: ${content.födelseår ? content.födelseår : "-"} %0A
    Språk: ${content.språk ? content.språk : "-"} %0A
    %0A
    Körkort: ${content.körkort ? "Ja" : "Nej"} %0A
    Bil: ${content.bil ? "Ja" : "Nej"} %0A
    %0A
    Mat: ${content.mat ? "Ja" : "Nej"} %0A
    Varor: ${content.varor ? "Ja" : "Nej"} %0A
    Ärenden: ${content.ärenden ? "Ja" : "Nej"} %0A
    Djur: ${content.djur ? "Ja" : "Nej"} %0A
    Prat: ${content.prata ? "Ja" : "Nej"} %0A
    Myndigheter: ${content.myndigheter ? "Ja" : "Nej"} %0A
    Teknik: ${content.teknik ? "Ja" : "Nej"} %0A
    %0A
    --------------------------------------------
    %0A
    %0A
    Allt gott! 
    %0A
    %0A
    %0A
    %0A
    %0A
    %0A
  `;
  window.open("mailto:" + email + "?subject=" + subject + "&body=" + emailBody);
};
