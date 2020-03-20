import React, { useState } from 'react';
/* 
  Row component written as a simple function:
  https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components
  
  Any components that do not have state should be written this way,
  see: https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
*/
const Row = ({ title, contact, phone, email }) => (
  <tr>
    <td>{title}</td>
    <td>{contact}</td>
    <td>{phone}</td>
    <td>{email}</td>
  </tr>
);

/*
  Table component written as an ES6 class
*/

export default function GroupTable() {
  const [groupData, setGroupData] = useState([
    {
      title: 'Egnahemsfabriken',
      contact: 'Anna Berglund',
      phone: '0703248591',
      email: 'anna.berglund@egnahemsfabriken.se'
    },
    {
      title: 'Svenska Kyrkan Tjörn',
      contact: 'Björn Borg',
      phone: '0739029381',
      email: 'bjorn.borg@svenskakyrkan.se'
    },
    {
      title: 'Almö gård',
      contact: 'Annika Lantz',
      phone: '0702455627',
      email: 'annika.lantz@almogard.se'
    }
  ]);

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
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
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
