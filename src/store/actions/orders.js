import Order from './../../models/order';

export const DELETE_ORDER = 'DELETE_ORDER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    // const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://tillsammans-1ad95.firebaseio.com/orders.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].datum,
            resData[key].typ,
            resData[key].beskrivning,
            resData[key].tidsrymd,
            resData[key].telefon,
            resData[key].förnamn,
            resData[key].efternamn,
            resData[key].email,
            resData[key].address,
            resData[key].postkod,
            resData[key].grupp,
            resData[key].status
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
        // userOrders: loadedOrders.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteOrder = orderId => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token; //TODO: set up authorisation of admin
    const response = await fetch(
      `https://tillsammans-1ad95.firebaseio.com/orders/${orderId}.json`,
      // `https://tillsammans-1ad95.firebaseio.com/orders/${orderId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_ORDER, oid: orderId });
  };
};

export const createOrder = (
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
    // any async code you want!
    // const token = getState().auth.token;
    // const userId = getState().auth.userId;
    const setDatum = new Date();
    const setGrupp = 'ingen ännu';
    const setStatus = 'ohanterad';
    const response = await fetch(
      `https://tillsammans-1ad95.firebaseio.com/orders.json`,
      // `https://tillsammans-1ad95.firebaseio.com/orders.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_ORDER,
      orderData: {
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

export const updateOrder = (
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
      `https://tillsammans-1ad95.firebaseio.com/orders/${id}.json`,
      // `https://tillsammans-1ad95.firebaseio.com/orders/${id}.json?auth=${token}`,
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
      type: UPDATE_ORDER,
      oid: id,
      orderData: {
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
