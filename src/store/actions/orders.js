import Order from './../../models/order';
import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';

export const DELETE_ORDER = 'DELETE_ORDER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    //Getting data from firestore
    const firestore = firebase.firestore();

    try {
      const loadedOrders = [];

      firestore
        .collection('orders')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const resData = doc.data();
            const readableDate = moment(resData.datum).format('L');
            loadedOrders.push(
              new Order(
                doc.id,
                readableDate,
                resData.typ,
                resData.beskrivning,
                resData.tidsrymd,
                resData.telefon,
                resData.förnamn,
                resData.efternamn,
                resData.email,
                resData.address,
                resData.grupp,
                resData.status
              )
            );
          });
        });

      console.log(
        'actions.js: data received from firebase and passed through model: ',
        loadedOrders
      );

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
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
// console.log('resData.grupp: ', resData.grupp);
// console.log('resData.status: ', resData.status);

export const deleteOrder = orderId => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token; //TODO: set up authorisation of admin
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/orders/${orderId}.json`,
      // `https://sverige-tillsammans.firebaseio.com/orders/${orderId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_ORDER, oid: orderId });
  };
};

export const createOrder = (
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
    console.log('------createOrder was triggered-------');
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
    const response = await db.collection('orders').add({
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
    //   `https://sverige-tillsammans.firebaseio.com/orders.json`,
    //   // `https://sverige-tillsammans.firebaseio.com/orders.json?auth=${token}`,
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
      type: CREATE_ORDER,
      orderData: {
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

export const updateOrder = (
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
      `https://sverige-tillsammans.firebaseio.com/orders/${id}.json`,
      // `https://sverige-tillsammans.firebaseio.com/orders/${id}.json?auth=${token}`,
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
      type: UPDATE_ORDER,
      oid: id,
      orderData: {
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
