import Group from '../../models/group';
import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';

export const DELETE_GROUP = 'DELETE_GROUP';
export const CREATE_GROUP = 'CREATE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const SET_GROUPS = 'SET_GROUPS';

export const fetchGroups = () => {
  return async dispatch => {
    //Getting data from firestore
    const firestore = firebase.firestore();

    try {
      const loadedGroups = [];

      firestore
        .collection('groups')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const resData = doc.data();
            const readableDate = moment(resData.datum).format('L');
            loadedGroups.push(
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
        });

      dispatch({
        type: SET_GROUPS,
        groups: loadedGroups
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteGroup = groupId => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/groups/${groupId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_GROUP, oid: groupId });
  };
};

export const createGroup = (
  typ,
  beskrivning,
  tidsrymd,
  telefon,
  förnamn,
  efternamn,
  email,
  address,
  postkod
) => {
  return async (dispatch, getState) => {
    console.log('------createGroup was triggered-------');
    console.log('received data:');
    console.log('typ:', typ);
    console.log('beskrivning:', beskrivning);
    console.log('tidsrymd:', tidsrymd);
    console.log('telefon:', telefon);
    console.log('förnamn:', förnamn);
    console.log('efternamn:', efternamn);
    console.log('email:', email);
    console.log('address:', address);
    console.log('postkod:', postkod);
    console.log('---------');

    const setDatum = new Date().getTime();
    const setGrupp = 'ingen';
    const setStatus = 'ohanterad';

    const db = firebase.firestore();
    const response = await db.collection('groups').add({
      typ: typ,
      beskrivning: beskrivning,
      tidsrymd: tidsrymd,
      telefon: telefon,
      förnamn: förnamn,
      efternamn: efternamn,
      email: email,
      address: address,
      grupp: setGrupp,
      datum: setDatum,
      status: setStatus
    });

    const resData = await response.json();
    console.log('resData efter post/fetch firebase:', resData);
    console.log('-------------------END-----------');

    dispatch({
      type: CREATE_GROUP,
      groupData: {
        id: resData.name,
        datum: setDatum,
        typ,
        beskrivning,
        tidsrymd,
        telefon,
        förnamn,
        efternamn,
        email,
        address,
        postkod,
        grupp: setGrupp,
        status: setStatus
      }
    });
  };
};

export const updateGroup = (
  id,
  typ,
  beskrivning,
  tidsrymd,
  telefon,
  förnamn,
  efternamn,
  email,
  address,
  postkod,
  grupp,
  status
) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/groups/${id}.json`,
      // `https://sverige-tillsammans.firebaseio.com/groups/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          typ,
          beskrivning,
          tidsrymd,
          telefon,
          förnamn,
          efternamn,
          email,
          address,
          postkod,
          grupp,
          status
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_GROUP,
      oid: id,
      groupData: {
        typ,
        beskrivning,
        tidsrymd,
        telefon,
        förnamn,
        efternamn,
        email,
        address,
        postkod,
        grupp,
        status
      }
    });
  };
};
