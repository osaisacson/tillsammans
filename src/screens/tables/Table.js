import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MaterialTable from 'material-table';
import Button from 'react-bootstrap/Button';

import ConfirmationCustomer from '../../components/ConfirmationCustomer';
import ConfirmationInternal from '../../components/ConfirmationInternal';

import RenderBadge from './../../components/RenderBadge';

import { small, medium, large, xlarge } from './CellSizes';
import {
  sendOrderEmail,
  sendConfirmationEmail,
  sendGroupOrderEmail,
  sendVolunteerEmail,
  sendGroupVolunteerEmail,
  sendWelcomeEmail,
} from './Emails';
import {
  groupDropdown,
  groupStatusDropdown,
  groupStatusDropdownForGroups,
  volunteerStatusDropdown,
  volunteerStatusDropdownForGroups,
} from './Dropdowns';

import firebase from 'firebase/app';
import 'firebase/firestore';

const Table = (props) => {
  //Set up hooks
  const [data, setData] = useState(props.tableData);

  //Common fields
  const mottaget = { title: 'Mottaget', field: 'datum', editable: 'never' };
  const förnamn = {
    title: 'Förnamn',
    field: 'förnamn',
    editable: 'never',
  };
  const efternamn = {
    title: 'Efternamn',
    field: 'efternamn',
    editable: 'never',
  };
  const tidsrymd = {
    title: 'Tid kan vänta',
    field: 'tidsrymd',
    editable: 'never',
    cellStyle: small,
    headerStyle: small,
  };
  const kommentarer = {
    title: 'Kommentarer (skriv extra info här)',
    field: 'kommentarer',
    cellStyle: large,
    headerStyle: large,
  };
  const beskrivning = {
    title: 'Beskrivning',
    field: 'beskrivning',
    editable: 'never',
    cellStyle: xlarge,
    headerStyle: xlarge,
  };
  const typ = {
    title: 'Typ',
    field: 'typ',
    editable: 'never',
    cellStyle: medium,
    headerStyle: medium,
  };
  const swish = {
    title: 'Swish',
    field: 'swish',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.swish} />,
  };
  const kontant = {
    title: 'Kontant',
    field: 'kontant',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.kontant} />,
  };
  const faktura = {
    title: 'Faktura',
    field: 'faktura',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.faktura} />,
  };
  const telefon = { title: 'Telefon', field: 'telefon' };
  const email = { title: 'Email', field: 'email' };
  const address = {
    title: 'Address',
    field: 'address',
    cellStyle: medium,
    headerStyle: medium,
  };
  const postkod = { title: 'Postkod', field: 'postkod' };
  const språk = { title: 'Språk', field: 'språk', editable: 'never' };
  const födelseår = {
    title: 'Födelseår',
    field: 'födelseår',
    editable: 'never',
  };
  const körkort = {
    title: 'Har körkort',
    field: 'körkort',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.körkort} />,
  };
  const bil = {
    title: 'Har bil',
    field: 'bil',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.bil} />,
  };
  const mat = {
    title: 'Mat',
    field: 'mat',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.mat} />,
  };
  const varor = {
    title: 'Varor',
    field: 'varor',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.varor} />,
  };
  const ärenden = {
    title: 'Ärenden',
    field: 'ärenden',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.ärenden} />,
  };
  const djur = {
    title: 'Djur',
    field: 'djur',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.djur} />,
  };
  const prata = {
    title: 'Prata',
    field: 'prata',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.prata} />,
  };
  const myndigheter = {
    title: 'Myndigheter',
    field: 'myndigheter',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.myndigheter} />,
  };
  const teknik = {
    title: 'Teknik',
    field: 'teknik',
    editable: 'never',
    render: (rowData) => <RenderBadge bool={rowData.teknik} />,
  };

  //Column headers
  const orderColumns = [
    mottaget,
    tidsrymd,
    förnamn,
    efternamn,
    {
      title: 'Status',
      field: 'status',
      lookup: groupStatusDropdown,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: 'Grupp',
      field: 'gruppId',
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },

    {
      title: 'Detaljer till grupp',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: (rowData) => (
        <ConfirmationInternal
          isGroupConfirmation={true}
          itemId={rowData.id}
          isConfirmed={rowData.skickadGrupp}
          refreshAction={props.refreshAction}
          onClickAction={sendOrderEmail.bind(this, rowData)}
        />
      ),
    },
    {
      title: 'Bekräftelse till beställare',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: (rowData) => (
        <ConfirmationCustomer
          buttonText="Skicka bekräftelse"
          refreshAction={props.refreshAction}
          onClickAction={sendConfirmationEmail.bind(this, rowData)}
          isConfirmed={rowData.skickadBeställare}
          data={rowData}
        />
      ),
    },
    {
      title: 'Detaljer till voluntär',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: (rowData) => (
        <ConfirmationInternal
          isVolunteerConfirmation={true}
          itemId={rowData.id}
          isConfirmed={rowData.skickadVolontär}
          refreshAction={props.refreshAction}
          onClickAction={sendVolunteerEmail.bind(this, rowData)}
        />
      ),
    },
    kommentarer,
    beskrivning,
    typ,
    swish,
    kontant,
    faktura,
    telefon,
    email,
    address,
    postkod,
  ];

  const groupOrderColumns = [
    {
      title: 'Bekräftelse',
      field: 'bekräftelse',
      cellStyle: medium,
      headerStyle: medium,
      render: (rowData) => (
        <div>Fyll i här om bekräftelse har skickats eller inte</div>
      ),
    },
    {
      title: 'Detaljer till volontär',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: (rowData) => (
        <Button
          onClick={sendGroupOrderEmail.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Skicka detaljer till volontär
        </Button>
      ),
    },
    mottaget,
    förnamn,
    efternamn,
    tidsrymd,
    {
      title: 'Status',
      field: 'status',
      lookup: groupStatusDropdownForGroups,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: 'Grupp',
      field: 'gruppId',
      editable: 'never',
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    kommentarer,
    beskrivning,
    typ,
    swish,
    kontant,
    faktura,
    telefon,
    email,
    address,
    postkod,
  ];

  const volunteerColumns = [
    {
      title: 'Skicka välkomst-email',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: (rowData) => (
        <Button
          onClick={sendWelcomeEmail.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Skicka välkomst-email
        </Button>
      ),
    },
    {
      title: 'Kopiera & skicka detaljer',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: (rowData) => (
        <Button
          onClick={sendVolunteerEmail.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Kopiera detaljer till email
        </Button>
      ),
    },
    mottaget,
    förnamn,
    efternamn,
    kommentarer,
    beskrivning,
    {
      title: 'Status',
      field: 'status',
      lookup: volunteerStatusDropdown,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: 'Grupp',
      field: 'gruppId',
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    telefon,
    email,
    address,
    postkod,
    språk,
    födelseår,
    körkort,
    bil,
    mat,
    varor,
    ärenden,
    djur,
    prata,
    myndigheter,
    teknik,
  ];

  const groupVolunteersColumns = [
    {
      title: 'Bekräftelse',
      field: 'bekräftelse',
      cellStyle: medium,
      headerStyle: medium,
      render: (rowData) => (
        <div>Fyll i här om bekräftelse har skickats eller inte</div>
      ),
    },
    {
      title: 'Kopiera & skicka detaljer',
      field: 'skicka',
      cellStyle: medium,
      headerStyle: medium,
      editable: 'never',
      render: (rowData) => (
        <Button
          onClick={sendGroupVolunteerEmail.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Kopiera detaljer till email
        </Button>
      ),
    },
    mottaget,
    förnamn,
    efternamn,
    kommentarer,
    beskrivning,
    {
      title: 'Status',
      field: 'status',
      lookup: volunteerStatusDropdownForGroups,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: 'Grupp',
      field: 'gruppId',
      editable: 'never',
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    telefon,
    email,
    address,
    postkod,
    språk,
    födelseår,
    körkort,
    bil,
    mat,
    varor,
    ärenden,
    djur,
    prata,
    myndigheter,
    teknik,
  ];

  const groupColumns = [
    {
      title: 'Gruppnamn',
      field: 'gruppnamn',
      render: (rowData) => (
        <Link to={`/grupp/${rowData.länkNamn}/${rowData.id}`}>
          {rowData.gruppnamn}
        </Link>
      ),
      cellStyle: medium,
      headerStyle: medium,
    },
    beskrivning,
    { title: 'Kontakt', field: 'kontakt' },
    telefon,
    email,
    address,
    postkod,
    { title: 'Skapad', field: 'datum', editable: 'never' },
    { title: 'adminNamn', field: 'adminNamn' },
    { title: 'adminPwd', field: 'adminPwd' },
  ];

  const cancelledColumns = [
    mottaget,
    kommentarer,
    telefon,
    email,
    address,
    postkod,
  ];

  //Set column headers depending on which screen we are in.
  const columndata = props.isOrders
    ? orderColumns
    : props.isGroupOrders
    ? groupOrderColumns
    : props.isVolunteers
    ? volunteerColumns
    : props.isGroupVolunteers
    ? groupVolunteersColumns
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
      kommentarer: newData.kommentarer ? newData.kommentarer : '',
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
      kommentarer: newData.kommentarer ? newData.kommentarer : '',
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
      status: newData.status ? newData.status : '1',
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
      status: newData.status ? newData.status : '1',
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
        draggable: true,
      }}
      localization={{
        pagination: {
          labelDisplayedRows: '{from}-{to} av {count}',
        },
        toolbar: {
          nRowsSelected: '{0} rader valda',
        },
        header: {
          actions: ' ',
        },
        body: {
          emptyDataSourceMessage: 'Här var det tomt!',
          filterRow: {
            filterTooltip: 'Filter',
          },
        },
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            props.isOrders || props.isGroupOrders
              ? updateOrder(newData, oldData)
              : props.isVolunteers || props.isGroupVolunteers
              ? updateVolunteer(newData, oldData)
              : props.isGroups
              ? updateGroup(newData, oldData)
              : updateCancelled(newData, oldData);
            props.refreshAction();
            resolve();
          }),
      }}
    />
  );
};

export default Table;
