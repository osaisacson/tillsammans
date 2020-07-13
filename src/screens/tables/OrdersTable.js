import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/firestore";

import RenderBadge from "../../components/RenderBadge";
import ButtonToFormEmail from "../../components/ButtonToFormEmail";
import ButtonToAction from "../../components/ButtonToAction";

import { small, medium, large, xlarge } from "./CellSizes";

import { groupStatusDropdown } from "./Dropdowns";

const OrdersTable = (props) => {
  const { isAdmin, tableData, groupData, refreshAction, groupId } = props;

  const [data, setData] = useState(tableData);
  const db = firebase.firestore();

  //Column headers - show/hide conditionally depending on if we are in the main or groupleader view
  const orderColumns = [
    {
      title: "Mottaget",
      field: "datum",
      editable: "never",
    },
    {
      title: "Tid kan vänta",
      field: "tidsrymd",
      editable: "never",
      cellStyle: small,
      headerStyle: small,
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
      lookup: groupStatusDropdown, //TBD see if this changes whether we are on orders, volunteers, fikers, groups...
      cellStyle: large,
      headerStyle: large,
      render: (rowData) => (
        <>
          {/* Show the setting of groups only of we are on the main admin order screen  */}
          {isAdmin ? (
            <>
              <ButtonToAction
                isOrder
                isSetGroups
                groupData={groupData}
                formData={rowData}
                refreshAction={refreshAction}
              />
              <ButtonToFormEmail
                isSendGroup
                successKey={rowData.skickadGrupp}
                actionInForm={"sendAndUpdateGroup"}
                groupData={groupData}
                formData={rowData}
                refreshAction={refreshAction}
              />
            </>
          ) : null}
          {/* Below fields show for both main admin and group admin  */}
          {!rowData.email ? (
            <ButtonToAction
              isOrder
              isSetConfirmed
              formData={rowData}
              successKey={rowData.skickadBeställare}
              refreshAction={refreshAction}
            />
          ) : (
            <ButtonToFormEmail
              isSendToRecipient
              successKey={rowData.skickadBeställare}
              actionInForm={"sendAndUpdateToConfirmed"}
              groupData={groupData}
              formData={rowData}
              refreshAction={refreshAction}
            />
          )}
          <ButtonToFormEmail
            isSendToVolunteer
            successKey={rowData.skickadVolontär}
            actionInForm={"sendAndUpdateVolunteer"}
            groupData={groupData}
            formData={rowData}
            refreshAction={refreshAction}
          />
          <ButtonToAction
            isOrder
            isSetReady
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
    {
      title: "Swish",
      field: "swish",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.swish} />,
    },
    {
      title: "Kontant",
      field: "kontant",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.kontant} />,
    },
    {
      title: "Faktura",
      field: "faktura",
      editable: "never",
      render: (rowData) => <RenderBadge bool={rowData.faktura} />,
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
    {
      title: "Typ",
      field: "typ",
      editable: "never",
      cellStyle: medium,
      headerStyle: medium,
    },
  ];

  //Update existing order
  async function updateOrder(newData, oldData) {
    const currDocId = newData.id;
    let orderRef = db.collection("orders").doc(currDocId);

    orderRef.update({
      gruppId: newData.gruppId ? newData.gruppId : "",
      volontärId: newData.volontärId ? newData.volontärId : "",
      datum: newData.datum ? newData.datum : "",
      typ: newData.typ ? newData.typ : "Ingen",
      beskrivning: newData.beskrivning ? newData.beskrivning : "",
      swish: newData.swish ? newData.swish : false,
      kontant: newData.kontant ? newData.kontant : false,
      faktura: newData.faktura ? newData.faktura : false,
      tidsrymd: newData.tidsrymd ? newData.tidsrymd : "",
      telefon: newData.telefon ? newData.telefon : "",
      förnamn: newData.förnamn ? newData.förnamn : "",
      efternamn: newData.efternamn ? newData.efternamn : "",
      email: newData.email ? newData.email : "",
      address: newData.address ? newData.address : "",
      postkod: newData.postkod ? newData.postkod : "",
      status: newData.status ? newData.status : "",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
    });
  }

  //Re-render if the data passed to the table changes - which it should do if we edit a row
  useEffect(() => {
    console.log("Orderdata has changed - rerendering");
    setData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  return (
    <MaterialTable
      title=""
      columns={orderColumns}
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
            updateOrder(newData, oldData);
            refreshAction();
            resolve();
          }),
      }}
    />
  );
};

export default OrdersTable;
