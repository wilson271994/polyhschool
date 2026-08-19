import {
    AUTH_ERROR_MESSAGE,
    GARDIAN_INFOS,
    IS_ADMISSION_APPROVED,
    IS_AUTHENTICATED,
    IS_AUTH_ERROR,
    IS_PARENT,
    IS_PIN_APPROUVED,
    IS_SCHOOL_USER,
    SCHOOL_INFOS,
    SET_SELECTED_SCHOOL,
    SCHOOL_NOTIFICATION_LIST,
    SITE_INFOS,
    STUDENT_INFOS,
    USER_INFOS,
    USER_TOKEN,
} from "./actions/types"


const initialState = {
    is_authenticated                : false,
    is_parent                       : false,
    is_admission_approved           : false,
    is_school_user                  : false,
    user_infos                      : {},
    student_infos                   : [],
    gardian_infos                   : [],
    school_notification_list        : [], 
    user_token                      : '',
    auth_error_message              : '',
    is_auth_error                   : false,
    site_infos                      : {},
    school_infos                    : {},
    is_pin_approuved                : false,

    selectedSchool                  : {},
}


const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                is_authenticated:action.value
            }

        case USER_INFOS:
            return {
                ...state,
                user_infos:action.value
            }
        case STUDENT_INFOS:
            return {
                ...state,
                student_infos:action.value
            }
        case GARDIAN_INFOS:
            return {
                ...state,
                gardian_infos:action.value
            }

        case SCHOOL_NOTIFICATION_LIST:
            return {
                ...state,
                school_notification_list: action.value
            }

        case USER_TOKEN:
            return {
                ...state,
                user_token:action.value
            }

        case AUTH_ERROR_MESSAGE:
            return {
                ...state,
                auth_error_message:action.value
            }

        case IS_AUTH_ERROR:
            return {
                ...state,
                is_auth_error:action.value
            }

        case SITE_INFOS:
            return {
                ...state,
                site_infos:action.value
            }
        case SCHOOL_INFOS:
            return {
                ...state,
                school_infos: action.value
            }
        case IS_PIN_APPROUVED:
            return {
                ...state,
                is_pin_approuved:action.value
            }
        case SET_SELECTED_SCHOOL:
            return {
                ...state,
                selectedSchool: action.value,
            };
        case IS_PARENT:
            return{
                ...state,
                is_parent : action.value,
            }
        case IS_ADMISSION_APPROVED:
            return {
                ...state,
                is_admission_approved: action.value
            }
        case IS_SCHOOL_USER:
            return {
                ...state,
                is_school_user: action.value
            }
        default:
            return state

    }
}

export default authReducer;
