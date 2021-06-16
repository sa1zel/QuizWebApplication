import * as QT from "./quizTypes";

const initialState = {
    quiz: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case QT.SAVE_QUIZ_REQUEST:
        case QT.FETCH_QUIZ_REQUEST:
        case QT.UPDATE_QUIZ_REQUEST:
        case QT.DELETE_QUIZ_REQUEST:
            return {
                ...state
            };
        case QT.QUIZ_SUCCESS:
            return {
                quiz: action.payload,
                error: ''
            };
        case QT.QUIZ_FAILURE:
            return {
                quiz: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;