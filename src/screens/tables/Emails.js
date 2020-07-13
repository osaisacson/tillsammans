const orderInfo = (content) => {
  return `
  <p>&nbsp;</p>
  <p>--------------------------------------------------</p>
  <pre><strong>Datum mottaget: </strong> ${
    content.datum ? content.datum : "-"
  }</pre>
<pre><strong>Tid kan vänta: </strong> ${
    content.tidsrymd ? content.tidsrymd : "-"
  } </pre>
<pre><strong>Förnamn: </strong> ${content.förnamn ? content.förnamn : ""}</pre>
<pre><strong>Efternamn: </strong> ${
    content.efternamn ? content.efternamn : ""
  } </pre>
<pre><strong>Email: </strong> ${content.email ? content.email : "-"} </pre>
<pre><strong>Telefon: </strong> ${
    content.telefon ? content.telefon : "-"
  } </pre>
<pre><strong>Address: </strong> ${
    content.address ? content.address : "-"
  } </pre>
<pre><strong>Postkod: </strong> ${
    content.postkod ? content.postkod : "-"
  } </pre>
<pre><strong>Typ: </strong>${content.typ ? content.typ : "Ingen"} </pre>
<pre><strong>Beskrivning: </strong>${
    content.beskrivning ? content.beskrivning : "-"
  } </pre>
<pre><strong>Swish:</strong> ${content.swish ? "Ja" : "Nej"} </pre>
<pre><strong>Kontant:</strong> ${content.kontant ? "Ja" : "Nej"} </pre>
<pre><strong>Faktura:</strong> ${content.faktura ? "Ja" : "Nej"}</pre>
<p>--------------------------------------------------</p>
<p>&nbsp;</p>
`;
};

const volunteerInfo = (content) => {
  return `
  <p>&nbsp;</p>
  <p>--------------------------------------------------</p>
  <pre><strong>Datum mottaget: </strong> ${
    content.datum ? content.datum : "-"
  }</pre>
  <pre><strong>Förnamn:</strong> ${content.förnamn ? content.förnamn : ""}</pre>
  <pre><strong>Efternamn:</strong> ${
    content.efternamn ? content.efternamn : ""
  }</pre>
  <pre><strong>Email:</strong> ${content.email ? content.email : "-"}</pre>
  <pre><strong>Telefon:</strong> ${
    content.telefon ? content.telefon : "-"
  }</pre>
  <pre><strong>Address:</strong> ${
    content.address ? content.address : "-"
  }</pre>
  <pre><strong>Postkod:</strong> ${
    content.postkod ? content.postkod : "-"
  }</pre>
  <pre><strong>Beskrivning:</strong> ${
    content.beskrivning ? content.beskrivning : "-"
  }</pre>
  <pre><strong>Födelseår:</strong> ${
    content.födelseår ? content.födelseår : "-"
  }</pre>
  <pre><strong>Språk:</strong> ${content.språk ? content.språk : "-"}</pre>
  <pre><strong>Körkort:</strong> ${content.körkort ? "Ja" : "Nej"}</pre>
  <pre><strong>Bil:</strong> ${content.bil ? "Ja" : "Nej"}</pre>
  <pre><strong>Mat:</strong> ${content.mat ? "Ja" : "Nej"}</pre>
  <pre><strong>Varor:</strong> ${content.varor ? "Ja" : "Nej"}</pre>
  <pre><strong>Ärenden:</strong> ${content.ärenden ? "Ja" : "Nej"}</pre>
  <pre><strong>Djur:</strong> ${content.djur ? "Ja" : "Nej"}</pre>
  <pre><strong>Prat:</strong> ${content.prata ? "Ja" : "Nej"}</pre>
  <pre><strong>Myndigheter:</strong> ${content.myndigheter ? "Ja" : "Nej"}</pre>
  <pre><strong>Teknik:</strong> ${content.teknik ? "Ja" : "Nej"}</pre>
<p>--------------------------------------------------</p>
<p>&nbsp;</p>
`;
};

const fikaInfo = (content) => {
  return `
  <p>&nbsp;</p>
  <p>--------------------------------------------------</p>
  <pre><strong>Datum mottaget: </strong> ${
    content.datum ? content.datum : "-"
  }</pre>
  <pre><strong>Förnamn: </strong> ${
    content.förnamn ? content.förnamn : ""
  } </pre>
  <pre><strong>Efternamn: </strong> ${
    content.efternamn ? content.efternamn : ""
  } </pre>
  <pre><strong> Email: </strong> ${content.email ? content.email : "-"} </pre>
  <pre><strong> Telefon: </strong> ${
    content.telefon ? content.telefon : "-"
  } </pre>
  <pre><strong> Beskrivning:  </strong> ${
    content.beskrivning ? content.beskrivning : "-"
  } </pre>
  <pre><strong>  Språkpreferens: </strong> ${
    content.språk ? content.språk : "-"
  } </pre>
  <div><strong>  Intresserad av:</strong> </div>
  <pre><strong> Bokklubb: </strong> ${content.books ? "Ja" : "Nej"} </pre>
  <pre><strong>  Trädgård och odling: </strong> ${
    content.gardening ? "Ja" : "Nej"
  } </pre>
  <pre><strong> Världsläget: </strong> ${
    content.globalPolitics ? "Ja" : "Nej"
  } </pre>
  <pre><strong> Lokalkultur: </strong> ${
    content.localCulture ? "Ja" : "Nej"
  } </pre>
  <pre><strong> Ny teknik: </strong> ${content.newTech ? "Ja" : "Nej"} </pre>
  <pre><strong> Föreläsningar: </strong> ${
    content.lectures ? "Ja" : "Nej"
  } </pre>
  <pre><strong>Kan tänka sig att hålla en max 15 minuter lång föreläsning om detta: </strong> 
    ${content.lecture ? content.lecture : ""} </pre>
<p>--------------------------------------------------</p>
<p>&nbsp;</p>
`;
};

export const sendOrderToGroup = (content) => {
  return `
  <p>Hej!</p>
  <p>Ni har fått in en ny beställning till er grupp från Alla Tillsammans: </p>
  ${orderInfo(content)}
  <div>Gå in på er sida (kontakta tjorn@allatillsammans.se om ni behöver adressen/login) </div>
  <div> Hitta alla detaljer om beställningen där, och information om nästa steg! </div>
  <p>&nbsp;</p>
  <p> Med vänliga hälsningar,</p>
  <div> Samordnaren</div>
  <div> Volontärplattform Tjörn - civilsamhället i samverkan</div>
  <div> tjorn@allatillsammans.se</div>
  `;
};

export const sendConfirmationToRecipientEmail = (content, group) => {
  return `
  <p>Hej!</p>
  <p>Er beställning på tjorn.allatillsammans.se har mottagits och fördelats till ${
    group.gruppnamn
  }.</p>
  <p>&nbsp;</p>
  <p>Kontaktpersoner:</p>
  <p>${group.kontakt}: ${group.email} ${group.telefon}</p>
  <p>${group.reserv}: ${group.reservEmail} ${group.reservTelefon}</p>
  ${orderInfo(content)}
  </br>
  <p>Så snart vi har möjlighet kommer en volontär från gruppen att kontakta er för att utföra ärendet.</p>>
  <p>&nbsp;</p>
  <p> Med vänliga hälsningar,</p>
  <div> Samordnaren</div>
  <div> Volontärplattform Tjörn - civilsamhället i samverkan</div>
  <div> tjorn@allatillsammans.se</div>
  `;
};

export const sendOrderInfoToVolonteerEmail = (content, group) => {
  return `
  <p>Hej!</p>
  <p>Jag har satt upp dig som volontär för att utföra nedan beställning. Kontakta gärna mig om du har några frågor!</p>
  <p>Kontaktpersoner ${group.gruppnamn}:</p>
  <p>${group.kontakt}: ${group.email} ${group.telefon}</p>
  <p>${group.reserv}: ${group.reservEmail} ${group.reservTelefon}</p>
  ${orderInfo(content)}
  `;
};

export const sendVolunteerInfoToGroupEmail = (content) => {
  return `
  <p>Hej!</p>
  <p>Ni har fått in en ny volontär till er grupp från Alla Tillsammans: </p>
  ${volunteerInfo(content)}
  <p>Gå in på er sida (kontakta tjorn@allatillsammans.se om ni behöver adressen/login) och hitta alla detaljer om nästa steg där.</p>
  <p> Med vänliga hälsningar,</p>
  <div> Samordnaren</div>
  <div> Volontärplattform Tjörn - civilsamhället i samverkan</div>
  <div> tjorn@allatillsammans.se</div>
  `;
};

export const sendFikerInfoToGroupEmail = (content) => {
  return `
  <p>Hej!</p>
  <p>Ni har fått in en ny intressent till er fikagrupp från Alla Tillsammans: </p>
  ${fikaInfo(content)}
  <p>Gå in på er sida (kontakta tjorn@allatillsammans.se om ni behöver adressen/login) och hitta alla detaljer om nästa steg där.</p>
  <p> Med vänliga hälsningar,</p>
  <div> Samordnaren</div>
  <div> Volontärplattform Tjörn - civilsamhället i samverkan</div>
  <div> tjorn@allatillsammans.se</div>
  `;
};

export const sendWelcomeToFikerEmail = (content, group) => {
  return `
  <p>Hej ${
    content.förnamn ? content.förnamn : ""
  }, välkommen till Alla Tillsammans - Tjörn!</p>
  <p>Vi har tagit emot din anmälan om att vara med på Corona fika. Tack!</p>
  <p>Du har blivit uppsatt på gruppen ${
    group.gruppnamn
  }. Du kommer bli kontaktad av fikachefen om tid, datum och tema för nästa fika när detta är på gång.</p>
  <p>Om du har några frågor under tiden kontakta gärna gruppledarna nedan eller tjorn@allatillsammans.se!</p>
  <div>Kontaktpersoner för ${group.gruppnamn}</div>
  <p>Gruppledare: ${group.kontakt} - ${group.email}, ${group.telefon}</p>
  <p>Reserv: ${group.reserv} - ${group.reservEmail}, ${group.reservTelefon}</p>
  <p> Med vänliga hälsningar,</p>
  <div> Samordnaren</div>
  <div> Volontärplattform Tjörn - civilsamhället i samverkan</div>
  <div> tjorn@allatillsammans.se</div>
  `;
};

export const sendWelcomeToVolunteerEmail = (content, group) => {
  return `
  <p>Hej ${content.förnamn ? content.förnamn : ""} ${
    content.efternamn ? content.efternamn : ""
  }, välkommen till Alla Tillsammans - Tjörn!</p>
  <p>Vi har tagit emot din anmälan om att som volontär hjälpa människor med sin vardag mot covid-19. Tack!</p>
  <p>Du har blivit uppsatt på gruppen ${
    group.gruppnamn
  }. Du kommer snart bli kontaktad av någon därifrån för att träffas och checka av innan det blir avstamp.</p>
  <p>Om du har några frågor under tiden, kontakta gärna gruppledarna nedan eller tjorn@allatillsammans.se!</p>
  <div>Kontaktpersoner för ${group.gruppnamn}</div>
  <p>Gruppledare: ${group.kontakt} - ${group.email}, ${group.telefon}</p>
  <p>Reserv: ${group.reserv} - ${group.reservEmail}, ${group.reservTelefon}</p>
  <p> Med vänliga hälsningar,</p>
  <div> Samordnaren</div>
  <div> Volontärplattform Tjörn - civilsamhället i samverkan</div>
  <div> tjorn@allatillsammans.se</div>
  `;
};

export const sendGeneralVolunteerInfo = (content) => {
  return `<p>Hej! </p>
 <p>Här kommer informationen om volontären!</p>
    ${volunteerInfo(content)}
  `;
};

export const sendGeneralFikerInfo = (content) => {
  return `<p>Hej! </p>
 <p>Här kommer informationen om fikaintressenten!  </p>
    ${fikaInfo(content)}
    <p> Med vänliga hälsningar,</p>
    <div> Samordnaren</div>
    <div> Volontärplattform Tjörn - civilsamhället i samverkan</div>
    <div> tjorn@allatillsammans.se</div>
  `;
};
