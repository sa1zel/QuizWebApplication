import * as BT from "./quizTypes";
import axios from 'axios';

export const saveQuiz = quiz => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_QUIZ_REQUEST
        });
        axios.post("http://localhost:8080/api/tests/test", quiz)
            .then(response => {
                dispatch(quizSuccess(response.data));
            })
            .catch(error => {
                dispatch(quizFailure(error));
            });
    };
};

export const fetchQuiz = quizId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_QUIZ_REQUEST
        });
        axios.get("http://localhost:8080/api/tests/test" + quizId)
            .then(response => {
                dispatch(quizSuccess(response.data));
            })
            .catch(error => {
                dispatch(quizFailure(error));
            });
    };
};

export const updateQuiz = quiz => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_QUIZ_REQUEST
        });
        axios.put("http://localhost:8080/api/tests/test", quiz)
            .then(response => {
                dispatch(quizSuccess(response.data));
            })
            .catch(error => {
                dispatch(quizFailure(error));
            });
    };
};

export const deleteQuiz = quizId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_QUIZ_REQUEST
        });
        axios.delete("http://localhost:8080/api/tests/test/" + quizId)
            .then(response => {
                dispatch(quizSuccess(response.data));
            })
            .catch(error => {
                dispatch(quizFailure(error));
            });
    };
};

const quizSuccess = quiz => {
    return {
        type: BT.QUIZ_SUCCESS,
        payload: quiz
    };
};

const quizFailure = error => {
    return {
        type: BT.QUIZ_FAILURE,
        payload: error
    };
};

