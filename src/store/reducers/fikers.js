import {
  DELETE_FIKER,
  CREATE_FIKER,
  UPDATE_FIKER,
  SET_FIKERS,
} from "../actions/fikers";
import Fiker from "../../models/fiker";

const initialState = {
  availableFikers: [],
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_FIKERS:
      console.log("---------store/reducers/fikers.js---------");
      console.log(
        "action.fikers from SET_FIKERS reducer THIS WORKS: ",
        action.fikers
      );
      return {
        availableFikers: action.fikers,
      };
    case CREATE_FIKER:
      const newFiker = new Fiker(
        action.fikerData.id,
        action.fikerData.gruppId,
        action.fikerData.förnamn,
        action.fikerData.efternamn,
        action.fikerData.telefon,
        action.fikerData.email,
        action.fikerData.description,
        action.fikerData.oldSchool,
        action.fikerData.newSchool,
        action.fikerData.interests,
        action.fikerData.språk,
        action.fikerData.books,
        action.fikerData.gardening,
        action.fikerData.globalPolitics,
        action.fikerData.localCulture,
        action.fikerData.newTech,
        action.fikerData.lectures,
        action.fikerData.lecture,
        action.fikerData.date,
        action.fikerData.status,
        action.fikerData.kommentarer,
        action.fikerData.skickadFikapersonTillGrupp,
        action.fikerData.skickadBekräftelseTillFikaperson
      );
      return {
        ...state,
        availableFikers: state.availableFikers.concat(newFiker),
      };
    case UPDATE_FIKER:
      const fikerIndex = state.userFikers.findIndex(
        (ordr) => ordr.id === action.oid
      );
      const updatedFiker = new Fiker(
        action.oid,
        action.fikerData.gruppId,
        action.fikerData.förnamn,
        action.fikerData.efternamn,
        action.fikerData.telefon,
        action.fikerData.email,
        action.fikerData.description,
        action.fikerData.oldSchool,
        action.fikerData.newSchool,
        action.fikerData.interests,
        action.fikerData.språk,
        action.fikerData.books,
        action.fikerData.gardening,
        action.fikerData.globalPolitics,
        action.fikerData.localCulture,
        action.fikerData.newTech,
        action.fikerData.lectures,
        action.fikerData.lecture,
        state.availableFikers[fikerIndex].date,
        action.fikerData.status,
        action.fikerData.kommentarer,
        action.fikerData.skickadFikapersonTillGrupp,
        action.fikerData.skickadBekräftelseTillFikaperson
      );
      const updatedAvailableFikers = [...state.availableFikers];
      updatedAvailableFikers[fikerIndex] = updatedFiker;

      return {
        ...state,
        availableFikers: updatedAvailableFikers,
      };
    case DELETE_FIKER:
      return {
        ...state,
        availableFikers: state.availableFikers.filter(
          (fiker) => fiker.id !== action.oid
        ),
      };
  }
  return state;
};
