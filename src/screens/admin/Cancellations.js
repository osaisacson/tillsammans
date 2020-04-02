import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import * as cancellationsActions from '../../store/actions/cancellations';

//Components
import Table from './Table';

const Cancellations = props => {
  const cancellations = useSelector(
    state => state.cancellations.availableCancellations
  );

  const toCancel = cancellations.filter(data => data.status === 'avboka');
  const cancelled = cancellations.filter(data => data.status === 'avbokad');

  const dispatch = useDispatch();

  const loadcancellations = useCallback(async () => {
    try {
      await dispatch(cancellationsActions.fetchCancellations());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    loadcancellations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>Avbokningar</h2>
      <ol>
        <li>Hitta den avbeställda bokningen under 'beställningar'</li>
        <li>
          Kontakta relevant grupp för att meddela att beställningen ska bli
          avbokad.
        </li>
        <li>
          Påminn gruppledaren att kommunicera avbokningen till beställaren
        </li>
        <li>Radera beställningen</li>
        <li>
          Kom sen tillbaka hit och markera avbokningen som 'avbokad' under
          'status'.
        </li>
      </ol>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab eventKey="avboka" title={`Att avboka`}>
          <Table isCancelled={true} tableData={toCancel} />
        </Tab>
        <Tab eventKey="avbokade" title={'Avbokade'}>
          <Table isCancelled={true} tableData={cancelled} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Cancellations;
