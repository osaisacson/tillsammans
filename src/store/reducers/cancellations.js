import {
  DELETE_CANCELLATION,
  CREATE_CANCELLATION,
  UPDATE_CANCELLATION,
  SET_CANCELLATIONS
} from '../actions/cancellations';
import Cancellation from '../../models/cancellation';

const initialState = {
  availableCancellations: []
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CANCELLATIONS:
      return {
        availableCancellations: action.cancellations
      };
    case CREATE_CANCELLATION:
      const newCancellation = new Cancellation(
        action.cancellationData.id,
        action.cancellationData.datum,
        action.cancellationData.telefon,
        action.cancellationData.email,
        action.cancellationData.address,
        action.cancellationData.postkod,
        action.cancellationData.status
      );
      return {
        ...state,
        availableCancellations: state.availableCancellations.concat(
          newCancellation
        )
      };
    case UPDATE_CANCELLATION:
      const cancellationIndex = state.userCancellations.findIndex(
        ordr => ordr.id === action.oid
      );
      const updatedCancellation = new Cancellation(
        action.oid,
        state.availableCancellations[cancellationIndex].datum,
        action.cancellationData.telefon,
        action.cancellationData.email,
        action.cancellationData.address,
        action.cancellationData.postkod,
        action.cancellationData.status
      );
      const updatedAvailableCancellations = [...state.availableCancellations];
      updatedAvailableCancellations[cancellationIndex] = updatedCancellation;

      return {
        ...state,
        availableCancellations: updatedAvailableCancellations
      };
    case DELETE_CANCELLATION:
      return {
        ...state,
        availableCancellations: state.availableCancellations.filter(
          cancellation => cancellation.id !== action.oid
        )
      };
  }
  return state;
};
