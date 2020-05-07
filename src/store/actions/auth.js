import firebase from "firebase/app";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const recieveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError= () => {
    return {
        type: LOGOUT_FAILURE
    };
};


const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};


const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveLogin(user));
        })
        .catch(error => {
            console.log(error);
            dispatch(loginError());
        })
};

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(recieveLogout());
        })
        .catch(error => {
            console.log(error);
            dispatch(logoutError());
        })
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    firebase.auth().onAuthStateChanged(user => {
        if (user !== null){
            dispatch(receiveLogin(user));
        }
        dispatch(verifySuccess());
    });
};