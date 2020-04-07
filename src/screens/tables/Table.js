import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';

// import firebase from 'firebase/app';
// import 'firebase/firestore';

const Table = props => {
  const [data, setData] = useState();

  //Column headers

  const orderColumns = [
    { title: 'Mottaget', field: 'datum', editable: 'never' },
    {
      title: 'Grupp',
      field: 'gruppId',
      lookup: {
        DDPDlLcTYYMQEJNlhzgD: 'Svenska Kyrkan Myggenäs',
        Pn5Uj8h84m5pjqSmL6sA: 'Svenska Kyrkan Skärhamn',
        uID02NUmUhp9mRqZbLF1: 'Svenska Kyrkan Kållekärr'
      },
      cellStyle: {
        width: 230,
        minWidth: 230
      },
      headerStyle: {
        width: 230,
        minWidth: 230
      }
    },
    {
      title: 'Beskrivning',
      field: 'beskrivning',
      cellStyle: {
        width: 350,
        minWidth: 350
      },
      headerStyle: {
        width: 350,
        minWidth: 350
      }
    },
    {
      title: 'Kommentarer av samordnare',
      field: 'kommentarer',
      cellStyle: {
        width: 300,
        minWidth: 300
      },
      headerStyle: {
        width: 300,
        minWidth: 300
      }
    },
    {
      title: 'Tid kan vänta',
      field: 'tidsrymd',
      cellStyle: {
        width: 150,
        minWidth: 150
      },
      headerStyle: {
        width: 150,
        minWidth: 150
      }
    },
    {
      title: 'Typ',
      field: 'typ',
      cellStyle: {
        width: 230,
        minWidth: 230
      },
      headerStyle: {
        width: 230,
        minWidth: 230
      }
    },
    { title: 'Swish', field: 'swish' },
    { title: 'Kontant', field: 'kontant' },
    { title: 'Faktura', field: 'faktura' },
    { title: 'Förnamn', field: 'förnamn' },
    { title: 'Efternamn', field: 'efternamn' },
    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    {
      title: 'Address',
      field: 'address',
      cellStyle: {
        width: 230,
        minWidth: 230
      },
      headerStyle: {
        width: 230,
        minWidth: 230
      }
    },
    { title: 'Postkod', field: 'postkod', type: 'numeric' }
  ];

  const volunteerColumns = [
    { title: 'Mottaget', field: 'datum', editable: 'never' },
    {
      title: 'Grupp',
      field: 'gruppId',
      lookup: {
        DDPDlLcTYYMQEJNlhzgD: 'Svenska Kyrkan Myggenäs',
        Pn5Uj8h84m5pjqSmL6sA: 'Svenska Kyrkan Skärhamn',
        uID02NUmUhp9mRqZbLF1: 'Svenska Kyrkan Kållekärr'
      },
      cellStyle: {
        width: 230,
        minWidth: 230
      },
      headerStyle: {
        width: 230,
        minWidth: 230
      }
    },
    { title: 'Förnamn', field: 'förnamn' },
    { title: 'Efternamn', field: 'efternamn' },
    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Postkod', field: 'postkod', type: 'numeric' },
    {
      title: 'Kommentarer från samordnare',
      field: 'kommentarer',
      cellStyle: {
        width: 300,
        minWidth: 300
      },
      headerStyle: {
        width: 300,
        minWidth: 300
      }
    },

    {
      title: 'Beskrivning',
      field: 'beskrivning',
      cellStyle: {
        width: 350,
        minWidth: 350
      },
      headerStyle: {
        width: 350,
        minWidth: 350
      }
    },
    { title: 'Språk', field: 'språk' },
    { title: 'Födelseår', field: 'födelseår', type: 'numeric' },
    { title: 'Har körkort', field: 'körkort' },
    { title: 'Har bil', field: 'bil' },
    { title: 'Mat', field: 'mat' },
    { title: 'Varor', field: 'varor' },
    { title: 'Ärenden', field: 'ärenden' },
    { title: 'Djur', field: 'djur' },
    { title: 'Prata', field: 'prata' },
    { title: 'Myndigheter', field: 'myndigheter' },
    { title: 'Teknik', field: 'teknik' }
  ];

  const groupColumns = [
    {
      title: 'Gruppnamn',
      field: 'gruppnamn',
      render: rowData => (
        <Link to={`/grupp/${rowData.id}`}>{rowData.gruppnamn}</Link>
      ),
      cellStyle: {
        width: 230,
        minWidth: 230
      },
      headerStyle: {
        width: 230,
        minWidth: 230
      }
    },
    {
      title: 'Beskrivning',
      field: 'kommentarer',
      cellStyle: {
        width: 350,
        minWidth: 350
      },
      headerStyle: {
        width: 350,
        minWidth: 350
      }
    },

    { title: 'Kontakt', field: 'kontakt' },
    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Postkod', field: 'postkod', type: 'numeric' },
    { title: 'Skapad', field: 'datum', editable: 'never' }
  ];

  const cancelledColumns = [
    { title: 'Mottagen', field: 'datum', editable: 'never' },
    {
      title: 'Kommentarer från samordnare',
      field: 'kommentarer',
      cellStyle: {
        width: 300,
        minWidth: 300
      },
      headerStyle: {
        width: 300,
        minWidth: 300
      }
    },

    { title: 'Telefon', field: 'telefon' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Postkod', field: 'postkod', type: 'numeric' }
  ];

  //Set column headers depending on which screen we are in.
  const columndata = props.isOrders
    ? orderColumns
    : props.isVolunteers
    ? volunteerColumns
    : props.isGroups
    ? groupColumns
    : cancelledColumns;

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
      // editable={{
      //     onRowDelete: oldData =>
      //         new Promise((resolve, reject) => {
      //             setTimeout(() => {
      //                 let newData = data;
      //                 _.remove(newData, { _id: oldData._id });
      //                 debugger;
      //                 setData(newData);
      //                 resolve();
      //             }, 1000);
      //         })
      // }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            // const db = firebase.firestore();
            // db.collection('volunteers').add({
            //   förnamn: newData.förnamn,
            //   efternamn: newData.efternamn,
            //   telefon: newData.telefon,
            //   email: newData.email,
            //   address: newData.address,
            //   postkod: newData.postkod,
            //   beskrivning: newData.beskrivning,
            //   språk: newData.språk,
            //   födelseår: newData.födelseår,
            //   // körkort: hasLicence,
            //   // bil: hasCar,
            //   // mat: shopFood,
            //   // varor: shopSupplies,
            //   // ärenden: runErrands,
            //   // djur: doAnimals,
            //   // prata: doTalking,
            //   // myndigheter: doAuthorities,
            //   // teknik: doTech,
            //   gruppId: props.gruppId,
            //   datum: new Date().getTime(),
            //   status: 'ny'
            // });

            setTimeout(() => {
              console.log('newData: ', newData);
              resolve();
              setData(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setData(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setData(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
};

export default Table;

// import React, { useState, useEffect } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Button from 'react-bootstrap/Button';

// import moment from 'moment-with-locales-es6';

// //Models
// import Group from '../../models/group';

// //Bootstrap
// import Dropdown from 'react-bootstrap/Dropdown';

// //Firebase
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// export default function GroupsTable(props) {
//   const firestore = firebase.firestore();

//   //Set constants
//   const [key, setKey] = useState('datum');
//   const [loadedGroups, setLoadedGroups] = useState([]);

//   async function getGroups() {
//     const groups = [];
//     const querySnapshot = await firestore.collection('groups').get();
//     querySnapshot.forEach(function(doc) {
//       // doc.data() is never undefined for query doc snapshots
//       const resData = doc.data();
//       const readableDate = moment(resData.datum).format('lll')

//       groups.push(
//         new Group(
//           doc.id,
//           readableDate,
//           resData.gruppnamn,
//           resData.kontakt,
//           resData.kommentarer,
//           resData.telefon,
//           resData.email,
//           resData.address,
//           resData.postkod,
//           resData.status
//         )
//       );
//     });

//     setLoadedGroups(groups);
//   }

//   useEffect(() => {
//     getGroups();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const DropdownGroups = props => {
//     const [selectedVolunteer, setSelectedVolunteer] = useState(props.group);

//     const changeGroup = event => {
//       setSelectedVolunteer(event.target.text);
//     };
//     return (
//       <Dropdown>
//         <Dropdown.Toggle
//           className="group-dropdown"
//           variant="success"
//           id="dropdown-basic"
//         >
//           {selectedVolunteer ? selectedVolunteer : 'Ingen volontär vald'}
//         </Dropdown.Toggle>
//         <Dropdown.Menu>
//           {loadedGroups.map(item => (
//             <Dropdown.Item key={item.id} value={item.id} onClick={changeGroup}>
//               {item.gruppnamn}
//             </Dropdown.Item>
//           ))}
//         </Dropdown.Menu>
//       </Dropdown>
//     );
//   };

//   //Tableheaders
//   const OrdersTableHeaders = () => (
//     <>
//       <th onClick={() => setKey('datum')}>Mottaget</th>
//       <th onClick={() => setKey('åtgärder')}>Åtgärder</th>
//       <th onClick={() => setKey('kommentarer')}>Kommentarer från samordnare</th>
//       <th onClick={() => setKey('typ')}>Typ</th>
//       <th onClick={() => setKey('beskrivning')}>Beskrivning</th>
//       <th onClick={() => setKey('swish')}>Swish</th>
//       <th onClick={() => setKey('kontant')}>Kontant</th>
//       <th onClick={() => setKey('faktura')}>Faktura</th>
//       <th onClick={() => setKey('tidsrymd')}>Tid kan vänta</th>
//       <th onClick={() => setKey('telefon')}>Telefon</th>
//       <th onClick={() => setKey('förnamn')}>Förnamn</th>
//       <th onClick={() => setKey('efternamn')}>Efternamn</th>
//       <th onClick={() => setKey('email')}>Email</th>
//       <th onClick={() => setKey('address')}>Address</th>
//       <th onClick={() => setKey('postkod')}>Postkod</th>
//     </>
//   );

//   const VolunteersTableHeaders = () => (
//     <>
//       <th onClick={() => setKey('datum')}>Datum</th>
//       <th onClick={() => setKey('åtgärder')}>Åtgärder</th>
//       <th onClick={() => setKey('kommentarer')}>Kommentarer från samordnare</th>
//       <th onClick={() => setKey('förnamn')}>Förnamn</th>
//       <th onClick={() => setKey('efternamn')}>Efternamn</th>
//       <th onClick={() => setKey('telefon')}>Telefon</th>
//       <th onClick={() => setKey('email')}>Email</th>
//       <th onClick={() => setKey('address')}>Address</th>
//       <th onClick={() => setKey('postkod')}>Postkod</th>
//       <th onClick={() => setKey('beskrivning')}>Beskrivning</th>
//       <th onClick={() => setKey('språk')}>Språk</th>
//       <th onClick={() => setKey('födelseår')}>Födelseår</th>
//       <th onClick={() => setKey('körkort')}>Har körkort</th>
//       <th onClick={() => setKey('bil')}>Har bil</th>
//       <th onClick={() => setKey('mat')}>Mat</th>
//       <th onClick={() => setKey('varor')}>Varor</th>
//       <th onClick={() => setKey('ärenden')}>Ärenden</th>
//       <th onClick={() => setKey('djur')}>Djur</th>
//       <th onClick={() => setKey('prata')}>Prata</th>
//       <th onClick={() => setKey('myndigheter')}>Myndigheter</th>
//       <th onClick={() => setKey('myndigheter')}>Teknik</th>
//     </>
//   );

//   const OrdersRows = ({
//     id,
//     datum,
//     kommentarer,
//     status,
//     grupp,
//     typ,
//     beskrivning,
//     swish,
//     kontant,
//     faktura,
//     tidsrymd,
//     telefon,
//     förnamn,
//     efternamn,
//     email,
//     address,
//     postkod
//   }) => (
//     <tr key={id}>
//       <td>{datum}</td>
//       <td>
//         <ButtonGroup aria-label="set status" size="sm">
//           <DropdownGroups group={grupp} />
//           <Button
//             active={status === 'klar'}
//             onClick={() =>
//               console.log('TODO: this should set status as "klar"')
//             }
//             variant="secondary"
//           >
//             Levererad
//           </Button>
//           <Button
//             active={status === 'pausad'}
//             onClick={() =>
//               console.log('TODO: this should set status as "pausad"')
//             }
//             variant="secondary"
//           >
//             Pausad
//           </Button>
//           <Button
//             className="delete-btn"
//             onClick={() =>
//               console.log(
//                 'TODO: this should delete the post, and showing a popup confirming it before'
//               )
//             }
//             variant="danger"
//           >
//             X
//           </Button>
//         </ButtonGroup>
//       </td>
//       <td contenteditable>{kommentarer}</td>
//       <td contenteditable>{typ}</td>
//       <td contenteditable className="beskrivning">
//         {beskrivning}
//       </td>
//       <td contenteditable className="check">
//         {swish ? 'x' : ''}
//       </td>
//       <td contenteditable className="check">
//         {kontant ? 'x' : ''}
//       </td>
//       <td contenteditable className="check">
//         {faktura ? 'x' : ''}
//       </td>
//       <td contenteditable>{tidsrymd}</td>
//       <td contenteditable>{telefon}</td>
//       <td contenteditable>{förnamn}</td>
//       <td contenteditable>{efternamn}</td>
//       <td contenteditable>{email}</td>
//       <td contenteditable>{address}</td>
//       <td contenteditable>{postkod}</td>
//     </tr>
//   );

//   //TableRows
//   const VolunteersRows = ({
//     id,
//     datum,
//     kommentarer,
//     status,
//     förnamn,
//     efternamn,
//     telefon,
//     email,
//     address,
//     postkod,
//     beskrivning,
//     språk,
//     födelseår,
//     körkort,
//     bil,
//     mat,
//     varor,
//     ärenden,
//     djur,
//     prata,
//     myndigheter,
//     teknik,
//     grupp
//   }) => (
//     <tr key={id}>
//       <td>{datum}</td>
//       <td>
//         <ButtonGroup aria-label="set status" size="sm">
//           <DropdownGroups group={grupp} />
//           <Button
//             active={status === 'aktiv'}
//             onClick={() =>
//               console.log('TODO: this should set status as "aktiv"')
//             }
//             variant="secondary"
//           >
//             aktiv
//           </Button>
//           <Button
//             active={status === 'pausad'}
//             onClick={() =>
//               console.log('TODO: this should set status as "pausad"')
//             }
//             variant="secondary"
//           >
//             pausad
//           </Button>
//           <Button
//             className="delete-btn"
//             onClick={() =>
//               console.log(
//                 'TODO: this should delete the post, and showing a popup confirming it before'
//               )
//             }
//             variant="danger"
//           >
//             X
//           </Button>
//         </ButtonGroup>
//       </td>
//       <td>{kommentarer}</td>
//       <td>{förnamn}</td>
//       <td>{efternamn}</td>
//       <td>{telefon}</td>
//       <td>{email}</td>
//       <td>{address}</td>
//       <td>{postkod}</td>
//       <td className="beskrivning">{beskrivning}</td>
//       <td>{språk}</td>
//       <td>{födelseår}</td>
//       <td className="check">{körkort ? 'x' : ''}</td>
//       <td className="check">{bil ? 'x' : ''}</td>
//       <td className="check">{mat ? 'x' : ''}</td>
//       <td className="check">{varor ? 'x' : ''}</td>
//       <td className="check">{ärenden ? 'x' : ''}</td>
//       <td className="check">{djur ? 'x' : ''}</td>
//       <td className="check">{prata ? 'x' : ''}</td>
//       <td className="check">{myndigheter ? 'x' : ''}</td>
//       <td className="check">{teknik ? 'x' : ''}</td>
//     </tr>
//   );

//   //Set TableHeaders, default Orders
//   let TableHeaders = OrdersTableHeaders;
//   if (props.isVolunteers) {
//     TableHeaders = VolunteersTableHeaders;
//   }

//   //Set TableRows, default Orders
//   let TableRows = OrdersRows;
//   if (props.isVolunteers) {
//     TableRows = VolunteersRows;
//   }

//   const compareBy = key => {
//     return function(a, b) {
//       if (a[key] < b[key]) return -1;
//       if (a[key] > b[key]) return 1;
//       return 0;
//     };
//   };

//   const rows = props.tableData
//     .sort(compareBy(key))
//     .map(rowData => <TableRows key={rowData.id} {...rowData} />);

//   if (!props.tableData.length) {
//     return <div className="empty-state">Inget här än</div>;
//   }
//   return (
//     <div className="table-responsive">
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <TableHeaders />
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     </div>
//   );
// }
