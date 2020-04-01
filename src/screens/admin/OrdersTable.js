import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function OrdersTable(props) {
  const [key, setKey] = useState('datum');
  const Row = ({
    datum,
    typ,
    beskrivning,
    swish,
    kontant,
    faktura,
    tidsrymd,
    telefon,
    förnamn,
    efternamn,
    email,
    address,
    postkod,
    grupp,
    status
  }) => (
    <tr>
      <td>{datum}</td>
      <td>{typ}</td>
      <td className="beskrivning">{beskrivning}</td>
      <td>{swish ? 'x' : ''}</td>
      <td>{kontant ? 'x' : ''}</td>
      <td>{faktura ? 'x' : ''}</td>
      <td>{tidsrymd}</td>
      <td>{telefon}</td>
      <td>{förnamn}</td>
      <td>{efternamn}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{postkod}</td>
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

  const rows = props.ordersData
    .sort(compareBy(key))
    .map(rowData => <Row key={rowData.id} {...rowData} />);

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => setKey('datum')}>Mottaget</th>
            <th onClick={() => setKey('typ')}>Typ</th>
            <th onClick={() => setKey('beskrivning')}>Beskrivning</th>
            <th onClick={() => setKey('swish')}>Swish</th>
            <th onClick={() => setKey('kontant')}>Kontant</th>
            <th onClick={() => setKey('faktura')}>Faktura</th>
            <th onClick={() => setKey('tidsrymd')}>Tid kan vänta</th>
            <th onClick={() => setKey('telefon')}>Telefon</th>
            <th onClick={() => setKey('förnamn')}>Förnamn</th>
            <th onClick={() => setKey('efternamn')}>Efternamn</th>
            <th onClick={() => setKey('email')}>Email</th>
            <th onClick={() => setKey('address')}>Address</th>
            <th onClick={() => setKey('postkod')}>Postkod</th>
            <th onClick={() => setKey('grupp')}>Grupp</th>
            <th onClick={() => setKey('status')}>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
