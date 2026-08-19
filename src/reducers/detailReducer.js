import {
    SET_TEACHER_INFOS
} from "./actions/types"


const initialState = {
    teacher_infos : {}
}


const detailReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_TEACHER_INFOS:
            return {
                ...state,
                teacher_infos: action.value,
            };
        default:
            return state

    }
}

export default detailReducer;
