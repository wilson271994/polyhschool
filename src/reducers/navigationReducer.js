import {
    SET_SUPPORT_CHAT, SET_SUPPORT_HOME,
    SET_ACTIVATION_FORM, SET_COURSE_PAGE, SET_VIDEO_PAGE,
    SET_HOME_PAGE, SET_LOGIN_FORM, SET_CHOOSE_FORM, SET_COURSE_HISTORY_PAGE,
    SET_COURSE_DETAIL_PAGE, SET_MESSAGE_PAGE, SET_NOTIF_HOME, SET_PROFIL_HOME,
    SET_PROFIL_PAGE, SET_PROFIL_UPDATE_INFO, SET_COURSE_HISTORY_HOME, SET_MESSAGE_HOME,
    SET_SIGNUP1_FORM, SET_SIGNUP2_FORM, SET_SIGNUP3_FORM, SET_SYS_HOME, SET_COURSE_HOME, SET_HOME_PARENT, 
    SET_REGISTER_1, SET_REGISTER_2, SET_SCHOOL_SELECTION_PAGE, SET_SCHOOL_DETAILS_PAGE, 
    SET_SCHOOL_SELECTION_PARENT_PAGE, SET_SCHOOL_DETAILS_PARENT_PAGE,
    SET_STUDENT_MENU_PAGE,
    SET_STUDENT_ABSENCES_PAGE,
    SET_STUDENT_INFOS_PAGE,
    SET_STUDENT_PLANNING_PAGE,
    SET_STUDENT_PROGRESS_PAGE,
    SET_TEACHER_LIST_PAGE,
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
    SET_COURSE_PARENT_PAGE,
    SET_PARENT_COURSE_HISTORY_PAGE,
    SET_SCHOOL_SELECT_FORM_PAGE,
    SET_CHOOSE_ACCOUNT_FORM_PAGE,
    SET_SCHOOL_DETAILS_FORM_PAGE,
    SET_NEW_STUDENT_FORM_PAGE,
    SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE,
    SET_PARENT_UPLOAD_DOCUMENT_PAGE,
    SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE,
    SET_NEW_UPLOAD_DOCUMENT_PAGE,
    TOGGLE_FOOTER_VISIBILITY,
    TOGGLE_HEADER_VISIBILITY,
} from "./actions/types"


const initialState = {
    is_home_page                            : true,
    is_profil_page                          : false,
    is_message_page                         : false,
    is_course_page                          : false,
    is_course_history_page                  : false,

    //auth
    is_login_form                           : true,
    is_choose_form                          : false,
    is_signup1_form                         : false,
    is_signup2_form                         : false,
    is_signup3_form                         : false,          
    is_activation_form                      : false,
    is_school_admission_page                : false,
    is_upload_admission_document_page       : false,

    //Home
    is_sys_home                             : true,
    is_menu_student_page                    : false,
    is_child_infos_page                     : false,
    is_list_teacher_page                    : false,
    is_planning_student_page                : false,
    is_absences_student_page                : false,
    is_remark_student_page                  : false,
    is_homework_student_page                : false,
    is_fees_school_page                     : false,
    is_student_progression_page             : false,
    is_activities_student_page              : false,
    is_agenda_student_page                  : false,
    is_advance_remarks_filter_page          : false,
    is_student_transport_page               : false,
    is_student_hosting_page                 : false,
    is_infos_teacher_page                   : false,
    is_student_project_page                 : false,
    is_student_library_page                 : false,
    is_student_book_details_page            : false,
    is_student_book_shop_page               : false,
    is_student_book_shop_details_page       : false,
    is_student_cv_page                      : false,

    //Parent
    is_home_parent                          : false,
    is_register_1                           : false,
    is_register_2                           : false,
    is_school_details_parent_page           : false,
    is_school_selection_parent_page         : false,
    is_parent_choose_admission_type         : false,
    is_parent_upload_document_page          : false,
    is_student_menu_page                    : false,
    is_student_infos_page                   : false,
    is_student_absences_page                : false,
    is_student_planning_page                : false,
    is_student_progress_page                : false,
    is_teacher_list_page                    : false,
    is_student_homework_page                : false,
    is_school_fees_page                     : false,
    is_student_remarks_page                 : false,
    is_advance_remarks_search_page          : false,
    is_transport_student_page               : false,
    is_hosting_student_page                 : false,
    is_teacher_infos_page                   : false,
    is_parent_student_project_page          : false,
    is_parent_student_library_page          : false,
    is_parent_student_book_detail_page      : false,
    is_parent_student_book_shop_page        : false,
    is_parent_student_book_shop_detail_page : false,
    is_parent_student_cv_page               : false,

    //Message
    is_message_home                         : true,
    is_chat_index_page                      : false,
    is_advance_message_search_page          : false,
    is_contact_page                         : false,
    is_contact_profile_page                 : false,
    is_contact_notification_page            : false,
    is_media_chat_page                      : false,
    is_archived_message_page                : false,

    //Courses
    is_course_home                          : true,
    is_video_page                           : false,
    is_advance_course_search                : false,
    is_course_parent_page                   : false,

    //Course_history
    is_course_history_home                  : true,
    is_course_detail_page                   : false,
    is_parent_course_history_page           : false,

    //Home_notif
    is_notif_home                           : false,


    //Home Support
    is_support_home                         : false,
    is_support_chat                         : false,

    //Service
    is_service_home                         : false,

    //Profil
    is_profil_home                          : true,
    is_profil_update_info                   : false,
    is_profil_update_notif                  : false,
    is_profil_update_kyc                    : false,
    is_profil_faq                           : false,
    is_profil_referal                       : false,
    is_transaction_history                  : false,
    is_update_language_page                 : false,
    is_add_description_page                 : false,
    is_update_authentification_page         : false,
    is_update_password_page                 : false,

    //School selection
    is_school_selection_page                : false,
    is_school_details_page                  : false,
    //new form
    is_school_select_form_page              : false,
    is_school_details_form_page             : false,
    is_choose_account_form_page             : false,
    is_new_student_form_page                : false,
    is_new_choose_admission_type_page       : false,
    is_new_upload_document_page             : false,


    selectedBook                            : null,
    paidBooks                               : {},

    //Footer visibility
    is_visible_footer                       : true,

    //HEader visibility
    is_visible_header                       :true,
}

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME_PAGE:
            return {
                ...state,
                is_home_page: action.value
            }

        case SET_PROFIL_PAGE:
            return {
                ...state,
                is_profil_page: action.value
            }

        //Auth
        case SET_LOGIN_FORM:
            return {
                ...state,
                is_login_form: action.value
            }
        case SET_CHOOSE_FORM:
            return {
                ...state,
                is_choose_form: action.value
            }
        case SET_SIGNUP1_FORM:
            return {
                ...state,
                is_signup1_form: action.value
            }
        case SET_SIGNUP2_FORM:
            return {
                ...state,
                is_signup2_form: action.value
            }
        case SET_SIGNUP3_FORM:
            return {
                ...state,
                is_signup3_form: action.value
            }
        case SET_ACTIVATION_FORM:
            return {
                ...state,
                is_activation_form: action.value
            }

        //Home
        case SET_SYS_HOME:
            return {
                ...state,
                is_sys_home: action.value
            } 
        case SET_MENU_STUDENT_PAGE:
            return {
                ...state,
                is_menu_student_page: action.value
            }
        case SET_CHILD_INFOS_PAGE:
            return {
                ...state,
                is_child_infos_page: action.value
            }
        case SET_LIST_TEACHER_PAGE:
            return {
                ...state,
                is_list_teacher_page: action.value
            }
        case SET_PLANNING_STUDENT_PAGE:
            return {
                ...state,
                is_planning_student_page: action.value
            }
        case SET_ABSENCES_STUDENT_PAGE:
            return {
                ...state,
                is_absences_student_page: action.value
            }
        case SET_REMARK_STUDENT_PAGE:
            return {
                ...state,
                is_remark_student_page: action.value
            }
        case SET_HOMEWORK_STUDENT_PAGE:
            return {
                ...state,
                is_homework_student_page: action.value
            }
        case SET_FEES_SCHOOL_PAGE:
            return {
                ...state,
                is_fees_school_page: action.value
            }
        case SET_STUDENT_PROGRESSION_PAGE:
            return {
                ...state,
                is_student_progression_page: action.value
            }
        case SET_ACTIVITIES_STUDENT_PAGE:
            return {
                ...state,
                is_activities_student_page: action.value
            }
        case SET_AGENDA_STUDENT_PAGE:
            return{
                ...state,
                is_agenda_student_page: action.value
            }
        case SET_ADVANCE_REMARKS_FILTER_PAGE:
            return {
                ...state,
                is_advance_remarks_filter_page: action.value
            }
        case SET_STUDENT_TRANSPORT_PAGE:
            return {
                ...state,
                is_student_transport_page: action.value
            }
        case SET_STUDENT_HOSTING_PAGE:
            return {
                ...state,
                is_student_hosting_page: action.value
            }
        case SET_INFOS_TEACHER_PAGE:
            return {
                ...state,
                is_infos_teacher_page: action.value
            } 
        case SET_STUDENT_PROJECT_PAGE:
            return {
                ...state,
                is_student_project_page: action.value
            }
        case SET_STUDENT_LIBRARY_PAGE:
            return {
                ...state,
                is_student_library_page: action.value
            }       
        case SET_STUDENT_BOOK_DETAILS_PAGE:
            return {
                ...state,
                is_student_book_details_page: action.value
            }
        case SET_STUDENT_BOOK_SHOP_PAGE:
            return {
                ...state,
                is_student_book_shop_page: action.value
            }
        case SET_STUDENT_BOOK_SHOP_DETAILS_PAGE:
            return{
                ...state,
                is_student_book_shop_details_page: action.value
            }
        case SET_STUDENT_CV_PAGE:
            return {
                ...state,
                is_student_cv_page: action.value
            }
        case SET_SELECTED_BOOK:
            return {
                ...state,
                selectedBook: action.payload
            }
        case SET_PAID_BOOK:
            return{
                ...state,
                paidBooks: {
                    ...state.paidBooks,
                    [action.payload] : true,
                },
            };

        //Home Notif
        case SET_NOTIF_HOME:
            return {
                ...state,
                is_notif_home: action.value
            }

        //Home Support
        case SET_SUPPORT_HOME:
            return {
                ...state,
                is_support_home: action.value
            }
        case SET_SUPPORT_CHAT:
            return {
                ...state,
                is_support_chat: action.value
            }

        //Home Parent
        case SET_HOME_PARENT:
            return {
                ...state,
                is_home_parent: action.value
            }

        case SET_REGISTER_1:
            return {
                ...state,
                is_register_1: action.value
            }

        case SET_REGISTER_2:
            return {
                ...state,
                is_register_2: action.value
            }
        case SET_SCHOOL_SELECTION_PARENT_PAGE:
            return {
                ...state,
                is_school_selection_parent_page: action.value
            }
        case SET_SCHOOL_DETAILS_PARENT_PAGE:
            return{
                ...state,
                is_school_details_parent_page: action.value
            }
        case SET_STUDENT_MENU_PAGE:
            return {
                ...state,
                is_student_menu_page: action.value
            }
        case SET_STUDENT_ABSENCES_PAGE:
            return {
                ...state,
                is_student_absences_page: action.value
            }
        case SET_STUDENT_INFOS_PAGE:
            return {
                ...state,
                is_student_infos_page: action.value
            }
        case SET_STUDENT_PLANNING_PAGE:
            return {
                ...state,
                is_student_planning_page: action.value
            }
        case SET_STUDENT_PROGRESS_PAGE:
            return {
                ...state,
                is_student_progress_page: action.value
            }
        case SET_TEACHER_LIST_PAGE:
            return {
                ...state,
                is_teacher_list_page: action.value
            }
        case SET_SCHOOL_FEES_PAGE:
            return {
                ...state,
                is_school_fees_page: action.value
            }
        case SET_STUDENT_REMARKS_PAGE:
            return {
                ...state,
                is_student_remarks_page: action.value
            }
        case SET_ADVANCE_REMARKS_SEARCH_PAGE:
            return {
                ...state,
                is_advance_remarks_search_page: action.value
            }
        case SET_STUDENT_TRANSPORT_PAGE:
            return {
                ...state,
                is_student_transport_page: action.value
            }
        case SET_TRANSPORT_STUDENT_PAGE:
            return {
                ...state,
                is_transport_student_page: action.value
            }
        case SET_HOSTING_STUDENT_PAGE:
            return {
                ...state,
                is_hosting_student_page: action.value
            }
        case SET_TEACHER_INFOS_PAGE:
            return {
                ...state,
                is_teacher_infos_page: action.value
            }
        case SET_PARENT_STUDENT_PROJECT_PAGE:
            return {
                ...state,
                is_parent_student_project_page: action.value
            }
        case SET_PARENT_STUDENT_LIBRAIRY_PAGE:
            return {
                ...state,
                is_parent_student_library_page : action.value
            }
        case SET_PARENT_STUDENT_BOOK_DETAIL_PAGE:
            return {
                ...state,
                is_parent_student_book_detail_page: action.value
            }
        case SET_PARENT_STUDENT_BOOK_SHOP_PAGE:
            return {
                ...state,
                is_parent_student_book_shop_page : action.value
            }
        case SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS:
            return {
                ...state,
                is_parent_student_book_shop_detail_page : action.value
            }
        case SET_PARENT_STUDENT_CV_PAGE:
            return {
                ...state,
                is_parent_student_cv_page: action.value
            }
        case SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE:
            return {
                ...state,
                is_parent_choose_admission_type: action.value
            }
        case SET_PARENT_UPLOAD_DOCUMENT_PAGE:
            return {
                ...state,
                is_parent_upload_document_page: action.value
            }
        //Profil
        case SET_PROFIL_HOME:
            return {
                ...state,
                is_profil_home: action.value
            }
        case SET_PROFIL_UPDATE_INFO:
            return {
                ...state,
                is_profil_update_info: action.value
            }
        case SET_FAQS_PAGE:
            return {
                ...state,
                is_profil_faq: action.value
            }
        case SET_KYC_PAGE:
            return {
                ...state,
                is_profil_update_kyc: action.value
            }
        case SET_TRANSACTION_HISTORY_PAGE:
            return {
                ...state,
                is_transaction_history: action.value
            }
        case SET_UPDATE_NOTIFICATION_PAGE:
            return {
                ...state,
                is_profil_update_notif: action.value
            }
        case SET_UPDATE_LANGUAGE_PAGE:
            return {
                ...state,
                is_update_language_page: action.value
            }
        case SET_ADD_DESCRIPTION_PAGE:
            return {
                ...state,
                is_add_description_page: action.value
            }
        case SET_UPDATE_AUTHENTIFICATION_PAGE:
            return {
                ...state,
                is_update_authentification_page : action.value
            }
        case SET_UPDATE_PASSWORD_PAGE:
            return {
                ...state,
                is_update_password_page : action.value
            }

        //Course
        case SET_COURSE_PAGE:
            return {
                ...state,
                is_course_page: action.value
            }
        case SET_COURSE_HOME:
            return {
                ...state,
                is_course_home: action.value
            }
        case SET_VIDEO_PAGE:
            return {
                ...state,
                is_video_page: action.value
            }

        //Message
        case SET_MESSAGE_PAGE:
            return {
                ...state,
                is_message_page: action.value
            }
        case SET_MESSAGE_HOME:
            return {
                ...state,
                is_message_home: action.value
            }
        case SET_CHAT_INDEX_PAGE:
            return {
                ...state,
                is_chat_index_page: action.value
            }
        case SET_ADVANCE_MESSAGE_FILTER_PAGE:
            return {
                ...state,
                is_advance_message_search_page: action.value
            }
        
        case SET_CONTACT_PAGE:
            return {
                ...state,
                is_contact_page: action.value
            }
        case SET_CONTACT_PROFILE_PAGE:
            return {
                ...state,
                is_contact_profile_page: action.value
            }
        case SET_CONTACT_NOTIFICATION_PAGE:
            return{
                ...state,
                is_contact_notification_page : action.value
            }
        case SET_MEDIA_CHAT_PAGE:
            return {
                ...state,
                is_media_chat_page : action.value
            }

        case SET_ARCHIVED_MESSAGE_PAGE:
            return {
                ...state,
                is_archived_message_page : action.value
            }

        //Course_history
        case SET_COURSE_HISTORY_PAGE:
            return {
                ...state,
                is_course_history_page: action.value
            }
        case SET_COURSE_HISTORY_HOME:
            return {
                ...state,
                is_course_history_home: action.value
            }
        case SET_COURSE_DETAIL_PAGE:
            return {
                ...state,
                is_course_detail_page: action.value
            }
        case SET_PARENT_COURSE_HISTORY_PAGE:
            return {
                ...state,
                is_parent_course_history_page: action.value,
            }



        case SET_ADVANCE_COURSE_SEARCH:
            return {
                ...state,
                is_advance_course_search: action.value
            }
        case SET_COURSE_PARENT_PAGE:
            return {
                ...state,
                is_course_parent_page: action.value
            }


        //School selection
        case SET_SCHOOL_SELECTION_PAGE:
            return {
                ...state,
                is_school_selection_page: action.value
                }
        case SET_SCHOOL_DETAILS_PAGE:
            return {
                ...state,
                is_school_details_page: action.value
            }
        case SET_SCHOOL_SELECT_FORM_PAGE:
            return {
                ...state,
                is_school_select_form_page: action.value
            }
        case SET_CHOOSE_ACCOUNT_FORM_PAGE:
            return {
                ...state,
                is_choose_account_form_page: action.value
            }
        case SET_SCHOOL_DETAILS_FORM_PAGE:
            return {
                ...state,
                is_school_details_form_page: action.value
            }
        case SET_NEW_STUDENT_FORM_PAGE:
            return {
                ...state,
                is_new_student_form_page: action.value
            }
        case SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE:
            return {
                ...state,
                is_new_choose_admission_type_page: action.value
            }
        case SET_NEW_UPLOAD_DOCUMENT_PAGE:
            return {
                ...state,
                is_new_upload_document_page: action.value
            }

        //Toggle footer page visibility
        case TOGGLE_FOOTER_VISIBILITY:
            return {
                ...state,
                is_visible_footer: action.value
            }

        //Toggle header page visibility
        case TOGGLE_HEADER_VISIBILITY:
            return {
                ...state,
                is_visible_header: action.value
            }
        default:
            return state

    }
}

export default navigationReducer;