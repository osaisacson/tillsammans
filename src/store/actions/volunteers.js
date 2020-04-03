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
                resData.postkod,
                resData.beskrivning,
                resData.språk,
                resData.födelseår,
                resData.körkort,
                resData.bil,
                resData.mat,
                resData.varor,
                resData.ärenden,
                resData.djur,
                resData.prata,
                resData.myndigheter,
                resData.teknik,
                resData.grupp,
                resData.datum,
                resData.status
              )
            );
          });
        });

      console.log('****** VOLONTÄRER - REDUX APPROACH (preferred) ******');
      console.log('---------store/actions/volunteers.js---------');
      console.log(
        'data received from firebase and passed through model THIS WORKS: ',
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

export const deleteVolunteer = volunteerId => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/volunteers/${volunteerId}.json`,
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
  förnamn,
  efternamn,
  telefon,
  email,
  address,
  postkod,
  beskrivning,
  körkort,
  bil,
  mat,
  varor,
  ärenden,
  djur,
  prata,
  myndigheter,
  teknik
) => {
  return async dispatch => {
    const setDatum = new Date().getTime();
    const setGrupp = '';
    const setStatus = 'ohanterad';

    const db = firebase.firestore();
    const response = await db.collection('volunteers').add({
      förnamn,
      efternamn,
      telefon,
      email,
      address,
      postkod,
      beskrivning,
      körkort,
      bil,
      mat,
      varor,
      ärenden,
      djur,
      prata,
      myndigheter,
      teknik,
      grupp: setGrupp,
      datum: setDatum,
      status: setStatus
    });

    const resData = await response.json();
    console.log('resData efter post/fetch firebase:', resData);
    console.log('-------------------END-----------');

    dispatch({
      type: CREATE_VOLUNTEER,
      volunteerData: {
        id: resData.name,
        förnamn,
        efternamn,
        telefon,
        email,
        address,
        postkod,
        beskrivning,
        körkort,
        bil,
        mat,
        varor,
        ärenden,
        djur,
        prata,
        myndigheter,
        teknik,
        grupp: setGrupp,
        datum: setDatum,
        status: setStatus
      }
    });
  };
};

export const updateVolunteer = (
  id,
  förnamn,
  efternamn,
  telefon,
  email,
  address,
  postkod,
  beskrivning,
  körkort,
  bil,
  mat,
  varor,
  ärenden,
  djur,
  prata,
  myndigheter,
  teknik,
  grupp,
  status
) => {
  return async dispatch => {
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/volunteers/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          förnamn,
          efternamn,
          telefon,
          email,
          address,
          postkod,
          beskrivning,
          körkort,
          bil,
          mat,
          varor,
          ärenden,
          djur,
          prata,
          myndigheter,
          teknik,
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
        förnamn,
        efternamn,
        telefon,
        email,
        address,
        postkod,
        beskrivning,
        körkort,
        bil,
        mat,
        varor,
        ärenden,
        djur,
        prata,
        myndigheter,
        teknik,
        grupp,
        status
      }
    });
  };
};
