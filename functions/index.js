const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

/// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
//To check above configs: firebase functions:config:get
//To change above configs: firebase functions:config:set gmail.email='email@gmail.com' gmail.password='emailpassword'
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email to notify the administrator of a new order, upon creation
exports.sendNewOrderEmail = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snap, context) => {
    const orderData = snap.data();
    return sendNewOrderEmail(orderData);
  });

// Sends an email to notify the administrator of a new volunteer, upon creation
exports.sendNewVolunteerEmail = functions.firestore
  .document('volunteers/{volunteerId}')
  .onCreate((snap, context) => {
    const volunteerData = snap.data();
    return sendNewVolunteerEmail(volunteerData);
  });

// Email to notify the administrator of a new order - content
async function sendNewOrderEmail(orderData) {
  const mailOptions = {
    from: `Alla Tillsammans - Tjörn`,
    to: 'tjorn@allatillsammans.se',
    subject: `Ny beställning mottagen från ${orderData.förnamn} ${orderData.efternamn}`,
    html: `<h2>Ny beställning mottagen</h2>
          <p>
            <b>Namn: </b>${orderData.förnamn} ${orderData.efternamn}<br>
          </p>
          <p>
            <b>Mottagen: </b>${orderData.datum}<br>
            <b>Typ: </b>${orderData.typ}<br>
          </p>
          <p>
            <b>Tid kan vänta: </b>${orderData.tidsrymd}<br>
          </p>
          <p>
            <b>Telefon: </b>${orderData.telefon ? orderData.telefon : '-'}<br>
            <b>Email: </b>${orderData.email ? orderData.email : '-'}<br>
            <b>Address: </b>${orderData.address ? orderData.address : '-'}<br>
          </p>
          <p>
            <b>Beskrivning: </b>${orderData.beskrivning}<br>
          </p>
          <p>
          <b>Faktura: </b>${orderData.faktura ? 'Ja' : 'Nej'}<br>
          <b>Swish: </b>${orderData.swish ? 'Ja' : 'Nej'}<br>
          <b>Kontant: </b>${orderData.kontant ? 'Ja' : 'Nej'}<br>
        </p>
        <br>
        <p>
          <b>Nästa steg:</b><br>
          <ol>
            <li>Gå in på <a href="https://tjorn.allatillsammans.se/admin">tjorn.allatillsammans.se/admin</a></li>
            <li>Ändra vilken grupp beställningen ska fördelas till</li>
            <li>Ändra status till 'Fördelad till grupp'</li>
            <li>Klicka 'Kopiera detaljer till email' och skicka det genererade emailet till gruppledaren</li>
            <li>Klart!</li>
          </ol>
        </p>
        <p>För uppföljning: håll ett öga på fliken 'Fördelad till grupp'.</p> 
        <p>Beställningarna ska försvinna ur denna och in i 'Klar' fliken allteftersom gruppledarna genomför beställningarna. </p>
        <p>Om någon fastnar - kontakta gruppledaren för statuskoll.</p>
        <br>
        <br>
        <p>Allt gott!</p>
        `,
  };

  await mailTransport.sendMail(mailOptions);
  console.log('New order email notification sent!');
  return null;
}

// Email to notify the administrator of a new order - content
async function sendNewVolunteerEmail(volunteerData) {
  const mailOptions = {
    from: `Alla Tillsammans - Tjörn`,
    to: 'tjorn@allatillsammans.se',
    subject: `Ny volontär mottagen: ${volunteerData.förnamn} ${volunteerData.efternamn}`,
    html: `<h2>Ny volontär</h2>
    <p>
      <b>Namn: </b>${volunteerData.förnamn} ${volunteerData.efternamn}<br>
    </p>
    <p>
      <b>Mottagen: </b>${volunteerData.datum}<br>
    </p>
    <p>
      <b>Telefon: </b>${volunteerData.telefon}<br>
      <b>Email: </b>${volunteerData.email}<br>
      <b>Address: </b>${volunteerData.address}<br>
      <b>Postkod: </b>${volunteerData.postkod}<br>
    </p>
    <p>
      <b>Beskrivning: </b>${volunteerData.beskrivning}<br>
    </p>
    <p>
      <b>Födelseår: </b>${volunteerData.födelseår}<br>
      <b>Språk: </b>${volunteerData.språk}<br>
    </p>
    <p>
      <b>Körkort: </b>${volunteerData.körkort ? 'Ja' : 'Nej'}<br>
      <b>Bil: </b>${volunteerData.bil ? 'Ja' : 'Nej'}<br>
    </p>
    <p>
      <b>Mat: </b>${volunteerData.mat ? 'Ja' : 'Nej'}<br>
      <b>Varor: </b>${volunteerData.varor ? 'Ja' : 'Nej'}<br>
      <b>Ärenden: </b>${volunteerData.ärenden ? 'Ja' : 'Nej'}<br>
      <b>Djur: </b>${volunteerData.djur ? 'Ja' : 'Nej'}<br>
      <b>Prata: </b>${volunteerData.prata ? 'Ja' : 'Nej'}<br>
      <b>Myndigheter: </b>${volunteerData.myndigheter ? 'Ja' : 'Nej'}<br>
      <b>Teknik: </b>${volunteerData.teknik ? 'Ja' : 'Nej'}<br>
  </p>
  <br>
  <p>
    <b>Nästa steg:</b><br>
    <ol>
      <li>Gå in på <a href="https://tjorn.allatillsammans.se/admin">tjorn.allatillsammans.se/admin</a></li>
      <li>Ändra vilken grupp volontären ska fördelas till</li>
      <li>Ändra status till 'Fördelad till grupp'</li>
      <li>Klicka 'Kopiera detaljer till email' och skicka det genererade emailet till gruppledaren</li>
      <li>Klart!</li>
    </ol>
  </p>
  <p>För uppföljning: håll ett öga på fliken 'Fördelad till grupp'. </p>
  <p>Volontärerna ska försvinna ur denna och in i 'Välkomnade' och sen 'Aktiva' fliken allteftersom gruppledarna uppdaterar status. </p>
  <p>Om någon fastnar - kontakta gruppledaren för statuskoll.</p>
  <br>
  <br>
  <p>Allt gott!</p>
  `,
  };

  await mailTransport.sendMail(mailOptions);
  console.log('New volunteer email notification sent!');
  return null;
}
