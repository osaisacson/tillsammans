//Emails

export const sendOrderEmail = (content) => {
  const email = `EMAIL TILL GRUPPLEDARE HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny beställning från ${
    content.förnamn ? content.förnamn : ''
  } ${content.efternamn ? content.efternamn : ''}`;
  const emailBody = `Hej! %0A
    %0A 
    Ni har fått in en ny beställning till er volontärgrupp från Alla Tillsammans: 
    %0A 
    %0A
    --------------------------------------------
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : '-'}, 
    %0A
    Tid kan vänta: ${content.tidsrymd ? content.tidsrymd : '-'} 
    %0A 
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ''} 
    %0A
    Efternamn: ${content.efternamn ? content.efternamn : ''} 
    %0A
    Email: ${content.email ? content.email : '-'} 
    %0A
    Telefon: ${content.telefon ? content.telefon : '-'} 
    %0A
    Address: ${content.address ? content.address : '-'} 
    %0A
    Postkod: ${content.postkod ? content.postkod : '-'} 
    %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ''} 
    %0A
    Typ: ${content.typ ? content.typ : 'Ingen'} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : '-'} 
    %0A
    %0A
    Swish: ${content.swish ? 'Ja' : 'Nej'} 
    %0A
    Kontant: ${content.kontant ? 'Ja' : 'Nej'} 
    %0A
    Faktura: ${content.faktura ? 'Ja' : 'Nej'} 
    %0A
    %0A
    --------------------------------------------
    %0A
    %0A
    Nästa steg: 
    %0A
    1. Gå in på er sida (kontakta tjorn@allatillsammans.se om ni behöver adressen/login) 
    %0A
    2. Hitta alla detaljer om beställningen där, och tryck på 'kopiera detaljer till email' för att vidarebefordra till lämplig volontär 
    %0A
    3. Klicka 'Kopiera bekräftelse till beställare' för att kontakta beställaren och låt dom veta beställningen är mottagen och på gång. Om dom inte har email, ring eller sms:a. 
    %0A
    4. Uppdatera status på beställningen via er gruppsida till 'Klar' när den är klar.  
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
  window.open('mailto:' + email + '?subject=' + subject + '&body=' + emailBody);
};

export const sendConfirmationEmail = (content) => {
  const email = `${
    content.email
      ? content.email
      : `INGEN EMAIL - RING ISTÄLLET ${content.telefon}`
  }, tjorn@allatillsammans.se`;
  const subject =
    'Alla Tillsammans - Er beställning har fördelats till volontärgrupp!';
  const emailBody = `Hej ${content.förnamn ? content.förnamn : ''}! %0A
    %0A 
    Er beställning på https://tjorn.allatillsammans.se har mottagits och fördelats till volontärgruppen ***SKRIV NAMN PÅ VOLONTÄRGRUPP HÄR***: 
    %0A 
    %0A
    %0A
    . . . . . . . . . . . . . . . . ANTINGEN: OM INGEN VOLONTÄR HAR FÖRDELATS BESTÄLLNINGEN ÄNNU. . . . . . . . . . . . . . . . 
    %0A
    %0A
    Så snart vi har möjlighet kommer en volontär från gruppen att utföra ärendet alternativt kontakta er för kompletterande information.
    %0A
    %0A
    Med vänliga hälsningar,
    %0A
    Volontärplattform Tjörn - civilsamhället i samverkan
    %0A
    ***SKRIV DITT NAMN HÄR***
    %0A
    ***SKRIV DITT NUMMER/EMAIL HÄR***
    %0A
    %0A
    %0A
    %0A
    %0A
    . . . . . . . . . . . . . . . . . . . ELLER: OM EN VOLONTÄR HAR FÖRDELATS BESTÄLLNINGEN. . . . . . . . . . . . . . . . . . . 
    %0A
    %0A
    Så snart vi har möjlighet kommer volontären nedan att utföra ärendet alternativt kontakta er för kompletterande information.
    %0A
    %0A
    Tilldelad volontär (din kontakt vid frågor):
    %0A
    ****VOLONTÄRENS NAMN****
    %0A
    tel: ****VOLONTÄRENS TEL****
    %0A
    e-post: ****VOLONTÄRENS E-POST****
    %0A   
    %0A
    Med vänliga hälsningar,
    %0A
    Volontärplattform Tjörn - civilsamhället i samverkan
    %0A
    ***SKRIV DITT NAMN HÄR***
    %0A
    %0A
    . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    %0A
    %0A
    %0A
    %0A
    KOPIA AV DIN BESTÄLLNING:
    %0A
    --------------------------------------------
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : '-'}, 
    %0A
    Tid kan vänta: ${content.tidsrymd ? content.tidsrymd : '-'} 
    %0A 
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ''} 
    %0A
    Efternamn: ${content.efternamn ? content.efternamn : ''} 
    %0A
    Email: ${content.email ? content.email : '-'} 
    %0A
    Telefon: ${content.telefon ? content.telefon : '-'} 
    %0A
    Address: ${content.address ? content.address : '-'} 
    %0A
    Postkod: ${content.postkod ? content.postkod : '-'} 
    %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ''} 
    %0A
    Typ: ${content.typ ? content.typ : 'Ingen'} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : '-'} 
    %0A
    %0A
    Swish: ${content.swish ? 'Ja' : 'Nej'} 
    %0A
    Kontant: ${content.kontant ? 'Ja' : 'Nej'} 
    %0A
    Faktura: ${content.faktura ? 'Ja' : 'Nej'} 
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
  window.open('mailto:' + email + '?subject=' + subject + '&body=' + emailBody);
};

export const sendGroupOrderEmail = (content) => {
  const email = `EMAIL TILL VOLONTÄR HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny beställning att utföra: ${
    content.förnamn ? content.förnamn : ''
  } ${content.efternamn ? content.efternamn : ''}`;
  const emailBody = `Hej! 
    %0A
    %0A 
    Jag har satt upp dig som volontär för att utföra nedan beställning. Kontakta gärna mig om du har några frågor!
    %0A 
    %0A
    -------------------------------------------- 
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : '-'}, 
    %0A
    Tid kan vänta: ${content.tidsrymd ? content.tidsrymd : '-'} 
    %0A 
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ''} 
    %0A
    Efternamn: ${content.efternamn ? content.efternamn : ''} 
    %0A
    Email: ${content.email ? content.email : '-'} 
    %0A
    Telefon: ${content.telefon ? content.telefon : '-'} 
    %0A
    Address: ${content.address ? content.address : '-'} 
    %0A
    Postkod: ${content.postkod ? content.postkod : '-'} 
    %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ''} 
    %0A
    Typ: ${content.typ ? content.typ : 'Ingen'} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : '-'} 
    %0A
    %0A
    Swish: ${content.swish ? 'Ja' : 'Nej'} 
    %0A
    Kontant: ${content.kontant ? 'Ja' : 'Nej'} 
    %0A
    Faktura: ${content.faktura ? 'Ja' : 'Nej'} 
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
  window.open('mailto:' + email + '?subject=' + subject + '&body=' + emailBody);
};

export const sendVolunteerEmail = (content) => {
  const email = `EMAIL TILL GRUPPLEDARE HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny volontär: ${content.förnamn ? content.förnamn : ''} ${
    content.efternamn ? content.efternamn : ''
  }`;
  const emailBody = `Hej! %0A
    %0A 
    Ni har fått in en ny volontär till er volontärgrupp från Alla Tillsammans: 
    %0A
    %0A 
    --------------------------------------------
    %0A
    %0A
    Datum mottaget: ${content.datum ? content.datum : '-'}, %0A
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ''} %0A
    Efternamn: ${content.efternamn ? content.efternamn : ''} %0A
    Email: ${content.email ? content.email : '-'} %0A
    Telefon: ${content.telefon ? content.telefon : '-'} %0A
    Address: ${content.address ? content.address : '-'} %0A
    Postkod: ${content.postkod ? content.postkod : '-'} %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ''} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : '-'} %0A
    %0A
    Födelseår: ${content.födelseår ? content.födelseår : '-'} %0A
    Språk: ${content.språk ? content.språk : '-'} %0A
    %0A
    Körkort: ${content.körkort ? 'Ja' : 'Nej'} %0A
    Bil: ${content.bil ? 'Ja' : 'Nej'} %0A
    %0A
    Mat: ${content.mat ? 'Ja' : 'Nej'} %0A
    Varor: ${content.varor ? 'Ja' : 'Nej'} %0A
    Ärenden: ${content.ärenden ? 'Ja' : 'Nej'} %0A
    Djur: ${content.djur ? 'Ja' : 'Nej'} %0A
    Prat: ${content.prata ? 'Ja' : 'Nej'} %0A
    Myndigheter: ${content.myndigheter ? 'Ja' : 'Nej'} %0A
    Teknik: ${content.teknik ? 'Ja' : 'Nej'} %0A
    %0A
    --------------------------------------------
    %0A
    %0A
    Nästa steg: 
    %0A
    %0A
    VÄLKOMNA:
    %0A
    1. Gå in på er sida (kontakta tjorn@allatillsammans.se om ni behöver adressen/login) 
    %0A
    2. Klicka på knappen 'Skicka välkomst-email' för att skapa ett välkomst-email till volontären, eller ring om de inte har någon email. 
    %0A
    3. Efter det är skickat/ringt: ändra status på volontären till 'Välkomnad'. 
    %0A
    %0A
    TRÄNA: %0A
    1. Efter välkomnandet är gjort ovan, skicka vidare informationen om volontären till den som kan träna denna genom att klicka 'Kopiera detaljer till email'. 
    %0A
    2. Uppdatera status på volontären till 'aktiv' när volontären är tränad.  
    %0A
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
  window.open('mailto:' + email + '?subject=' + subject + '&body=' + emailBody);
};

export const sendGroupVolunteerEmail = (content) => {
  const email = `EMAIL TILL DEN SOM SKA HANTERA VOLONTÄREN HÄR, tjorn@allatillsammans.se`;
  const subject = `Ny volontär: ${content.förnamn ? content.förnamn : ''} ${
    content.efternamn ? content.efternamn : ''
  }`;
  const emailBody = `Hej! %0A
    %0A 
    Här kommer informationen om volontären! %0A 
    %0A
    Datum mottaget: ${content.datum ? content.datum : '-'}, %0A
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ''} %0A
    Efternamn: ${content.efternamn ? content.efternamn : ''} %0A
    Email: ${content.email ? content.email : '-'} %0A
    Telefon: ${content.telefon ? content.telefon : '-'} %0A
    Address: ${content.address ? content.address : '-'} %0A
    Postkod: ${content.postkod ? content.postkod : '-'} %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ''} 
    %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : '-'} %0A
    %0A
    Födelseår: %0A ${content.födelseår ? content.födelseår : '-'} %0A
    Språk: %0A ${content.språk ? content.språk : '-'} %0A
    %0A
    Körkort: ${content.körkort ? 'Ja' : 'Nej'} %0A
    Bil: ${content.bil ? 'Ja' : 'Nej'} %0A
    %0A
    Mat: ${content.mat ? 'Ja' : 'Nej'} %0A
    Varor: ${content.varor ? 'Ja' : 'Nej'} %0A
    Ärenden: ${content.ärenden ? 'Ja' : 'Nej'} %0A
    Djur: ${content.djur ? 'Ja' : 'Nej'} %0A
    Prat: ${content.prata ? 'Ja' : 'Nej'} %0A
    Myndigheter: ${content.myndigheter ? 'Ja' : 'Nej'} %0A
    Teknik: ${content.teknik ? 'Ja' : 'Nej'} %0A
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
  window.open('mailto:' + email + '?subject=' + subject + '&body=' + emailBody);
};

export const sendWelcomeEmail = (content) => {
  const email = `${
    content.email
      ? content.email
      : `INGEN EMAIL - RING ISTÄLLET ${content.telefon}`
  }, tjorn@allatillsammans.se`;
  const subject = 'Välkommen till Alla Tillsammans - Tjörn!';
  const emailBody = `Hej ${content.förnamn ? content.förnamn : ''} ${
    content.efternamn ? content.efternamn : ''
  }, välkommen till Alla Tillsammans - Tjörn! 
    %0A
    %0A
    Du kommer snart att bli kontaktad av en av våra andra volontärer för träning.
    %0A
    Om du har några frågor under tiden, kontakta oss på tjorn@allatillsammans.se
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
  window.open('mailto:' + email + '?subject=' + subject + '&body=' + emailBody);
};
