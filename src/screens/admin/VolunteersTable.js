import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function OrdersTable(props) {
  const [key, setKey] = useState('datum');
  const Row = ({
    datum,
    förnamn,
    efternamn,
    telefon,
    email,
    address,
    postkod,
    beskrivning,
    körkort,
    bil,
    mat,
    varor,
    ärenden,
    djur,
    prata,
    myndigheter,
    teknik,
    grupp,
    status
  }) => (
    <tr>
      <td>{datum}</td>
      <td>{förnamn}</td>
      <td>{efternamn}</td>
      <td>{telefon}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{postkod}</td>
      <td className="beskrivning">{beskrivning}</td>
      <td>{körkort ? 'x' : ''}</td>
      <td>{bil ? 'x' : ''}</td>
      <td>{mat ? 'x' : ''}</td>
      <td>{varor ? 'x' : ''}</td>
      <td>{ärenden ? 'x' : ''}</td>
      <td>{djur ? 'x' : ''}</td>
      <td>{prata ? 'x' : ''}</td>
      <td>{myndigheter ? 'x' : ''}</td>
      <td>{teknik ? 'x' : ''}</td>
      <td>{grupp}</td>
      <td>{status}</td>

      <td>
        <ButtonGroup aria-label="set status" size="sm">
          <Button
            active={status === 'ny'}
            onClick={() => console.log('TODO: this should set status as "ny"')}
            variant="secondary"
          >
            Ny
          </Button>
          <Button
            active={status === 'kontaktad'}
            onClick={() =>
              console.log('TODO: this should set status as "kontaktad"')
            }
            variant="secondary"
          >
            Kontaktad
          </Button>
          <Button
            active={status === 'aktiv'}
            onClick={() =>
              console.log('TODO: this should set status as "aktiv"')
            }
            variant="secondary"
          >
            Aktiv
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

  const rows = props.volunteersData
    .sort(compareBy(key))
    .map(rowData => <Row key={rowData.id} {...rowData} />);

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => setKey('datum')}>Datum</th>
            <th onClick={() => setKey('förnamn')}>Förnamn</th>
            <th onClick={() => setKey('efternamn')}>Efternamn</th>
            <th onClick={() => setKey('telefon')}>Telefon</th>
            <th onClick={() => setKey('email')}>E-post</th>
            <th onClick={() => setKey('address')}>Address</th>
            <th onClick={() => setKey('postkod')}>Postkod</th>
            <th onClick={() => setKey('beskrivning')}>Beskrivning</th>
            <th onClick={() => setKey('körkort')}>Har körkort</th>
            <th onClick={() => setKey('bil')}>Har bil</th>
            <th onClick={() => setKey('mat')}>Mat</th>
            <th onClick={() => setKey('varor')}>Varor</th>
            <th onClick={() => setKey('ärenden')}>Ärenden</th>
            <th onClick={() => setKey('djur')}>Djur</th>
            <th onClick={() => setKey('prata')}>Prata</th>
            <th onClick={() => setKey('myndigheter')}>Myndigheter</th>
            <th onClick={() => setKey('myndigheter')}>Teknik</th>
            <th onClick={() => setKey('grupp')}>Grupp</th>
            <th onClick={() => setKey('status')}>Sätt status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
