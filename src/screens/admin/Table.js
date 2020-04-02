import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function VolunteersTable(props) {
  const [key, setKey] = useState('datum');

  //Tableheaders
  const OrdersTableHeaders = () => (
    <>
      <th onClick={() => setKey('datum')}>Mottaget</th>
      <th onClick={() => setKey('status')}>Status</th>
      <th onClick={() => setKey('grupp')}>Grupp</th>
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
    </>
  );

  const VolunteersTableHeaders = () => (
    <>
      <th onClick={() => setKey('datum')}>Datum</th>
      <th onClick={() => setKey('status')}>Ändra status</th>
      <th onClick={() => setKey('grupp')}>Grupp</th>
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
    </>
  );

  const GroupsTableHeaders = () => (
    <>
      <th onClick={() => setKey('datum')}>Datum</th>
      <th onClick={() => setKey('status')}>Status</th>
      <th onClick={() => setKey('gruppnamn')}>Gruppnamn</th>
      <th onClick={() => setKey('kontakt')}>Kontakt</th>
      <th onClick={() => setKey('telefon')}>Telefonnummer</th>
      <th onClick={() => setKey('email')}>Email</th>
      <th onClick={() => setKey('address')}>Address</th>
      <th onClick={() => setKey('postkod')}>Postkod</th>
    </>
  );

  const CancelledTableHeaders = () => (
    <>
      <th onClick={() => setKey('datum')}>Datum</th>
      <th onClick={() => setKey('status')}>Sätt status</th>
      <th onClick={() => setKey('telefon')}>Telefon</th>
      <th onClick={() => setKey('address')}>Address</th>
      <th onClick={() => setKey('postkod')}>Postkod</th>
      <th onClick={() => setKey('email')}>E-post</th>
    </>
  );

  const OrdersRows = ({
    id,
    datum,
    status,
    grupp,
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
    postkod
  }) => (
    <tr key={id}>
      <td>{datum}</td>
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
      <td>{grupp}</td>
      <td>{typ}</td>
      <td className="beskrivning">{beskrivning}</td>
      <td className="check">{swish ? 'x' : ''}</td>
      <td className="check">{kontant ? 'x' : ''}</td>
      <td className="check">{faktura ? 'x' : ''}</td>
      <td>{tidsrymd}</td>
      <td>{telefon}</td>
      <td>{förnamn}</td>
      <td>{efternamn}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{postkod}</td>
    </tr>
  );

  //TableRows
  const VolunteersRows = ({
    id,
    datum,
    status,
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
    grupp
  }) => (
    <tr key={id}>
      <td>{datum}</td>
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
      <td>{grupp}</td>
      <td>{förnamn}</td>
      <td>{efternamn}</td>
      <td>{telefon}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{postkod}</td>
      <td className="beskrivning">{beskrivning}</td>
      <td className="check">{körkort ? 'x' : ''}</td>
      <td className="check">{bil ? 'x' : ''}</td>
      <td className="check">{mat ? 'x' : ''}</td>
      <td className="check">{varor ? 'x' : ''}</td>
      <td className="check">{ärenden ? 'x' : ''}</td>
      <td className="check">{djur ? 'x' : ''}</td>
      <td className="check">{prata ? 'x' : ''}</td>
      <td className="check">{myndigheter ? 'x' : ''}</td>
      <td className="check">{teknik ? 'x' : ''}</td>
    </tr>
  );

  const GroupsRows = ({
    id,
    datum,
    status,
    gruppnamn,
    kontakt,
    telefon,
    email,
    address,
    postkod
  }) => (
    <tr key={id}>
      <td>{datum}</td>
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
      <td>{gruppnamn}</td>
      <td>{kontakt}</td>
      <td>{telefon}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{postkod}</td>
    </tr>
  );

  const CancelledRows = ({
    id,
    datum,
    status,
    telefon,
    address,
    postkod,
    email
  }) => (
    <tr key={id}>
      <td>{datum}</td>
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
      <td>{telefon}</td>
      <td>{address}</td>
      <td>{postkod}</td>
      <td>{email}</td>
    </tr>
  );

  //Set TableHeaders, default Orders
  let TableHeaders = OrdersTableHeaders;
  if (props.isVolunteers) {
    TableHeaders = VolunteersTableHeaders;
  }
  if (props.isGroups) {
    TableHeaders = GroupsTableHeaders;
  }
  if (props.isCancelled) {
    TableHeaders = CancelledTableHeaders;
  }
  //Set TableRows, default Orders
  let TableRows = OrdersRows;
  if (props.isVolunteers) {
    TableRows = VolunteersRows;
  }
  if (props.isGroups) {
    TableRows = GroupsRows;
  }
  if (props.isCancelled) {
    TableRows = CancelledRows;
  }

  const compareBy = key => {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };

  const rows = props.tableData
    .sort(compareBy(key))
    .map(rowData => <TableRows key={rowData.id} {...rowData} />);

  if (!props.tableData.length) {
    return <div className="empty-state">Ingen data än</div>;
  }
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <TableHeaders />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
