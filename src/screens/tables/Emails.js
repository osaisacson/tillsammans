//Emails

export const sendOrderEmail = (content) => {
  const email = 'Email till mottagare här';
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
    3. Kontakta beställaren och låt dom veta beställningen är mottagen och på gång. 
    %0A
    4. Uppdatera status på beställningen via er gruppsida till 'klar' när den är klar.  
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

export const sendGroupOrderEmail = (content) => {
  const email = 'Email till volontär här';
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
  const email = 'Email till mottagare här';
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
  const email = 'Email till mottagare här';
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
  const email = content.email ? content.email : '';
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
