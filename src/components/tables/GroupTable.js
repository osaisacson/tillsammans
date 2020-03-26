import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function GroupTable(props) {
  const [groupData, setGroupData] = useState(props.groupData);

  const Row = ({
    id,
    gruppnamn,
    kontakt,
    telefon,
    email,
    address,
    postkod,
    status
  }) => (
    <tr key={id}>
      <td>{gruppnamn}</td>
      <td>{kontakt}</td>
      <td>{telefon}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{postkod}</td>
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
            active={status === 'aktiv'}
            onClick={() =>
              console.log('TODO: this should set status as "aktiv"')
            }
            variant="secondary"
          >
            Aktiv
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
    let arrayCopy = [...groupData];
    arrayCopy.sort(compareBy(key));
    setGroupData(arrayCopy);
  };

  const rows = groupData.map(rowData => <Row key={rowData.id} {...rowData} />);

  return (
    console.log('GroupTable, received data: ', props.groupData),
    (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th onClick={() => sortBy('gruppnamn')}>Gruppnamn</th>
              <th onClick={() => sortBy('kontakt')}>Kontakt</th>
              <th onClick={() => sortBy('telefon')}>Telefonnummer</th>
              <th onClick={() => sortBy('email')}>Email</th>
              <th onClick={() => sortBy('address')}>Address</th>
              <th onClick={() => sortBy('postkod')}>Postkod</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  );
}
