import * as RT from "./registerTypes";

const initialState = {
    isRegistered: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case RT.REG_REQUEST:
            return {
                ...state
            };
        case RT.SUCCESS:
        case RT.FAILURE:
            return {
                isRegistered: action.payload
            };
        default:
            return state;
    }
};

export default reducer;