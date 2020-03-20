import React, { useState } from 'react';

const Row = ({
  datum,
  typ,
  beskrivning,
  tidsrymd,
  telefon,
  email,
  address,
  postkod
}) => (
  <tr>
    <td>{datum}</td>
    <td>{typ}</td>
    <td>{beskrivning}</td>
    <td>{tidsrymd}</td>
    <td>{telefon}</td>
    <td>{email}</td>
    <td>{address}</td>
    <td>{postkod}</td>
  </tr>
);

export default function OrdersTable(props) {
  const [ordersData, setOrdersData] = useState(props.ordersData);

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

  const rows = ordersData.map(rowData => <Row {...rowData} />);

  return (
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
            <th onClick={() => sortBy('postkod')}>Postkod</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
