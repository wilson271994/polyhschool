import { types } from "react-native-document-picker";
import {
    SET_SUPPORT_CHAT, SET_SUPPORT_HOME,
    SET_ACTIVATION_FORM, SET_COURSE_PAGE,
    SET_VIDEO_PAGE, SET_HOME_PAGE, SET_LOGIN_FORM, SET_CHOOSE_FORM,
    SET_COURSE_HISTORY_PAGE, SET_COURSE_DETAIL_PAGE, SET_MESSAGE_PAGE, SET_NOTIF_HOME,
    SET_PROFIL_PAGE, SET_PROFIL_UPDATE_INFO, SET_PROFIL_HOME, SET_COURSE_HISTORY_HOME,
    SET_SIGNUP1_FORM, SET_SIGNUP2_FORM, SET_SYS_HOME, SET_MESSAGE_HOME, SET_COURSE_HOME,
    SET_HOME_PARENT, SET_REGISTER_1, SET_REGISTER_2, SET_SCHOOL_SELECTION_PAGE, SET_SCHOOL_DETAILS_PAGE,
    SET_SCHOOL_SELECTION_PARENT_PAGE, SET_SCHOOL_DETAILS_PARENT_PAGE,
    SET_STUDENT_MENU_PAGE,
    SET_STUDENT_AGENDA_PAGE,
    SET_STUDENT_ABSENCES_PAGE,
    SET_STUDENT_INFOS_PAGE,
    SET_STUDENT_PLANNING_PAGE,
    SET_STUDENT_PROGRESS_PAGE,
    SET_STUDENT_ACTIVITIES_PAGE,
    SET_TEACHER_LIST_PAGE,
    SET_STUDENT_HOMEWORK_PAGE,
    SET_SCHOOL_FEES_PAGE,
    SET_STUDENT_REMARKS_PAGE,
    SET_CHILD_INFOS_PAGE,
    SET_MENU_STUDENT_PAGE,
    SET_LIST_TEACHER_PAGE,
    SET_PLANNING_STUDENT_PAGE,
    SET_ABSENCES_STUDENT_PAGE,
    SET_REMARK_STUDENT_PAGE,
    SET_HOMEWORK_STUDENT_PAGE,
    SET_FEES_SCHOOL_PAGE,
    SET_STUDENT_PROGRESSION_PAGE,
    SET_ACTIVITIES_STUDENT_PAGE,
    SET_AGENDA_STUDENT_PAGE,
    SET_ADVANCE_REMARKS_FILTER_PAGE,
    SET_ADVANCE_REMARKS_SEARCH_PAGE,
    SET_ADVANCE_COURSE_SEARCH,
    SET_STUDENT_TRANSPORT_PAGE,
    SET_TRANSPORT_STUDENT_PAGE,
    SET_STUDENT_HOSTING_PAGE,
    SET_HOSTING_STUDENT_PAGE,
    SET_CHAT_INDEX_PAGE,
    SET_FAQS_PAGE,
    SET_KYC_PAGE,
    SET_TRANSACTION_HISTORY_PAGE,
    SET_UPDATE_NOTIFICATION_PAGE,
    SET_UPDATE_LANGUAGE_PAGE,
    SET_ADVANCE_MESSAGE_FILTER_PAGE,
    SET_TEACHER_INFOS_PAGE,
    SET_INFOS_TEACHER_PAGE,
    SET_CONTACT_PAGE,
    SET_ADD_DESCRIPTION_PAGE,
    SET_STUDENT_PROJECT_PAGE,
    SET_PARENT_STUDENT_PROJECT_PAGE,
    SET_UPDATE_AUTHENTIFICATION_PAGE,
    SET_UPDATE_PASSWORD_PAGE,
    SET_CONTACT_PROFILE_PAGE,
    SET_CONTACT_NOTIFICATION_PAGE,
    SET_MEDIA_CHAT_PAGE,
    SET_ARCHIVED_MESSAGE_PAGE,
    SET_STUDENT_LIBRARY_PAGE,
    SET_STUDENT_BOOK_DETAILS_PAGE,
    SET_SELECTED_BOOK,
    SET_PAID_BOOK,
    SET_STUDENT_BOOK_SHOP_PAGE,
    SET_STUDENT_BOOK_SHOP_DETAILS_PAGE,
    SET_PARENT_STUDENT_LIBRAIRY_PAGE,
    SET_PARENT_STUDENT_BOOK_DETAIL_PAGE,
    SET_PARENT_STUDENT_BOOK_SHOP_PAGE,
    SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS,
    SET_PARENT_STUDENT_CV_PAGE,
    SET_STUDENT_CV_PAGE,
    SET_SELECTED_SCHOOL,
    SET_COURSE_PARENT_PAGE,
    SET_PARENT_COURSE_HISTORY_PAGE,
    SET_SCHOOL_SELECT_FORM_PAGE,
    SET_CHOOSE_ACCOUNT_FORM_PAGE,
    SET_SCHOOL_DETAILS_FORM_PAGE,
    SET_NEW_STUDENT_FORM_PAGE,
    SET_SCHOOL_ADMISSION_FORM,
    SET_UPLOAD_ADMISSION_DOCUMENT_PAGE,
    SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE,
    SET_PARENT_UPLOAD_DOCUMENT_PAGE,
    SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE,
    SET_NEW_UPLOAD_DOCUMENT_PAGE,
    SET_SIGNUP3_FORM,
    SET_TEACHER_INFOS
} from "../reducers/actions/types"
import { store } from "../reducers/store";



// /******************************************
//  ******************************* NAVIGATION 
//  ******************************************/

/**
 * Auth
 */
export const switchLoginFormAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_LOGIN_FORM, value: data });
        store.dispatch({ type: SET_CHOOSE_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP1_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP2_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP3_FORM, value: false });
        store.dispatch({ type: SET_ACTIVATION_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_ADMISSION_FORM, value: false});
        store.dispatch({ type: SET_UPLOAD_ADMISSION_DOCUMENT_PAGE, value: false});
    }
}

export const switchChooseFormAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CHOOSE_FORM, value: data }); 
        store.dispatch({ type: SET_LOGIN_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP1_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP2_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP3_FORM, value: false });
        store.dispatch({ type: SET_ACTIVATION_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: false });
    }
}

export const switchSignupForm1Action = (data) => {
    if (data) {
        store.dispatch({ type: SET_SIGNUP1_FORM, value: data });
        store.dispatch({ type: SET_SIGNUP2_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP3_FORM, value: false });
        store.dispatch({ type: SET_CHOOSE_FORM, value: false });
        store.dispatch({ type: SET_LOGIN_FORM, value: false });
        store.dispatch({ type: SET_ACTIVATION_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: false });
    }
}

export const switchSignupForm2Action = (data) => {
    if (data) {
        store.dispatch({ type: SET_SIGNUP2_FORM, value: data });
        store.dispatch({ type: SET_SIGNUP1_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP3_FORM, value: false });
        store.dispatch({ type: SET_CHOOSE_FORM, value: false });
        store.dispatch({ type: SET_LOGIN_FORM, value: false });
        store.dispatch({ type: SET_ACTIVATION_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: false });
    }
}

export const switchSignupForm3Action = (data) => {
    if (data) {
        store.dispatch({ type: SET_SIGNUP3_FORM, value: data });
        store.dispatch({ type: SET_SIGNUP2_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP1_FORM, value: false });
        store.dispatch({ type: SET_CHOOSE_FORM, value: false });
        store.dispatch({ type: SET_LOGIN_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVATION_FORM, value: false});
    }
}

export const switchSchoolSelectionAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: data });
        store.dispatch({ type: SET_CHOOSE_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP1_FORM, value: false });
        store.dispatch({ type: SET_LOGIN_FORM, value: false });
        store.dispatch({ type: SET_ACTIVATION_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP2_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: false });
    }
}
export const switchSchoolDetailsAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: data });
        store.dispatch({ type: SET_CHOOSE_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP1_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP2_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP3_FORM, value: false });
        store.dispatch({ type: SET_LOGIN_FORM, value: false });
        store.dispatch({ type: SET_ACTIVATION_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: false });
    }
}
export const switchActivationFormAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ACTIVATION_FORM, value: data });
        store.dispatch({ type: SET_CHOOSE_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP3_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP2_FORM, value: false });
        store.dispatch({ type: SET_SIGNUP1_FORM, value: false });
        store.dispatch({ type: SET_LOGIN_FORM, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PAGE, value: false });
    }
}


export const setSelectedSchoolAction = (school) => {
    store.dispatch({
        type: SET_SELECTED_SCHOOL,
        value: school,
    });
};


/**
 * Bottom Navigation
 * @param {*} data 
 */
export const switchHomePageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_HOME_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: data });
        store.dispatch({ type: SET_COURSE_PAGE, value: false });
        store.dispatch({ type: SET_COURSE_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_PROFIL_PAGE, value: false });
        store.dispatch({ type: SET_MESSAGE_PAGE, value: false });

        // page home
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });


        //Sub student menu page
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: false});

        //Sub Sub student Menu page

        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });

        //Sub student Menu page
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });

        //Sub Sub student parent menu page
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });

        //Sub_Sub_Sub student Parent menu page
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
    }
}
/**
 * Sub PAGE
 */
export const switchMenuStudentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_HOME_PAGE, value: data });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });


        //Sub page
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: false});

        //Sub Sub page

        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
    }
}
export const switchChildInfosPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: false});
    }
}
export const switchListTeacherPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: false});
    }
}
export const switchPlanningStudentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: false});
    }
}
export const switchAbsenceStudentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false })
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: false});
    }
}
export const switchRemarkStudentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: false});
    }
}
export const switchHomeworkStudentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchSchoolFeesPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentProgressionPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchActivitiesStudentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchAgendaStudentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchAdvanceRemarkFilterPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentTransportPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentHostingPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchInfosTeacherPageAction = (status, data) => {
    if (data) {
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: status });
        store.dispatch({ type: SET_TEACHER_INFOS, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}

export const switchStudentProjectPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}

export const switchStudentLibraryPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentBookDetailsPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentBookShopPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentBookShopDetaisPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentCVPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}


export const switchStudentChoolSelectedPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}


export const switchStudentChooseAccountPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}
export const switchStudentChoolDetailsPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: false });
    }
}


export const switchStudentNewStudentFormPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_NEW_STUDENT_FORM_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
    }
}


export const switchNewAdmissionTypePageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
    }
}
export const switchNewUploadDocumentPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_NEW_UPLOAD_DOCUMENT_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
        store.dispatch({ type: SET_MENU_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_CHILD_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_LIST_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_PLANNING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ABSENCES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_REMARK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOMEWORK_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_FEES_SCHOOL_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESSION_PAGE, value: false });
        store.dispatch({ type: SET_ACTIVITIES_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_AGENDA_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_TRANSPORT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOSTING_PAGE, value: false });
        store.dispatch({ type: SET_INFOS_TEACHER_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_LIBRARY_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_BOOK_SHOP_DETAILS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_CV_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_ACCOUNT_FORM_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_FORM_PAGE, value: false });
    }
}
export const setSelectedBookAction = (book) => {
    store.dispatch({
        type: SET_SELECTED_BOOK,
        payload: book,
    });
};

export const setPaidBookAction = (bookId) => {
    store.dispatch({
        type: SET_PAID_BOOK,
        payload: bookId,
    });
};

/**
 * Course History 
 */

export const switchCourseHistoryPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_COURSE_HISTORY_PAGE, value: data });
        store.dispatch({ type: SET_COURSE_HISTORY_HOME, value: data });
        store.dispatch({ type: SET_PROFIL_PAGE, value: false });
        store.dispatch({ type: SET_MESSAGE_PAGE, value: false });
        store.dispatch({ type: SET_COURSE_PAGE, value: false });
        store.dispatch({ type: SET_HOME_PAGE, value: false });

        //Sub page
        store.dispatch({ type: SET_COURSE_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_COURSE_HISTORY_PAGE, value: false });
    }
}


export const switchCourseDetailsAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_COURSE_DETAIL_PAGE, value: data });
        store.dispatch({ type: SET_COURSE_HISTORY_HOME, value: false });
        store.dispatch({ type: SET_PARENT_COURSE_HISTORY_PAGE, value: false });
    }
}

export const switchParentCourseHistoryAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_COURSE_HISTORY_PAGE, value: data });
        store.dispatch({ type: SET_COURSE_HISTORY_HOME, value: false });
        store.dispatch({ type: SET_COURSE_DETAIL_PAGE, value: false });
    }
}

/**
 * Course 
 */
export const switchCoursePageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_COURSE_PAGE, value: data });
        store.dispatch({ type: SET_COURSE_HOME, value: data });
        store.dispatch({ type: SET_HOME_PAGE, value: false });
        store.dispatch({ type: SET_COURSE_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_PROFIL_PAGE, value: false });
        store.dispatch({ type: SET_MESSAGE_PAGE, value: false });

        //Sub page

        store.dispatch({ type: SET_VIDEO_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_COURSE_SEARCH, value: false });
        store.dispatch({ type: SET_COURSE_PARENT_PAGE, value: false });
    }
}

export const switchCourseVideoAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_VIDEO_PAGE, value: data })
        store.dispatch({ type: SET_COURSE_HOME, value: data });
        store.dispatch({ type: SET_COURSE_HOME, value: false });
        store.dispatch({ type: SET_ADVANCE_COURSE_SEARCH, value: false });
        store.dispatch({ type: SET_COURSE_PARENT_PAGE, value: false });
    }
}

export const switchAdvanceCourseSearchAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ADVANCE_COURSE_SEARCH, value: data });
        store.dispatch({ type: SET_COURSE_HOME, value: false });
        store.dispatch({ type: SET_VIDEO_PAGE, value: false });
        store.dispatch({ type: SET_COURSE_PARENT_PAGE, value: false });
    }
}

export const switchCourseParentAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_COURSE_PARENT_PAGE, value: data });
        store.dispatch({ type: SET_COURSE_HOME, value: false });
        store.dispatch({ type: SET_VIDEO_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_COURSE_SEARCH, value: false });
    }
}
/**
 * Message 
 */

export const switchMessagePageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_MESSAGE_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: data });
        store.dispatch({ type: SET_COURSE_PAGE, value: false });
        store.dispatch({ type: SET_HOME_PAGE, value: false });
        store.dispatch({ type: SET_COURSE_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_PROFIL_PAGE, value: false });

        //Sub Page
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: false });
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: false });
    }
}
export const switchChatPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: false });
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: false });
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: false });
    }
}
export const switchAdvanceMessageFilterPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: false });
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: false });
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: false });
    }
}
export const switchContactPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CONTACT_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: false });
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: false });
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: false });
    }
}
export const switchContactProfilePageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: false });
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: false });
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: false });
    }
}
export const switchContactNotificationPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: false });
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: false });
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: false });
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: false });
    }
}
export const switchChatMediaPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: false });
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: false });
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: false });
    }
}
export const switchArchivedMessagePageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ARCHIVED_MESSAGE_PAGE, value: data });
        store.dispatch({ type: SET_MESSAGE_HOME, value: false });
        store.dispatch({ type: SET_CHAT_INDEX_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_MESSAGE_FILTER_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_CONTACT_PROFILE_PAGE, value: false });
        store.dispatch({ type: SET_MEDIA_CHAT_PAGE, value: false });
    }
}

/**
 * Profil 
 */

export const switchProfilPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PROFIL_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_HOME, value: data });

        //navigation page
        store.dispatch({ type: SET_MESSAGE_PAGE, value: false });
        store.dispatch({ type: SET_COURSE_PAGE, value: false });
        store.dispatch({ type: SET_HOME_PAGE, value: false });
        store.dispatch({ type: SET_COURSE_HISTORY_PAGE, value: false });

        //Sub page
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}


export const switchProfilUpdateInfoAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: data });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}

export const switchFaqsPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_FAQS_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}
export const switchKycPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_KYC_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}

export const switchTransactionHistoryPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}
export const switchUpdateNotifyPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}
export const switchUpdateLanguagePageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}
export const switchAddDescriptionPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}
export const switchUpdateAuthentificationPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
    }
}
export const switchUpdatePasswordPageAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: data });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
    }
}
export const switchSupportPageFromProfilAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SUPPORT_HOME, value: data });
        store.dispatch({ type: SET_HOME_PAGE, value: data });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_PROFIL_UPDATE_INFO, value: false });
        store.dispatch({ type: SET_PROFIL_HOME, value: false });
        store.dispatch({ type: SET_FAQS_PAGE, value: false });
        store.dispatch({ type: SET_KYC_PAGE, value: false });
        store.dispatch({ type: SET_TRANSACTION_HISTORY_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_NOTIFICATION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_LANGUAGE_PAGE, value: false });
        store.dispatch({ type: SET_ADD_DESCRIPTION_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_PASSWORD_PAGE, value: false });
        store.dispatch({ type: SET_UPDATE_AUTHENTIFICATION_PAGE, value: false });
    }
}


/**
 * Support 
 */
export const switchSupportHomeAction = (data) => {
    switchHomePageAction(true);
    //switchHomeParentAction(true)
    if (data) {
        store.dispatch({ type: SET_SUPPORT_HOME, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
    }
}

export const switchSupportChatAction = (data) => {
    switchHomePageAction(true);
    //switchHomeParentAction(true)
    if (data) {
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SUPPORT_CHAT, value: data });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: false });
    }
}

/**
 * Parent
 */
export const switchHomeParentAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SYS_HOME, value: data });
        store.dispatch({ type: SET_HOME_PARENT, value: data });

        //sub page
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });         
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });

        //sub sub page

        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
    }
}

export const switchRegister1Action = (data) => {
    switchHomePageAction(true);
    if (data) {
        store.dispatch({ type: SET_REGISTER_1, value: data });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: false });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_HOME_PARENT, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false })
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}

export const switchRegister2Action = (data) => {
    switchHomePageAction(true);
    if (data) {
        store.dispatch({ type: SET_REGISTER_2, value: data });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: false });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_HOME_PARENT, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}

export const switchSchoolSelectionParentAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: data });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: false });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_HOME_PARENT, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchSchoolDetailsParentAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: false});
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: false });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_HOME_PARENT, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchParentUploadDocumentAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false })
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false});
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: false });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_HOME_PARENT, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });;
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchParentAdmissionTypeAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false })
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false});
        store.dispatch({ type: SET_PARENT_UPLOAD_DOCUMENT_PAGE, value: false });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_HOME_PARENT, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });;
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
    }
}
export const switchStudentMenuAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchStudentAgendaAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}

export const switchStudentAbsencesAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchStudentInfosAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchStudentPlanningAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchStudentProgressAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchStudentActivitiesAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: data });
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}

export const switchTeacherListAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}

export const switchStudentHomeworkAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchSchoolFeesAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchStudentRemarksAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchAdvanceRemarkSearchAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchTransportStudentAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchHostingStudentAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchTeacherInfosAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}

export const switchParentStudentProjectAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchParentStudentLibrarytAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchParentStudentBookDetailAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchParentStudentBookShopAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchParentStudentBookShopDetailAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: false });
    }
}
export const switchParentStudentCvAction = (data) => {
    if (data) {
        store.dispatch({ type: SET_PARENT_STUDENT_CV_PAGE, value: data });
        store.dispatch({ type: SET_SCHOOL_DETAILS_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_REGISTER_1, value: false });
        store.dispatch({ type: SET_REGISTER_2, value: false });
        store.dispatch({ type: SET_SCHOOL_SELECTION_PARENT_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_MENU_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_AGENDA_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ABSENCES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PLANNING_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_PROGRESS_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_ACTIVITIES_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_LIST_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_HOMEWORK_PAGE, value: false });
        store.dispatch({ type: SET_SCHOOL_FEES_PAGE, value: false });
        store.dispatch({ type: SET_STUDENT_REMARKS_PAGE, value: false });
        store.dispatch({ type: SET_ADVANCE_REMARKS_SEARCH_PAGE, value: false });
        store.dispatch({ type: SET_TRANSPORT_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_HOSTING_STUDENT_PAGE, value: false });
        store.dispatch({ type: SET_TEACHER_INFOS_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_PROJECT_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_LIBRAIRY_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_DETAIL_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_PAGE, value: false });
        store.dispatch({ type: SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS, value: false });
    }
}
/**
 * Notif 
 */
export const switchNotifHomeAction = (data) => {
    switchHomePageAction(true);
    //switchHomeParentAction(true)
    if (data) {
        store.dispatch({ type: SET_SYS_HOME, value: false });
        store.dispatch({ type: SET_NOTIF_HOME, value: data });
        store.dispatch({ type: SET_SUPPORT_HOME, value: false });
    }
}