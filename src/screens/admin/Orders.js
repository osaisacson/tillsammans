import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import * as ordersActions from '../../store/actions/orders';

//Components
import OrdersTable from '../../components/tables/OrdersTable';

export default function Orders() {
  const orders = useSelector(state => state.orders.availableOrders);

  const newOrders = orders.filter(data => data.status === 'ohanterad');
  const activeOrders = orders.filter(data => data.status === 'hanterad');
  const doneOrders = orders.filter(data => data.status === 'klar');
  const inactiveOrders = orders.filter(data => data.status === 'inaktiv');

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   loadOrders().then(() => {
  //     console.log('Orders are loaded');
  //   });
  // }, [dispatch, loadOrders]);

  return (
    console.log(
      '-----Orders.js: getting orders from state (THIS IS POPULATED): ',
      orders
    ),
    console.log(
      '-----Orders.js: newOrders filtered from orders (THIS IS NOT WORKING SOMEHOW, PROBABLY BECAUSE OF THE FORMAT OF "orders"): ',
      newOrders
    ),
    (
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
            <OrdersTable ordersData={orders} />
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
    )
  );
}
