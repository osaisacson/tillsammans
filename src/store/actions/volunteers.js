import Volunteer from '../../models/volunteer';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import moment from 'moment';

export const DELETE_VOLUNTEER = 'DELETE_VOLUNTEER';
export const CREATE_VOLUNTEER = 'CREATE_VOLUNTEER';
export const UPDATE_VOLUNTEER = 'UPDATE_VOLUNTEER';
export const SET_VOLUNTEERS = 'SET_VOLUNTEERS';

export const fetchVolunteers = () => {
  return async dispatch => {
    //Getting data from firestore
    const firestore = firebase.firestore();

    try {
      const loadedVolunteers = [];

      firestore
        .collection('volunteers')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const resData = doc.data();
            loadedVolunteers.push(
              new Volunteer(
                doc.id,
                resData.förnamn,
                resData.efternamn,
                resData.telefon,
                resData.email,
                resData.address,
                resData.beskrivning,
                resData.körkort,
                resData.bil,
                resData.mat,
                resData.varor,
                resData.ärenden,
                resData.djur,
                resData.prata,
                resData.myndigheter,
                resData.grupp,
                resData.datum,
                resData.status
              )
            );
          });
        });

      console.log(
        'actions.js: data received from firebase and passed through model: ',
        loadedVolunteers
      );

      dispatch({
        type: SET_VOLUNTEERS,
        volunteers: loadedVolunteers
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

export const deleteVolunteer = volunteerId => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token; //TODO: set up authorisation of admin
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/volunteers/${volunteerId}.json`,
      // `https://sverige-tillsammans.firebaseio.com/volunteers/${volunteerId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_VOLUNTEER, oid: volunteerId });
  };
};

export const createVolunteer = (
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
    console.log('------createVolunteer was triggered-------');
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
    const response = await db.collection('volunteers').add({
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
    //   `https://sverige-tillsammans.firebaseio.com/volunteers.json`,
    //   // `https://sverige-tillsammans.firebaseio.com/volunteers.json?auth=${token}`,
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
      type: CREATE_VOLUNTEER,
      volunteerData: {
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

export const updateVolunteer = (
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
      `https://sverige-tillsammans.firebaseio.com/volunteers/${id}.json`,
      // `https://sverige-tillsammans.firebaseio.com/volunteers/${id}.json?auth=${token}`,
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
      type: UPDATE_VOLUNTEER,
      oid: id,
      volunteerData: {
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
