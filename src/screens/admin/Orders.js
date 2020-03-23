import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import OrdersDummyData from './../../DummyData/OrdersDummyData';

//Components
import OrdersTable from '../../components/tables/OrdersTable';

export default function Orders() {
  const newOrders = OrdersDummyData.filter(data => data.status === 'ny');

  const activeOrders = OrdersDummyData.filter(data => data.status === 'aktiv');

  const doneOrders = OrdersDummyData.filter(data => data.status === 'klar');

  const inactiveOrders = OrdersDummyData.filter(
    data => data.status === 'inaktiv'
  );

  return (
    <div className="page-layout">
      <h2>Beställningar</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={`Nya beställningar (${
            newOrders.length ? newOrders.length : 0
          })`}
        >
          <OrdersTable ordersData={newOrders} />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva (${activeOrders.length ? activeOrders.length : 0})`}
        >
          <OrdersTable ordersData={activeOrders} />
        </Tab>
        <Tab
          eventKey="klara"
          title={`Klara (${doneOrders.length ? doneOrders.length : 0})`}
        >
          <OrdersTable ordersData={doneOrders} />
        </Tab>
        <Tab
          eventKey="inaktiv"
          title={`Inaktiva (${
            inactiveOrders.length ? inactiveOrders.length : 0
          })`}
        >
          <OrdersTable ordersData={inactiveOrders} />
        </Tab>
      </Tabs>
    </div>
  );
}
