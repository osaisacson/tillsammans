import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";

import ReactHtmlParser from "react-html-parser";

import firebase from "firebase/app";
import "firebase/firestore";

import RenderBadge from "../../components/RenderBadge";
import ButtonToFormEmail from "../../components/ButtonToFormEmail";
import ButtonToAction from "../../components/ButtonToAction";

import { medium, large, xlarge } from "./CellSizes";

import { volunteerStatusDropdown } from "./Dropdowns";

const VolunteersTable = (props) => {
  const { isAdmin, tableData, groupData, refreshAction } = props;

  const [data, setData] = useState(tableData);
  const db = firebase.firestore();

  //Column headers - show/hide conditionally depending on if we are in the main or groupleader view
  const volunteersColumns = [
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
      lookup: volunteerStatusDropdown, //TBD see if this changes whether we are on orders, volunteers, fikers, groups...
      cellStyle: large,
      headerStyle: large,
      render: (rowData) => (
        <>
          {/* Show the setting of groups only of we are on the main admin order screen  */}
          {isAdmin ? (
            <>
              <ButtonToAction
                isVolunteer
                isSetGroups
                groupData={groupData}
                formData={rowData}
                refreshAction={refreshAction}
              />
              <ButtonToFormEmail
                isSendGroup
                successKey={rowData.skickadVolontärTillGrupp}
                actionInForm={"sendVolunteerInfoToGroup"}
                groupData={groupData}
                formData={rowData}
                refreshAction={refreshAction}
              />
            </>
          ) : null}
          {/* Below fields show for both main admin and group admin  */}
          {!rowData.email ? (
            <ButtonToAction
              isVolunteer
              isSetConfirmed
              formData={rowData}
              successKey={rowData.skickadBekräftelseTillVolontär}
              refreshAction={refreshAction}
            />
          ) : (
            <ButtonToFormEmail
              isSendToRecipient
              successKey={rowData.skickadBekräftelseTillVolontär}
              actionInForm={"sendVolunteerWelcome"}
              groupData={groupData}
              formData={rowData}
              refreshAction={refreshAction}
            />
          )}
          <ButtonToAction
            isVolunteer
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
      render: (rowData) => (
        <>
          <div>{ReactHtmlParser(rowData.kommentarer)}</div>
          <ButtonToAction
            isVolunteer
            isEditComments
            formData={rowData}
            refreshAction={refreshAction}
          />
        </>
      ),
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
      title: "Address",
      field: "address",
      cellStyle: medium,
      headerStyle: medium,
    },
    { title: "Postkod", field: "postkod" },
    { title: "Språk", field: "språk", editable: "never" },
    {
      title: "Födelseår",
      field: "födelseår",
      editable: "never",
    },
    {
      title: "Har körkort",
      field: "körkort",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.körkort} />,
    },
    {
      title: "Har bil",
      field: "bil",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.bil} />,
    },
    {
      title: "Mat",
      field: "mat",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.mat} />,
    },
    {
      title: "Varor",
      field: "varor",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.varor} />,
    },
    {
      title: "Ärenden",
      field: "ärenden",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.ärenden} />,
    },
    {
      title: "Djur",
      field: "djur",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.djur} />,
    },
    {
      title: "Prata",
      field: "prata",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.prata} />,
    },
    {
      title: "Myndigheter",
      field: "myndigheter",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.myndigheter} />,
    },
    {
      title: "Teknik",
      field: "teknik",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.teknik} />,
    },
  ];

  //Update existing volunteer
  async function updateVolunteer(newData, oldData) {
    const currDocId = newData.id;
    let volunteerRef = db.collection("volunteers").doc(currDocId);

    volunteerRef.update({
      gruppId: newData.gruppId ? newData.gruppId : "",
      förnamn: newData.förnamn ? newData.förnamn : "",
      efternamn: newData.efternamn ? newData.efternamn : "",
      telefon: newData.telefon ? newData.telefon : "",
      email: newData.email ? newData.email : "",
      address: newData.address ? newData.address : "",
      postkod: newData.postkod ? newData.postkod : "",
      beskrivning: newData.beskrivning ? newData.beskrivning : "",
      språk: newData.språk ? newData.språk : "",
      födelseår: newData.födelseår ? newData.födelseår : "",
      körkort: newData.körkort ? newData.körkort : false,
      bil: newData.bil ? newData.bil : false,
      mat: newData.mat ? newData.mat : false,
      varor: newData.varor ? newData.varor : false,
      ärenden: newData.ärenden ? newData.ärenden : false,
      djur: newData.djur ? newData.djur : false,
      prata: newData.prata ? newData.prata : false,
      myndigheter: newData.myndigheter ? newData.myndigheter : false,
      teknik: newData.teknik ? newData.teknik : false,
      datum: newData.datum ? newData.datum : "",
      status: newData.status ? newData.status : "1",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
    });
  }

  //Re-render if the data passed to the table changes - which it should do if we edit a row
  useEffect(() => {
    console.log("Volunteerdata has changed - rerendering");
    setData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  return (
    <MaterialTable
      title=""
      columns={volunteersColumns}
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
            updateVolunteer(newData, oldData);
            refreshAction();
            resolve();
          }),
      }}
    />
  );
};

export default VolunteersTable;
