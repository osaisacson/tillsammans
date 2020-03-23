import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function VolunteersTable(props) {
  const [volunteerData, setVolunteerData] = useState(props.volunteerData);

  const Row = ({
    datum,
    förnamn,
    efternamn,
    beskrivning,
    email,
    telefon,
    address,
    postkod,
    grupp,
    status
  }) => (
    <tr>
      <td>{datum}</td>
      <td>{förnamn}</td>
      <td>{efternamn}</td>
      <td>{beskrivning}</td>
      <td>{email}</td>
      <td>{telefon}</td>
      <td>{address}</td>
      <td>{postkod}</td>
      <td>{grupp}</td>
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

  const rows = volunteerData.map(rowData => <Row {...rowData} />);

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => sortBy('datum')}>Datum</th>
            <th onClick={() => sortBy('förnamn')}>Förnamn</th>
            <th onClick={() => sortBy('efternamn')}>Efternamn</th>
            <th onClick={() => sortBy('beskrivning')}>Beskrivning</th>
            <th onClick={() => sortBy('email')}>E-post</th>
            <th onClick={() => sortBy('telefon')}>Telefonnummer</th>
            <th onClick={() => sortBy('address')}>Address</th>
            <th onClick={() => sortBy('postkod')}>Postkod</th>
            <th onClick={() => sortBy('grupp')}>Grupp</th>
            <th>Sätt status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
