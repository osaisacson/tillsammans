import {
  DELETE_VOLUNTEER,
  CREATE_VOLUNTEER,
  UPDATE_VOLUNTEER,
  SET_VOLUNTEERS
} from '../actions/volunteers';
import Order from '../../models/volunteer';

const initialState = {
  availableVolunteers: []
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_VOLUNTEERS:
      console.log(
        '-----action.volunteers from SET_VOLUNTEERS reducer',
        action.volunteers
      );
      return {
        availableVolunteers: action.volunteers
      };
    case CREATE_VOLUNTEER:
      const newOrder = new Order(
        action.volunteerData.id,
        action.volunteerData.datum,
        action.volunteerData.typ,
        action.volunteerData.beskrivning,
        action.volunteerData.tidsrymd,
        action.volunteerData.telefon,
        action.volunteerData.förnamn,
        action.volunteerData.efternamn,
        action.volunteerData.email,
        action.volunteerData.address,
        action.volunteerData.grupp,
        action.volunteerData.status
      );
      return {
        ...state,
        availableVolunteers: state.availableVolunteers.concat(newOrder)
      };
    case UPDATE_VOLUNTEER:
      const volunteerIndex = state.userVolunteers.findIndex(
        ordr => ordr.id === action.oid
      );
      const updatedOrder = new Order(
        action.oid,
        state.availableVolunteers[volunteerIndex].datum,
        action.volunteerData.typ,
        action.volunteerData.beskrivning,
        action.volunteerData.tidsrymd,
        action.volunteerData.telefon,
        action.volunteerData.förnamn,
        action.volunteerData.efternamn,
        action.volunteerData.email,
        action.volunteerData.address,
        action.volunteerData.grupp,
        action.volunteerData.status
      );
      const updatedAvailableVolunteers = [...state.availableVolunteers];
      updatedAvailableVolunteers[volunteerIndex] = updatedOrder;

      return {
        ...state,
        availableVolunteers: updatedAvailableVolunteers
      };
    case DELETE_VOLUNTEER:
      return {
        ...state,
        availableVolunteers: state.availableVolunteers.filter(
          volunteer => volunteer.id !== action.oid
        )
      };
  }
  return state;
};
