import * as AT from './authTypes';
import axios from 'axios';

export const authenticateUser = (email, password) => {
    return dispatch => {
        dispatch({
            type: AT.LOGIN_REQUEST
        });
        axios.defaults.headers.common = {
            Authorization: `Basic ${btoa(email + ":" + password)}`,
        }
        axios.post("http://localhost:8080/api/login")
            .then(response => {
                dispatch(success(true, response.data));
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
            })
            .catch(error => {
                console.error(error);
                dispatch(failure());
            });
    };
};

export const logoutUser = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    return dispatch => {
        dispatch({
            type: AT.LOGOUT_REQUEST
        });
        delete axios.defaults.headers.common['Authorization'];
        dispatch(success(false));
    };
};

const success = (isLoggedIn, isAdmin)  => {
    return {
        type: AT.SUCCESS,
        payload: { isLoggedIn, isAdmin }
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false
    };
};