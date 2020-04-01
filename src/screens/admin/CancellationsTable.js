import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const CancellationsTable = props => {
  const [cancellationData, setcancellationData] = useState(
    props.cancellationData
  );

  const Row = ({ datum, telefon, address, postkod, email, status }) => (
    <tr>
      <td>{datum}</td>
      <td>{telefon}</td>
      <td>{address}</td>
      <td>{postkod}</td>
      <td>{email}</td>
      <td>{status}</td>
      <td>
        <ButtonGroup aria-label="set status" size="sm">
          <Button
            active={status === 'avboka'}
            onClick={() => console.log('TODO: this should set status as "ny"')}
            variant="secondary"
          >
            Att avboka
          </Button>
          <Button
            active={status === 'avbokad'}
            onClick={() =>
              console.log('TODO: this should set status as "kontaktad"')
            }
            variant="secondary"
          >
            Avbokad
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
    let arrayCopy = [...cancellationData];
    arrayCopy.sort(compareBy(key));
    setcancellationData(arrayCopy);
  };

  const rows = cancellationData.map(rowData => (
    <Row key={rowData.id} {...rowData} />
  ));

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => sortBy('datum')}>Datum</th>
            <th onClick={() => sortBy('telefon')}>Telefon</th>
            <th onClick={() => sortBy('address')}>Address</th>
            <th onClick={() => sortBy('postkod')}>Postkod</th>
            <th onClick={() => sortBy('email')}>E-post</th>
            <th onClick={() => sortBy('status')}>Sätt status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default CancellationsTable;
