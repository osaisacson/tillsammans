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

const GroupAdmin = props => {
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
      const readableDate = moment(new Date(resData.datum)).format('lll');

      groups.push(
        new Group(
          doc.id,
          readableDate,
          resData.gruppnamn,
          resData.länkNamn,
          resData.kontakt,
          resData.kommentarer,
          resData.telefon,
          resData.email,
          resData.address,
          resData.postkod,
          resData.status,
          resData.adminNamn,
          resData.adminPwd
        )
      );
    });

    //set current group data as the object which matches the passed group id
    setGroupData({
      currentGroup: groups.find(data => data.id === props.groupId)
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
          <GroupOrders groupId={props.groupId} />
        </Tab>
        <Tab title="Volontärer" eventKey="second">
          <GroupVolunteers groupId={props.groupId} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupAdmin;
