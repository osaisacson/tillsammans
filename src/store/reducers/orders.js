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
      console.log(
        'store/reducers/orders.js:18 getting the firebase data via our reducer:',
        action.orders
      );
      return {
        availableOrders: action.orders
      };
    case CREATE_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.gruppId,
        action.orderData.volontärId,
        action.orderData.datum,
        action.orderData.typ,
        action.orderData.beskrivning,
        action.orderData.swish,
        action.orderData.kontant,
        action.orderData.faktura,
        action.orderData.tidsrymd,
        action.orderData.telefon,
        action.orderData.förnamn,
        action.orderData.efternamn,
        action.orderData.email,
        action.orderData.address,
        action.orderData.postkod,
        action.orderData.status,
        action.orderData.kommentarer
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
        action.orderData.gruppId,
        action.orderData.volontärId,
        state.availableOrders[orderIndex].datum,
        action.orderData.typ,
        action.orderData.beskrivning,
        action.orderData.swish,
        action.orderData.kontant,
        action.orderData.faktura,
        action.orderData.tidsrymd,
        action.orderData.telefon,
        action.orderData.förnamn,
        action.orderData.efternamn,
        action.orderData.email,
        action.orderData.address,
        action.orderData.postkod,
        action.orderData.status,
        action.orderData.kommentarer
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
