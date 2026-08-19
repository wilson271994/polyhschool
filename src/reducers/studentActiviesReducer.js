import { STUDENT_ACTIVITIES } from "./actions/types";




const initialState = {
    student_activities  : null,
};

const studentActivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_ACTIVITIES:
            return {
                ...state,
                student_activities: action.value,
            };
        default:
            return state;
    }
};

export default studentActivitiesReducer;