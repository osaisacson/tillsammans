import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import ordersDummyData from './../../DummyData/OrdersDummyData';

import * as ordersActions from '../../store/actions/orders';

//Components
import OrdersTable from '../../components/tables/OrdersTable';

export default function Orders() {
  // const orders = ordersDummyData;

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
    loadOrders().then(() => {
      console.log(
        'screens/admin/Orders.js - useEffect() which attempts to load orders. This might be where the issue lives.'
      );
    });
  }, [dispatch, loadOrders]);

  return (
    console.log(
      'screens/admin/Orders.js:46 getting data from state -- THIS RENDERS TWO TIMES AND WORKS THE SECOND TIME IT RENDERS: ',
      orders
    ),
    (
      <div className="page-layout">
        <h2>Beställningar</h2>
        <p>Sortera genom att trycka på titlarna</p>
        <Tabs defaultActiveKey="nya" id="0">
          <Tab eventKey="nya" title={'Nya beställningar '}>
            <OrdersTable ordersData={newOrders} />
          </Tab>
          <Tab eventKey="aktiva" title={'Hanterade'}>
            <OrdersTable ordersData={activeOrders} />
          </Tab>
          <Tab eventKey="klara" title={'Levererade'}>
            <OrdersTable ordersData={doneOrders} />
          </Tab>
          <Tab eventKey="inaktiv" title={`Inaktiva `}>
            <OrdersTable ordersData={inactiveOrders} />
          </Tab>
        </Tabs>
      </div>
    )
  );
}
