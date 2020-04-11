import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

//Components
import RenderBadge from './../../components/RenderBadge';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

const Table = props => {
  //Set up hooks
  const [data, setData] = useState(props.tableData);

  //Dropdowns
  const groupDropdown = {
    0: 'Ingen grupp vald',
    Pn5Uj8h84m5pjqSmL6sA: 'Yttre Grupp Skärhamn',
    DDPDlLcTYYMQEJNlhzgD: 'Yttre Grupp Norra Tjörn',
    uID02NUmUhp9mRqZbLF1: 'Yttre Grupp Centrala Tjörn',
    TmhoPLMU6XmapwTSS6Hi: 'Inre grupp',
    R0tHIsIvM82th7Elq6zo: 'Kommunikatörerna'
  };

  const groupStatusDropdown = {
    1: 'Ny',
    2: 'Fördelad till grupp',
    // 3: 'fördelad-volontär', //TBD
    4: 'Klar',
    5: 'Pausad',
    6: 'Avbokad'
  };

  const groupStatusDropdownForGroups = {
    // 1: 'ny',
    2: 'Att bli utförd',
    // 3: 'fördelad-volontär', //TBD
    4: 'Klar',
    5: 'Pausad',
    6: 'Avbokad'
  };

  const volunteerStatusDropdown = {
    1: 'Ny',
    2: 'Fördelad till grupp',
    3: 'Välkomnad',
    4: 'Aktiv',
    5: 'Pausad',
    6: 'Olämplig'
  };

  const volunteerStatusDropdownForGroups = {
    // 1: 'Ny',
    2: 'Att bli välkomnad',
    3: 'Välkomnad',
    4: 'Aktiv',
    5: 'Pausad',
    6: 'Olämplig'
  };

  //Custom cell sizes
  const small = {
    width: 130,
    minWidth: 130
  };

  const medium = {
    width: 190,
    minWidth: 190
  };

  const large = {
    width: 300,
    minWidth: 300
  };

  const xlarge = {
    width: 350,
    minWidth: 350
  };

  //Send email
  const sendEmail = content => {
    const email = 'Email till mottagare här';
    const subject = `Ny beställning från ${
      content.förnamn ? content.förnamn : ''
    } ${content.efternamn ? content.efternamn : ''}`;
    const emailBody = `Hej! %0A
    %0A 
    Här kommer information om beställningen: %0A 
    %0A
    Datum mottaget: ${content.datum ? content.datum : '-'}, %0A
    Tid kan vänta: ${content.tidsrymd ? content.tidsrymd : '-'} %0A 
    %0A
    Förnamn: ${content.förnamn ? content.förnamn : ''} %0A
    Efternamn: ${content.efternamn ? content.efternamn : ''} %0A
    Email: ${content.email ? content.email : '-'} %0A
    Telefon: ${content.telefon ? content.telefon : '-'} %0A
    Address: ${content.address ? content.address : '-'} %0A
    Postkod: ${content.postkod ? content.postkod : '-'} %0A
    ${content.kommentarer ? `%0A Kommentarer: ${content.kommentarer} %0A` : ''} 
    %0A
    Typ: ${content.typ ? content.typ : 'Ingen'} %0A
    Beskrivning: %0A ${content.beskrivning ? content.beskrivning : '-'} %0A
    %0A
    Swish: ${content.swish ? 'Ja' : 'Nej'} %0A
    Kontant: ${content.kontant ? 'Ja' : 'Nej'} %0A
    Faktura: ${content.faktura ? 'Ja' : 'Nej'} %0A
  `;
    window.open(
      'mailto:' + email + '?subject=' + subject + '&body=' + emailBody
    );
  };

  //Column headers
  const orderColumns = [
    {
      title: 'Kopiera & skicka detaljer',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: rowData => (
        <Button
          onClick={sendEmail.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Kopiera detaljer till email
        </Button>
      )
    },
    { title: 'Mottaget', field: 'datum', editable: 'never' },
    {
      title: 'Tid kan vänta',
      field: 'tidsrymd',
      editable: 'never',
      cellStyle: small,
      headerStyle: small
    },
    {
      title: 'Status',
      field: 'status',
      lookup: props.isGroupOrders
        ? groupStatusDropdownForGroups
        : groupStatusDropdown,
      cellStyle: small,
      headerStyle: small
    },
    {
      title: 'Grupp',
      field: 'gruppId',
      editable: props.isGroupOrders ? 'never' : 'always',
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium
    },
    {
      title: 'Namn',
      field: 'namn',
      editable: 'never',
      cellStyle: medium,
      headerStyle: medium,
      render: rowData => (
        <div>
          {rowData.förnamn} {rowData.efternamn}
        </div>
      )
    },
    {
      title: 'Beskrivning',
      field: 'beskrivning',
      editable: 'never',
      cellStyle: xlarge,
      headerStyle: xlarge
    },
    {
      title: 'Kommentarer (skriv extra info här)',
      field: 'kommentarer',
      cellStyle: large,
      headerStyle: large
    },
    {
      title: 'Typ',
      field: 'typ',
      editable: 'never',
      cellStyle: medium,
      headerStyle: medium
    },
    {
      title: 'Swish',
      field: 'swish',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.swish} />
    },
    {
      title: 'Kontant',
      field: 'kontant',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.kontant} />
    },
    {
      title: 'Faktura',
      field: 'faktura',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.faktura} />
    },
    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    {
      title: 'Address',
      field: 'address',
      cellStyle: medium,
      headerStyle: medium
    },
    { title: 'Postkod', field: 'postkod' }
  ];

  const volunteerColumns = [
    { title: 'Mottaget', field: 'datum', editable: 'never' },
    {
      title: 'Status',
      field: 'status',
      lookup: props.isGroupVolunteers
        ? volunteerStatusDropdownForGroups
        : volunteerStatusDropdown,
      cellStyle: small,
      headerStyle: small
    },
    {
      title: 'Grupp',
      field: 'gruppId',
      editable: props.isGroupVolunteers ? 'never' : 'always',
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium
    },
    {
      title: 'Kommentarer (skriv extra info här)',
      field: 'kommentarer',
      cellStyle: large,
      headerStyle: large
    },
    {
      title: 'Namn',
      field: 'namn',
      editable: 'never',
      cellStyle: medium,
      headerStyle: medium,
      render: rowData => (
        <div>
          {rowData.förnamn} {rowData.efternamn}
        </div>
      )
    },
    {
      title: 'Beskrivning',
      field: 'beskrivning',
      editable: 'never',
      cellStyle: xlarge,
      headerStyle: xlarge
    },
    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Postkod', field: 'postkod' },
    { title: 'Språk', field: 'språk', editable: 'never' },
    { title: 'Födelseår', field: 'födelseår', editable: 'never' },
    {
      title: 'Har körkort',
      field: 'körkort',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.körkort} />
    },
    {
      title: 'Har bil',
      field: 'bil',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.bil} />
    },
    {
      title: 'Mat',
      field: 'mat',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.mat} />
    },
    {
      title: 'Varor',
      field: 'varor',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.varor} />
    },
    {
      title: 'Ärenden',
      field: 'ärenden',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.ärenden} />
    },
    {
      title: 'Djur',
      field: 'djur',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.djur} />
    },
    {
      title: 'Prata',
      field: 'prata',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.prata} />
    },
    {
      title: 'Myndigheter',
      field: 'myndigheter',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.myndigheter} />
    },
    {
      title: 'Teknik',
      field: 'teknik',
      editable: 'never',
      render: rowData => <RenderBadge bool={rowData.teknik} />
    }
  ];

  const groupColumns = [
    {
      title: 'Gruppnamn',
      field: 'gruppnamn',
      render: rowData => (
        <Link to={`/grupp/${rowData.länkNamn}/${rowData.id}`}>
          {rowData.gruppnamn}
        </Link>
      ),
      cellStyle: medium,
      headerStyle: medium
    },
    {
      title: 'Beskrivning',
      field: 'kommentarer',
      cellStyle: xlarge,
      headerStyle: xlarge
    },

    { title: 'Kontakt', field: 'kontakt' },
    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Postkod', field: 'postkod' },
    { title: 'Skapad', field: 'datum', editable: 'never' },
    { title: 'adminNamn', field: 'adminNamn' },
    { title: 'adminPwd', field: 'adminPwd' }
  ];

  const cancelledColumns = [
    { title: 'Mottagen', field: 'datum', editable: 'never' },
    {
      title: 'Kommentarer (skriv extra info här)',
      field: 'kommentarer',
      cellStyle: large,
      headerStyle: large
    },

    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Postkod', field: 'postkod' }
  ];

  //Set column headers depending on which screen we are in.
  const columndata =
    props.isOrders || props.isGroupOrders
      ? orderColumns
      : props.isVolunteers || props.isGroupVolunteers
      ? volunteerColumns
      : props.isGroups
      ? groupColumns
      : cancelledColumns;

  //Prep firestore
  const db = firebase.firestore();

  //Update existing order
  async function updateOrder(newData, oldData) {
    const currDocId = newData.id;
    let orderRef = db.collection('orders').doc(currDocId);

    orderRef.update({
      gruppId: newData.gruppId ? newData.gruppId : '',
      volontärId: newData.volontärId ? newData.volontärId : '',
      datum: newData.datum ? newData.datum : '',
      typ: newData.typ ? newData.typ : 'Ingen',
      beskrivning: newData.beskrivning ? newData.beskrivning : '',
      swish: newData.swish ? newData.swish : false,
      kontant: newData.kontant ? newData.kontant : false,
      faktura: newData.faktura ? newData.faktura : false,
      tidsrymd: newData.tidsrymd ? newData.tidsrymd : '',
      telefon: newData.telefon ? newData.telefon : '',
      förnamn: newData.förnamn ? newData.förnamn : '',
      efternamn: newData.efternamn ? newData.efternamn : '',
      email: newData.email ? newData.email : '',
      address: newData.address ? newData.address : '',
      postkod: newData.postkod ? newData.postkod : '',
      status: newData.status ? newData.status : '',
      kommentarer: newData.kommentarer ? newData.kommentarer : ''
    });
  }

  //Update existing volunteer
  async function updateVolunteer(newData, oldData) {
    const currDocId = newData.id;
    let volunteerRef = db.collection('volunteers').doc(currDocId);

    volunteerRef.update({
      gruppId: newData.gruppId ? newData.gruppId : '',
      förnamn: newData.förnamn ? newData.förnamn : '',
      efternamn: newData.efternamn ? newData.efternamn : '',
      telefon: newData.telefon ? newData.telefon : '',
      email: newData.email ? newData.email : '',
      address: newData.address ? newData.address : '',
      postkod: newData.postkod ? newData.postkod : '',
      beskrivning: newData.beskrivning ? newData.beskrivning : '',
      språk: newData.språk ? newData.språk : '',
      födelseår: newData.födelseår ? newData.födelseår : '',
      körkort: newData.körkort ? newData.körkort : false,
      bil: newData.bil ? newData.bil : false,
      mat: newData.mat ? newData.mat : false,
      varor: newData.varor ? newData.varor : false,
      ärenden: newData.ärenden ? newData.ärenden : false,
      djur: newData.djur ? newData.djur : false,
      prata: newData.prata ? newData.prata : false,
      myndigheter: newData.myndigheter ? newData.myndigheter : false,
      teknik: newData.teknik ? newData.teknik : false,
      datum: newData.datum ? newData.datum : '',
      status: newData.status ? newData.status : '1',
      kommentarer: newData.kommentarer ? newData.kommentarer : ''
    });
  }

  //Update existing group
  async function updateGroup(newData, oldData) {
    const currDocId = newData.id;
    let groupRef = db.collection('groups').doc(currDocId);

    groupRef.update({
      datum: newData.datum ? newData.datum : '',
      gruppnamn: newData.gruppnamn ? newData.gruppnamn : '',
      adminNamn: newData.adminNamn ? newData.adminNamn : '',
      adminPwd: newData.adminPwd ? newData.adminPwd : '',
      kontakt: newData.kontakt ? newData.kontakt : '',
      kommentarer: newData.kommentarer ? newData.kommentarer : '',
      telefon: newData.telefon ? newData.telefon : '',
      email: newData.email ? newData.email : '',
      address: newData.address ? newData.address : '',
      postkod: newData.postkod ? newData.postkod : '',
      status: newData.status ? newData.status : '1'
    });
  }

  //Update existing cancellation
  async function updateCancelled(newData, oldData) {
    const currDocId = newData.id;
    let cancelledRef = db.collection('cancellations').doc(currDocId);

    cancelledRef.update({
      datum: newData.datum ? newData.datum : '',
      telefon: newData.telefon ? newData.telefon : '',
      email: newData.email ? newData.email : '',
      address: newData.address ? newData.address : '',
      postkod: newData.postkod ? newData.postkod : '',
      status: newData.status ? newData.status : '1'
    });
  }

  //Re-render if the data passed to the table changes - which it should do if we edit a row
  useEffect(() => {
    console.log('data has changed - rerendering');
    setData(props.tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tableData]);

  return (
    <MaterialTable
      title=""
      columns={columndata}
      data={data}
      options={{
        paging: true,
        exportButton: true,
        draggable: true
      }}
      localization={{
        pagination: {
          labelDisplayedRows: '{from}-{to} av {count}'
        },
        toolbar: {
          nRowsSelected: '{0} rader valda'
        },
        header: {
          actions: ' '
        },
        body: {
          emptyDataSourceMessage: 'Här var det tomt!',
          filterRow: {
            filterTooltip: 'Filter'
          }
        }
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            props.isOrders || props.isGroupOrders
              ? updateOrder(newData, oldData)
              : props.isVolunteers || props.isGroupVolunteers
              ? updateVolunteer(newData, oldData)
              : props.isGroups
              ? updateGroup(newData, oldData)
              : updateCancelled(newData, oldData);
            props.refreshAction();
            resolve();
          })
      }}
    />
  );
};

export default Table;
