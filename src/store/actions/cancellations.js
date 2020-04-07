import Cancellation from '../../models/cancellation';
import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';

export const DELETE_CANCELLATION = 'DELETE_CANCELLATION';
export const CREATE_CANCELLATION = 'CREATE_CANCELLATION';
export const UPDATE_CANCELLATION = 'UPDATE_CANCELLATION';
export const SET_CANCELLATIONS = 'SET_CANCELLATIONS';

export const fetchCancellations = () => {
  return async dispatch => {
    //Getting data from firestore
    const firestore = firebase.firestore();

    try {
      const loadedCancellations = [];

      firestore
        .collection('cancellations')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const resData = doc.data();
            const readableDate = moment(resData.datum).format('L');
            loadedCancellations.push(
              new Cancellation(
                doc.id,
                readableDate,
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
        type: SET_CANCELLATIONS,
        cancellations: loadedCancellations
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

// console.log('doc.id: ', doc.id);
// console.log('readableDate: ', readableDate);
// console.log('resData.typ: ', resData.typ);
// console.log('resData.beskrivning: ', resData.beskrivning);
// console.log('resData.tidsrymd: ', resData.tidsrymd);
// console.log('resData.telefon: ', resData.telefon);
// console.log('resData.förnamn: ', resData.förnamn);
// console.log('resData.efternamn: ', resData.efternamn);
// console.log('resData.email: ', resData.email);
// console.log('resData.address: ', resData.address);
// console.log('resData.gruppId: ', resData.gruppId);
// console.log('resData.status: ', resData.status);

export const deleteCancellation = cancellationId => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token; //TODO: set up authorisation of admin
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/cancellations/${cancellationId}.json`,
      // `https://sverige-tillsammans.firebaseio.com/cancellations/${cancellationId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_CANCELLATION, oid: cancellationId });
  };
};

export const createCancellation = (
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
    console.log('------createCancellation was triggered-------');
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
    const setGrupp = '';
    const setStatus = 'ohanterad';

    const db = firebase.firestore();
    const response = await db.collection('cancellations').add({
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

    // const response = await fetch(
    //   `https://sverige-tillsammans.firebaseio.com/cancellations.json`,
    //   // `https://sverige-tillsammans.firebaseio.com/cancellations.json?auth=${token}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       datum: setDatum,
    //       typ,
    //       beskrivning,
    //       tidsrymd,
    //       telefon,
    //       förnamn,
    //       efternamn,
    //       email,
    //       address,
    //       postkod,
    //       grupp: setGrupp,
    //       status: setStatus
    //     })
    //   }
    // );

    const resData = await response.json();
    console.log('resData efter post/fetch firebase:', resData);
    console.log('-------------------END-----------');

    dispatch({
      type: CREATE_CANCELLATION,
      cancellationData: {
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

export const updateCancellation = (
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
      `https://sverige-tillsammans.firebaseio.com/cancellations/${id}.json`,
      // `https://sverige-tillsammans.firebaseio.com/cancellations/${id}.json?auth=${token}`,
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
      type: UPDATE_CANCELLATION,
      oid: id,
      cancellationData: {
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
