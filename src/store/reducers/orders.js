import {
  DELETE_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  SET_ORDERS
} from './../actions/orders';
import Order from '../../models/order';

const initialState = {
  availableOrders: []
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_ORDERS:
      console.log('-----action.orders from SET_ORDERS reducer', action.orders);
      return {
        availableOrders: action.orders
      };
    case CREATE_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.datum,
        action.orderData.typ,
        action.orderData.beskrivning,
        action.orderData.tidsrymd,
        action.orderData.telefon,
        action.orderData.förnamn,
        action.orderData.efternamn,
        action.orderData.email,
        action.orderData.address,
        action.orderData.grupp,
        action.orderData.status
      );
      return {
        ...state,
        availableOrders: state.availableOrders.concat(newOrder)
      };
    case UPDATE_ORDER:
      const orderIndex = state.userOrders.findIndex(
        ordr => ordr.id === action.oid
      );
      const updatedOrder = new Order(
        action.oid,
        state.availableOrders[orderIndex].datum,
        action.orderData.typ,
        action.orderData.beskrivning,
        action.orderData.tidsrymd,
        action.orderData.telefon,
        action.orderData.förnamn,
        action.orderData.efternamn,
        action.orderData.email,
        action.orderData.address,
        action.orderData.grupp,
        action.orderData.status
      );
      const updatedAvailableOrders = [...state.availableOrders];
      updatedAvailableOrders[orderIndex] = updatedOrder;

      return {
        ...state,
        availableOrders: updatedAvailableOrders
      };
    case DELETE_ORDER:
      return {
        ...state,
        availableOrders: state.availableOrders.filter(
          order => order.id !== action.oid
        )
      };
  }
  return state;
};
