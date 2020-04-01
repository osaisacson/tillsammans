import {
  DELETE_GROUP,
  CREATE_GROUP,
  UPDATE_GROUP,
  SET_GROUPS
} from '../actions/groups';
import Group from '../../models/group';

const initialState = {
  availableGroups: []
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_GROUPS:
      return {
        availableGroups: action.groups
      };
    case CREATE_GROUP:
      const newGroup = new Group(
        action.groupData.id,
        action.groupData.datum,
        action.groupData.gruppnamn,
        action.groupData.kontakt,
        action.groupData.telefon,
        action.groupData.email,
        action.groupData.address,
        action.groupData.postkod,
        action.groupData.status
      );
      return {
        ...state,
        availableGroups: state.availableGroups.concat(newGroup)
      };
    case UPDATE_GROUP:
      const groupIndex = state.userGroups.findIndex(
        ordr => ordr.id === action.oid
      );
      const updatedGroup = new Group(
        action.oid,
        state.availableGroups[groupIndex].datum,
        action.groupData.gruppnamn,
        action.groupData.kontakt,
        action.groupData.telefon,
        action.groupData.email,
        action.groupData.address,
        action.groupData.postkod,
        action.groupData.status
      );
      const updatedAvailableGroups = [...state.availableGroups];
      updatedAvailableGroups[groupIndex] = updatedGroup;

      return {
        ...state,
        availableGroups: updatedAvailableGroups
      };
    case DELETE_GROUP:
      return {
        ...state,
        availableGroups: state.availableGroups.filter(
          group => group.id !== action.oid
        )
      };
  }
  return state;
};
