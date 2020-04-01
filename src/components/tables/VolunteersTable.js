import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function VolunteersTable(props) {
  const [volunteerData, setVolunteerData] = useState(props.volunteerData);

  const Row = ({
    datum,
    förnamn,
    efternamn,
    telefon,
    email,
    address,
    beskrivning,
    körkort,
    bil,
    mat,
    varor,
    ärenden,
    djur,
    prata,
    myndigheter,
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
      <td className="beskrivning">{beskrivning}</td>
      <td>{körkort ? 'x' : ''}</td>
      <td>{bil ? 'x' : ''}</td>
      <td>{mat ? 'x' : ''}</td>
      <td>{varor ? 'x' : ''}</td>
      <td>{ärenden ? 'x' : ''}</td>
      <td>{djur ? 'x' : ''}</td>
      <td>{prata ? 'x' : ''}</td>
      <td>{myndigheter ? 'x' : ''}</td>
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

  const sortBy = key => {
    let arrayCopy = [...volunteerData];
    arrayCopy.sort(compareBy(key));
    setVolunteerData(arrayCopy);
  };

  const rows = volunteerData.map(rowData => (
    <Row key={rowData.id} {...rowData} />
  ));

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => sortBy('datum')}>Datum</th>
            <th onClick={() => sortBy('förnamn')}>Förnamn</th>
            <th onClick={() => sortBy('efternamn')}>Efternamn</th>
            <th onClick={() => sortBy('telefon')}>Telefon</th>
            <th onClick={() => sortBy('email')}>E-post</th>
            <th onClick={() => sortBy('beskrivning')}>Beskrivning</th>
            <th onClick={() => sortBy('körkort')}>Har körkort</th>
            <th onClick={() => sortBy('bil')}>Har bil</th>
            <th onClick={() => sortBy('mat')}>Mat</th>
            <th onClick={() => sortBy('varor')}>Varor</th>
            <th onClick={() => sortBy('ärenden')}>Ärenden</th>
            <th onClick={() => sortBy('djur')}>Djur</th>
            <th onClick={() => sortBy('prata')}>Prata</th>
            <th onClick={() => sortBy('myndigheter')}>Myndigheter</th>
            <th onClick={() => sortBy('grupp')}>Grupp</th>
            <th onClick={() => sortBy('status')}>Sätt status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
