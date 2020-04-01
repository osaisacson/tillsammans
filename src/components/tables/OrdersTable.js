import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function OrdersTable(props) {
  const [ordersData, setOrdersData] = useState(props.ordersData);

  const Row = ({
    datum,
    typ,
    beskrivning,
    tidsrymd,
    telefon,
    email,
    address,
    grupp,
    status
  }) => (
    <tr>
      <td>{datum}</td>
      <td>{typ}</td>
      <td className="beskrivning">{beskrivning}</td>
      <td>{tidsrymd}</td>
      <td>{telefon}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{grupp}</td>

      <td>
        <ButtonGroup aria-label="set status" size="sm">
          <Button
            active={status === 'ohanterad'}
            onClick={() => console.log('TODO: this should set status as "ny"')}
            variant="secondary"
          >
            Ohanterad
          </Button>
          <Button
            active={status === 'hanterad'}
            onClick={() =>
              console.log('TODO: this should set status as "hanterad"')
            }
            variant="secondary"
          >
            Hanterad
          </Button>
          <Button
            active={status === 'klar'}
            onClick={() =>
              console.log('TODO: this should set status as "klar"')
            }
            variant="secondary"
          >
            Levererad
          </Button>
          <Button
            active={status === 'inaktiv'}
            onClick={() =>
              console.log('TODO: this should set status as "inaktiv"')
            }
            variant="secondary"
          >
            Inaktiv
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );

  const compareBy = key => {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };

  const sortBy = key => {
    let arrayCopy = [...ordersData];
    arrayCopy.sort(compareBy(key));
    setOrdersData(arrayCopy);
  };

  const rows = ordersData.map(rowData => <Row key={rowData.id} {...rowData} />);

  return (
    console.log(
      'THE PROBLEM: components/tables/OrdersTable.js:87 trying to show the orders data in the orders table. THIS NEVER WORKS. OH WHY DOES THIS NOT WORK: ',
      ordersData
    ),
    (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th onClick={() => sortBy('datum')}>Mottaget</th>
              <th onClick={() => sortBy('typ')}>Typ</th>
              <th onClick={() => sortBy('beskrivning')}>Beskrivning</th>
              <th onClick={() => sortBy('tidsrymd')}>Tid kan vänta</th>
              <th onClick={() => sortBy('telefon')}>Telefon</th>
              <th onClick={() => sortBy('email')}>Email</th>
              <th onClick={() => sortBy('address')}>Address</th>
              <th onClick={() => sortBy('grupp')}>Grupp</th>
              <th onClick={() => sortBy('status')}>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  );
}
