import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import moment from 'moment';

//Models
import Group from './../../models/group';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import GroupOrders from '../groupAdmin/GroupOrders';
import GroupVolunteers from '../groupAdmin/GroupVolunteers';

const GroupAdmin = ({ match }) => {
  //Get id of group as passed via params in Table.js
  const {
    params: { groupId }
  } = match;

  const firestore = firebase.firestore();
  const [groupData, setGroupData] = useState({
    currentGroup: []
  });

  async function getGroups() {
    const groups = [];
    const querySnapshot = await firestore.collection('groups').get();
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(resData.datum).format('lll');

      groups.push(
        new Group(
          doc.id,
          readableDate,
          resData.gruppnamn,
          resData.kontakt,
          resData.kommentarer,
          resData.telefon,
          resData.email,
          resData.address,
          resData.postkod,
          resData.status
        )
      );
    });

    //set current group data as the object which matches the passed group id
    setGroupData({
      currentGroup: groups.find(data => data.id === groupId)
    });
  }
  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>{groupData.currentGroup.gruppnamn}</h2>
      <br />
      <Tabs variant="pills" defaultActiveKey="first" id="0">
        <Tab title="Beställningar" eventKey="first">
          <GroupOrders groupId={groupId} />
        </Tab>
        <Tab title="Volontärer" eventKey="second">
          <GroupVolunteers groupId={groupId} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupAdmin;
