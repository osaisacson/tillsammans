import React, { useState } from 'react';

const Row = ({ title, contact, phone, email }) => (
  <tr>
    <td>{title}</td>
    <td>{contact}</td>
    <td>{phone}</td>
    <td>{email}</td>
  </tr>
);

export default function GroupTable(props) {
  const [groupData, setGroupData] = useState(props.groupData);

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

  const rows = groupData.map(rowData => <Row {...rowData} />);

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => sortBy('title')}>Gruppnamn</th>
            <th onClick={() => sortBy('contact')}>Kontakt</th>
            <th onClick={() => sortBy('phone')}>Telefonnummer</th>
            <th onClick={() => sortBy('email')}>Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
