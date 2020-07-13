import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/firestore";

import { medium } from "./CellSizes";

const GroupsTable = (props) => {
  const { tableData, refreshAction } = props;

  const [data, setData] = useState(tableData);
  const db = firebase.firestore();

  const groupsColumns = [
    {
      title: "Gruppnamn",
      field: "gruppnamn",
      render: (rowData) => (
        <Link to={`/grupp/${rowData.länkNamn}/${rowData.id}`}>
          {rowData.gruppnamn}
        </Link>
      ),
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Beskrivning",
      field: "kommentarer",
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Kontakt",
      field: "kontakt",
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Telefon",
      field: "telefon",
    },
    {
      title: "Email",
      field: "email",
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Reserv",
      field: "reserv",
      cellStyle: medium,
      headerStyle: medium,
    },
    { title: "Reserv telefon", field: "reservTelefon" },
    {
      title: "Reserv email",
      field: "reservEmail",
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Address",
      field: "address",
      cellStyle: medium,
      headerStyle: medium,
    },
    { title: "Postkod", field: "postkod" },
    { title: "Skapad", field: "datum", editable: "never" },
  ];

  //Update existing group
  async function updateGroup(newData, oldData) {
    const currDocId = newData.id;
    let groupRef = db.collection("groups").doc(currDocId);

    groupRef.update({
      datum: newData.datum ? newData.datum : "",
      gruppnamn: newData.gruppnamn ? newData.gruppnamn : "",
      kontakt: newData.kontakt ? newData.kontakt : "",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
      telefon: newData.telefon ? newData.telefon : "",
      email: newData.email ? newData.email : "",
      reserv: newData.reserv ? newData.reserv : "",
      reservTelefon: newData.reservTelefon ? newData.reservTelefon : "",
      reservEmail: newData.reservEmail ? newData.reservEmail : "",
      address: newData.address ? newData.address : "",
      postkod: newData.postkod ? newData.postkod : "",
      status: newData.status ? newData.status : "1",
    });
  }

  //Re-render if the data passed to the table changes - which it should do if we edit a row
  useEffect(() => {
    console.log("Groupdata has changed - rerendering");
    setData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  return (
    <MaterialTable
      title=""
      columns={groupsColumns}
      data={data}
      options={{
        paging: true,
        exportButton: true,
        draggable: true,
      }}
      localization={{
        pagination: {
          labelDisplayedRows: "{from}-{to} av {count}",
        },
        toolbar: {
          nRowsSelected: "{0} rader valda",
        },
        header: {
          actions: " ",
        },
        body: {
          emptyDataSourceMessage: "Här var det tomt!",
          filterRow: {
            filterTooltip: "Filter",
          },
        },
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            updateGroup(newData, oldData);
            refreshAction();
            resolve();
          }),
      }}
    />
  );
};

export default GroupsTable;
