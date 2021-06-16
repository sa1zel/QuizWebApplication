import axios from "axios";
import * as RT from "./registerTypes";

export const registerUser = (firstName, lastName, email, password) => {
    const credentials = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };
    return dispatch => {
        dispatch({
            type: RT.REG_REQUEST
        });
        axios.post("http://localhost:8080/api/registration/register", credentials)
            .then(response => {
                dispatch(success(true));
            })
            .catch(error => {
                console.error(error);
                dispatch(failure());
            });
    };
};

const success = registered => {
    return {
        type: RT.SUCCESS,
        payload: registered
    };
};

const failure = () => {
    return {
        type: RT.FAILURE,
        payload: false
    };
};