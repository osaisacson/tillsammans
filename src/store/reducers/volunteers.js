import {
  DELETE_VOLUNTEER,
  CREATE_VOLUNTEER,
  UPDATE_VOLUNTEER,
  SET_VOLUNTEERS
} from '../actions/volunteers';
import Volunteer from '../../models/volunteer';

const initialState = {
  availableVolunteers: []
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_VOLUNTEERS:
      console.log('---------store/reducers/volunteers.js---------');
      console.log(
        'action.volunteers from SET_VOLUNTEERS reducer THIS WORKS: ',
        action.volunteers
      );
      return {
        availableVolunteers: action.volunteers
      };
    case CREATE_VOLUNTEER:
      const newVolunteer = new Volunteer(
        action.volunteerData.id,
        action.volunteerData.förnamn,
        action.volunteerData.efternamn,
        action.volunteerData.telefon,
        action.volunteerData.email,
        action.volunteerData.address,
        action.volunteerData.postkod,
        action.volunteerData.beskrivning,
        action.volunteerData.körkort,
        action.volunteerData.bil,
        action.volunteerData.mat,
        action.volunteerData.varor,
        action.volunteerData.ärenden,
        action.volunteerData.djur,
        action.volunteerData.prata,
        action.volunteerData.myndigheter,
        action.volunteerData.teknik,
        action.volunteerData.grupp,
        action.volunteerData.datum,
        action.volunteerData.status,
        action.volunteerData.kommentarer
      );
      return {
        ...state,
        availableVolunteers: state.availableVolunteers.concat(newVolunteer)
      };
    case UPDATE_VOLUNTEER:
      const volunteerIndex = state.userVolunteers.findIndex(
        ordr => ordr.id === action.oid
      );
      const updatedVolunteer = new Volunteer(
        action.oid,
        action.volunteerData.förnamn,
        action.volunteerData.efternamn,
        action.volunteerData.telefon,
        action.volunteerData.email,
        action.volunteerData.address,
        action.volunteerData.postkod,
        action.volunteerData.beskrivning,
        action.volunteerData.körkort,
        action.volunteerData.bil,
        action.volunteerData.mat,
        action.volunteerData.varor,
        action.volunteerData.ärenden,
        action.volunteerData.djur,
        action.volunteerData.prata,
        action.volunteerData.myndigheter,
        action.volunteerData.teknik,
        action.volunteerData.grupp,
        state.availableVolunteers[volunteerIndex].datum,
        action.volunteerData.status,
        action.volunteerData.kommentarer
      );
      const updatedAvailableVolunteers = [...state.availableVolunteers];
      updatedAvailableVolunteers[volunteerIndex] = updatedVolunteer;

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
