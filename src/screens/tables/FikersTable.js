import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/firestore";

import RenderBadge from "../../components/RenderBadge";
import ButtonToFormEmail from "../../components/ButtonToFormEmail";
import ButtonToAction from "../../components/ButtonToAction";

import { large, xlarge } from "./CellSizes";

import { fikerStatusDropdown } from "./Dropdowns";

const FikersTable = (props) => {
  const { isAdmin, tableData, groupData, refreshAction } = props;

  const [data, setData] = useState(tableData);
  const db = firebase.firestore();

  //Column headers - show/hide conditionally depending on if we are in the main or groupleader view
  const fikersColumns = [
    {
      title: "Mottaget",
      field: "datum",
      editable: "never",
    },
    {
      title: "Förnamn",
      field: "förnamn",
      editable: "never",
    },
    {
      title: "Efternamn",
      field: "efternamn",
      editable: "never",
    },
    {
      title: "Status",
      field: "status",
      lookup: fikerStatusDropdown, //TBD see if this changes whether we are on orders, volunteers, fikers, groups...
      cellStyle: large,
      headerStyle: large,
      render: (rowData) => (
        <>
          {/* Show the setting of groups only of we are on the main admin order screen  */}
          {isAdmin ? (
            <>
              <ButtonToAction
                isFiker
                isSetGroups
                groupData={groupData}
                formData={rowData}
                refreshAction={refreshAction}
              />
              <ButtonToFormEmail
                isSendGroup
                successKey={rowData.skickadFikapersonTillGrupp}
                actionInForm={"sendFikerInfoToGroup"}
                groupData={groupData}
                formData={rowData}
                refreshAction={refreshAction}
              />
            </>
          ) : null}
          {/* Below fields show for both main admin and group admin  */}
          {!rowData.email ? (
            <ButtonToAction
              isFiker
              isSetConfirmed
              formData={rowData}
              successKey={rowData.skickadBekräftelseTillFikaperson}
              refreshAction={refreshAction}
            />
          ) : (
            <ButtonToFormEmail
              isSendToRecipient
              successKey={rowData.skickadBekräftelseTillFikaperson}
              actionInForm={"sendFikerWelcome"}
              groupData={groupData}
              formData={rowData}
              refreshAction={refreshAction}
            />
          )}
          <ButtonToAction
            isFiker
            isToggleActive
            formData={rowData}
            refreshAction={refreshAction}
          />
        </>
      ),
    },
    {
      title: "Kommentarer (skriv extra info här)",
      field: "kommentarer",
      cellStyle: large,
      headerStyle: large,
    },
    {
      title: "Beskrivning",
      field: "beskrivning",
      editable: "never",
      cellStyle: xlarge,
      headerStyle: xlarge,
    },

    { title: "Telefon", field: "telefon" },
    { title: "Email", field: "email" },
    {
      title: "Via telefon",
      field: "oldSchool",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.oldSchool} />,
    },
    {
      title: "Via smartphone/platta/dator",
      field: "newSchool",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.newSchool} />,
    },
    {
      title: "Bokklubb",
      field: "books",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.books} />,
    },
    {
      title: "Trädgård",
      field: "gardening",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.gardening} />,
    },
    {
      title: "Världsläget",
      field: "globalPolitics",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.globalPolitics} />,
    },
    {
      title: "LokalKultur",
      field: "localCulture",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.localCulture} />,
    },
    {
      title: "Ny teknik",
      field: "newTech",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.newTech} />,
    },
    {
      title: "Föreläsningar",
      field: "lectures",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.lectures} />,
    },
    {
      title: "Föreslagen föreläsning",
      field: "lecture",
      editable: "never",
      cellStyle: xlarge,
      headerStyle: xlarge,
    },
  ];

  //Update existing fika person
  async function updateFiker(newData, oldData) {
    const currDocId = newData.id;
    let fikerRef = db.collection("fika").doc(currDocId);

    fikerRef.update({
      gruppId: newData.gruppId ? newData.gruppId : "",
      förnamn: newData.förnamn ? newData.förnamn : "",
      efternamn: newData.efternamn ? newData.efternamn : "",
      telefon: newData.telefon ? newData.telefon : "",
      email: newData.email ? newData.email : "",
      beskrivning: newData.beskrivning ? newData.beskrivning : "",
      oldSchool: newData.oldSchool ? newData.oldSchool : false,
      newSchool: newData.newSchool ? newData.newSchool : false,
      interests: newData.interests ? newData.interests : "",
      språk: newData.språk ? newData.språk : "",
      books: newData.books ? newData.books : false,
      gardening: newData.gardening ? newData.gardening : false,
      globalPolitics: newData.globalPolitics ? newData.globalPolitics : false,
      localCulture: newData.localCulture ? newData.localCulture : false,
      newTech: newData.newTech ? newData.newTech : false,
      lectures: newData.lectures ? newData.lectures : false,
      lecture: newData.lecture ? newData.lecture : "",
      date: newData.date ? newData.date : "",
      status: newData.status ? newData.status : "1",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
    });
  }

  //Re-render if the data passed to the table changes - which it should do if we edit a row
  useEffect(() => {
    console.log("Fikadata has changed - rerendering");
    setData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  return (
    <MaterialTable
      title=""
      columns={fikersColumns}
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
            updateFiker(newData, oldData);
            refreshAction();
            resolve();
          }),
      }}
    />
  );
};

export default FikersTable;
