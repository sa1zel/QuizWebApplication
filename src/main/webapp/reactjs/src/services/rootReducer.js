import {combineReducers} from 'redux';
import authReducer from './user/auth/authReducer';
import quizReducer from './quiz/quizReducer';
import registerReducer from "./user/register/registerReducer";

const rootReducer = combineReducers({
    quiz: quizReducer,
    auth: authReducer,
    registered: registerReducer
});

export default rootReducer;