import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';

//Components
import RenderBadge from './../../components/RenderBadge';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

const Table = props => {
  //Set constants
  const [data, setData] = useState(props.tableData);

  //Dropdowns
  const groupDropdown = {
    0: 'Ingen grupp vald',
    DDPDlLcTYYMQEJNlhzgD: 'Svenska Kyrkan Myggenäs',
    Pn5Uj8h84m5pjqSmL6sA: 'Svenska Kyrkan Skärhamn',
    uID02NUmUhp9mRqZbLF1: 'Svenska Kyrkan Kållekärr',
    TmhoPLMU6XmapwTSS6Hi: 'Inre grupp'
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
    width: 150,
    minWidth: 150
  };

  const medium = {
    width: 230,
    minWidth: 230
  };

  const large = {
    width: 300,
    minWidth: 300
  };

  const xlarge = {
    width: 350,
    minWidth: 350
  };

  //Column headers
  const orderColumns = [
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
    { title: 'Mottaget', field: 'datum', editable: 'never' },
    {
      title: 'Beskrivning',
      field: 'beskrivning',
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
      title: 'Tid kan vänta',
      field: 'tidsrymd',
      cellStyle: small,
      headerStyle: small
    },
    {
      title: 'Typ',
      field: 'typ',
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
    { title: 'Förnamn', field: 'förnamn' },
    { title: 'Efternamn', field: 'efternamn' },
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
    { title: 'Mottaget', field: 'datum', editable: 'never' },

    { title: 'Förnamn', field: 'förnamn' },
    { title: 'Efternamn', field: 'efternamn' },
    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Postkod', field: 'postkod' },
    {
      title: 'Kommentarer (skriv extra info här)',
      field: 'kommentarer',
      cellStyle: large,
      headerStyle: large
    },

    {
      title: 'Beskrivning',
      field: 'beskrivning',
      editable: 'never',
      cellStyle: xlarge,
      headerStyle: xlarge
    },
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
        <Link to={`/grupp/${rowData.id}`}>{rowData.gruppnamn}</Link>
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
    { title: 'Skapad', field: 'datum', editable: 'never' }
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
        paging: false,
        exportButton: true,
        draggable: true
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
