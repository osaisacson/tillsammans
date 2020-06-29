import Fiker from "../../models/volunteer";
import firebase from "firebase/app";
import "firebase/firestore";
// import moment from 'moment';

export const DELETE_FIKER = "DELETE_FIKER";
export const CREATE_FIKER = "CREATE_FIKER";
export const UPDATE_FIKER = "UPDATE_FIKER";
export const SET_FIKERS = "SET_FIKERS";

export const fetchFikers = () => {
  return async (dispatch) => {
    //Getting data from firestore
    const firestore = firebase.firestore();

    try {
      const loadedFikers = [];

      firestore
        .collection("fika")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            const resData = doc.data();
            loadedFikers.push(
              new Fiker(
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
                resData.status,
                resData.kommentarer,
                resData.skickadVolontärTillGrupp,
                resData.skickadBekräftelseTillVolontär
              )
            );
          });
        });

      console.log("****** FIKAPERSONER - REDUX APPROACH (preferred) ******");
      console.log("---------store/actions/fikers.js---------");
      console.log(
        "data received from firebase and passed through model THIS WORKS: ",
        loadedFikers
      );

      dispatch({
        type: SET_FIKERS,
        volunteers: loadedFikers,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteFiker = (id) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/fika/${id}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_FIKER, oid: id });
  };
};

export const createFiker = (
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
  return async (dispatch) => {
    const setDatum = new Date().getTime();
    const setGrupp = "";
    const setStatus = "1";

    const db = firebase.firestore();
    const response = await db.collection("fika").add({
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
      status: setStatus,
    });

    const resData = await response.json();
    console.log("resData efter post/fetch firebase:", resData);
    console.log("-------------------END-----------");

    dispatch({
      type: CREATE_FIKER,
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
        status: setStatus,
      },
    });
  };
};

export const updateFiker = (
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
  return async (dispatch) => {
    const response = await fetch(
      `https://sverige-tillsammans.firebaseio.com/volunteers/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_FIKER,
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
        status,
      },
    });
  };
};
