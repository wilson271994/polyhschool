// MANAGE NOTIFIACATION
export const IS_LOADING                                     = 'IS_LOADING';
export const IS_PENDING_ACTION                              = 'IS_PENDING_ACTION';
export const IS_LOADING_ZONE                                = 'IS_LOADING_ZONE';
export const IS_LOADING_CHAT                                = 'IS_LOADING_CHAT';
export const IS_PIN_APPROUVED                               = 'IS_PIN_APPROUVED';
export const IS_LOADING_LINK                                = 'IS_LOADING_LINK';
export const IS_NETWORK                                     = 'IS_NETWORK';
export const INFO_NETWORK                                   = 'INFO_NETWORK';

// MANAGE NAVIGATION
export const IS_HEADER                                      = 'IS_HEADER';
export const PAGE_TITLE                                     = 'PAGE_TITLE';
export const ROOT_NAVIGATION                                = 'ROOT_NAVIGATION';
export const IS_VISIBLE_POST                                = 'IS_VISIBLE_POST';

// MANAGE AUTHENTIFICATION
export const USER_INFOS                                     = 'USER_INFOS'; 
export const IS_AUTHENTICATED                               = 'IS_AUTHENTICATED';
export const USER_TOKEN                                     = 'USER_TOKEN';
export const AUTH_ERROR_MESSAGE                             = 'AUTH_ERROR_MESSAGE';
export const IS_AUTH_ERROR                                  = 'IS_AUTH_ERROR';
export const SITE_INFOS                                     = 'SITE_INFOS';
export const SCHOOL_INFOS                                   = 'SCHOOL_INFOS';
export const STUDENT_INFOS                                  = 'STUDENT_INFOS';
export const IS_PARENT                                      = 'IS_PARENT';
export const IS_ADMISSION_APPROVED                          = 'IS_ADMISSION_APPROVED';
export const IS_SCHOOL_USER                                 = 'IS_SCHOOL_USER'; 
export const GARDIAN_INFOS                                  = 'GARDIAN_INFOS';
export const SCHOOL_NOTIFICATION_LIST                       = 'SCHOOL_NOTIFICATION_LIST';

//MANAGE NOTIFICATION
export const IS_ALERT                                       = 'IS_ALERT';
export const ALERT_TYPE                                     = 'ALERT_TYPE';
export const ALERT_TITLE                                    = 'ALERT_TITLE';
export const ALERT_SUBTITLE                                 = 'ALERT_SUBTITLE';
export const ALERT_CONFIRM                                  = 'ALERT_CONFIRM';
export const ALERT_CANCEL                                   = 'ALERT_CANCEL';
export const COUNT_NEW_NOTIFICATION                         = 'COUNT_NEW_NOTIFICATION';
export const COUNT_NEW_MESSAGE                              = 'COUNT_NEW_MESSAGE';

//NAVIGATION REDUCER STATE
export const SET_LOGIN_PAGE                                 = 'SET_LOGIN_PAGE';
export const SET_SING_UP_PAGE                               = 'SET_SING_UP_PAGE';
export const SET_CONFIRMATION_PAGE                          = 'SET_CONFIRMATION_PAGE'; 
export const SET_HOME_PAGE                                  = 'SET_HOME_PAGE';
export const SET_PROFIL_PAGE                                = 'SET_PROFIL_PAGE';

//Login Routing
export const SET_LOGIN_FORM                                 = 'SET_LOGIN_FORM';
export const SET_CHOOSE_FORM                                = 'SET_CHOOSE_FORM';
export const SET_SIGNUP1_FORM                               = 'SET_SIGNUP1_FORM';
export const SET_SIGNUP2_FORM                               = 'SET_SIGNUP2_FORM';
export const SET_SIGNUP3_FORM                               = 'SET_SIGNUP3_FORM';
export const SET_ACTIVATION_FORM                            = 'SET_ACTIVATION_FORM';
export const SET_SELECTED_SCHOOL                            = 'SET_SELECTED_SCHOOL';
export const SET_SCHOOL_ADMISSION_FORM                      = 'SET_SCHOOL_ADMISSION_FORM';
export const SET_UPLOAD_ADMISSION_DOCUMENT_PAGE             = 'SET_UPLOAD_ADMISSION_DOCUMENT_PAGE';

//Home Routing
export const SET_SYS_HOME                                   = 'SET_SYS_HOME';
export const SET_CHILD_INFOS_PAGE                           = 'SET_CHILD_INFOS_PAGE';
export const SET_MENU_STUDENT_PAGE                          = 'SET_MENU_STUDENT_PAGE';
export const SET_LIST_TEACHER_PAGE                          = 'SET_LIST_TEACHER_PAGE';
export const SET_PLANNING_STUDENT_PAGE                      = 'SET_PLANNING_STUDENT_PAGE';
export const SET_ABSENCES_STUDENT_PAGE                      = 'SET_ABSENCES_STUDENT_PAGE';
export const SET_REMARK_STUDENT_PAGE                        = 'SET_REMARK_STUDENT_PAGE';
export const SET_HOMEWORK_STUDENT_PAGE                      = 'SET_HOMEWORK_STUDENT_PAGE';
export const SET_FEES_SCHOOL_PAGE                           = 'SET_FEES_SCHOOL_PAGE';
export const SET_STUDENT_PROGRESSION_PAGE                   = 'SET_STUDENT_PROGRESSION_PAGE';
export const SET_ACTIVITIES_STUDENT_PAGE                    = 'SET_ACTIVITIES_STUDENT_PAGE';
export const SET_AGENDA_STUDENT_PAGE                        = 'SET_AGENDA_STUDENT_PAGE';
export const SET_ADVANCE_REMARKS_FILTER_PAGE                = 'SET_ADVANCE_REMARKS_FILTER_PAGE';
export const SET_STUDENT_TRANSPORT_PAGE                     = 'SET_STUDENT_TRANSPORT_PAGE';
export const SET_STUDENT_HOSTING_PAGE                       = 'SET_STUDENT_HOSTING_PAGE';
export const SET_INFOS_TEACHER_PAGE                         = 'SET_INFOS_TEACHER_PAGE';
export const SET_STUDENT_PROJECT_PAGE                       = 'SET_STUDENT_PROJECT_PAGE';
export const SET_STUDENT_LIBRARY_PAGE                       = 'SET_STUDENT_LIBRARY_PAGE';
export const SET_STUDENT_BOOK_DETAILS_PAGE                  = 'SET_STUDENT_BOOK_DETAILS_PAGE';
export const SET_STUDENT_BOOK_SHOP_PAGE                     = 'SET_STUDENT_BOOK_SHOP_PAGE';
export const SET_STUDENT_BOOK_SHOP_DETAILS_PAGE             = 'SET_STUDENT_BOOK_SHOP_DETAILS_PAGE';
export const SET_STUDENT_CV_PAGE                            = 'SET_STUDENT_CV_PAGE';
export const SET_SELECTED_BOOK                              = 'SET_SELECTED_BOOK';
export const SET_PAID_BOOK                                  = 'SET_PAID_BOOK';

//Home Notification
export const SET_NOTIF_HOME                                 = 'SET_NOTIF_HOME';

//Home Support
export const SET_SUPPORT_HOME                               = 'SET_SUPPORT_HOME';
export const SET_SUPPORT_CHAT                               = 'SET_SUPPORT_CHAT';

//Home Parent
export const SET_HOME_PARENT                                = 'SET_HOME_PARENT';
export const SET_REGISTER_1                                 = 'SET_REGISTER_1';
export const SET_REGISTER_2                                 = 'SET_REGISTER_2';
export const SET_SCHOOL_SELECTION_PARENT_PAGE               = 'SET_SCHOOL_SELECTION_PARENT_PAGE';
export const SET_SCHOOL_DETAILS_PARENT_PAGE                 = 'SET_SCHOOL_DETAILS_PARENT_PAGE';
export const SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE          = 'SET_CHOOSE_PARENT_ADMISSION_TYPE_PAGE';
export const SET_PARENT_UPLOAD_DOCUMENT_PAGE                = 'SET_PARENT_UPLOAD_DOCUMENT_PAGE';
export const SET_STUDENT_MENU_PAGE                          = 'SET_STUDENT_MENU_PAGE';
export const SET_STUDENT_INFOS_PAGE                         = 'SET_STUDENT_INFOS_PAGE';
export const SET_STUDENT_ABSENCES_PAGE                      = 'SET_STUDENT_ABSENCES_PAGE';
export const SET_STUDENT_PLANNING_PAGE                      = 'SET_STUDENT_PLANNING_PAGE';
export const SET_STUDENT_PROGRESS_PAGE                      = 'SET_STUDENT_PROGRESS_PAGE';
export const SET_STUDENT_ACTIVITIES_PAGE                    = 'SET_STUDENT_ACTIVITIES_PAGE';
export const SET_TEACHER_LIST_PAGE                          = 'SET_TEACHER_LIST_PAGE';
export const SET_SCHOOL_FEES_PAGE                           = 'SET_SCHOOL_FEES_PAGE';
export const SET_STUDENT_REMARKS_PAGE                       = 'SET_STUDENT_REMARKS_PAGE';
export const SET_TRANSPORT_STUDENT_PAGE                     = 'SET_TRANSPORT_STUDENT_PAGE';
export const SET_HOSTING_STUDENT_PAGE                       = 'SET_HOSTING_STUDENT_PAGE';
export const SET_ADVANCE_REMARKS_SEARCH_PAGE                = 'SET_ADVANCE_REMARKS_SEARCH_PAGE';
export const SET_TEACHER_INFOS_PAGE                         = 'SET_TEACHER_INFOS_PAGE';
export const SET_PARENT_STUDENT_PROJECT_PAGE                = 'SET_PARENT_STUDENT_PROJECT_PAGE';
export const SET_PARENT_STUDENT_LIBRAIRY_PAGE               = 'SET_PARENT_STUDENT_LIBRAIRY_PAGE';
export const SET_PARENT_STUDENT_BOOK_DETAIL_PAGE            = 'SET_PARENT_STUDENT_BOOK_DETAIL_PAGE';
export const SET_PARENT_STUDENT_BOOK_SHOP_PAGE              = 'SET_PARENT_STUDENT_BOOK_SHOP_PAGE';
export const SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS    = 'SET_PARENT_STUDENT_BOOK_SHOP_DETAIL_DETAILS';
export const SET_PARENT_STUDENT_CV_PAGE                     = 'SET_PARENT_STUDENT_CV_PAGE';

//Courses Routing
export const SET_COURSE_PAGE                                = 'SET_COURSE_PAGE';
export const SET_COURSE_HOME                                = 'SET_COURSE_HOME';
export const SET_VIDEO_PAGE                                 = 'SET_VIDEO_PAGE';
export const SET_ADVANCE_COURSE_SEARCH                      = 'SET_ADVANCE_COURSE_SEARCH';
export const SET_COURSE_PARENT_PAGE                         = 'SET_COURSE_PARENT_PAGE';

//Course-history Routing
export const SET_COURSE_HISTORY_PAGE                        = 'SET_COURSE_HISTORY_PAGE';
export const SET_COURSE_HISTORY_HOME                        = 'SET_COURSE_HISTORY_HOME'
export const SET_COURSE_DETAIL_PAGE                         = 'SET_COURSE_DETAIL_PAGE';
export const SET_PARENT_COURSE_HISTORY_PAGE                 = 'SET_PARENT_COURSE_HISTORY_PAGE';

//Message Routing
export const SET_MESSAGE_PAGE                               = 'SET_MESSAGE_PAGE';
export const SET_MESSAGE_HOME                               = 'SET_MESSAGE_HOME';
export const SET_CHAT_INDEX_PAGE                            = 'SET_CHAT_INDEX_PAGE';
export const SET_ADVANCE_MESSAGE_FILTER_PAGE                = 'SET_ADVANCE_MESSAGE_FILTER_PAGE';
export const SET_CONTACT_PAGE                               = 'SET_CONTACT_PAGE';
export const SET_CONTACT_PROFILE_PAGE                       = 'SET_CONTACT_PROFILE_PAGE';
export const SET_CONTACT_NOTIFICATION_PAGE                  = 'SET_CONTACT_NOTIFICATION_PAGE';
export const SET_MEDIA_CHAT_PAGE                            = 'SET_MEDIA_CHAT_PAGE';
export const SET_ARCHIVED_MESSAGE_PAGE                      = 'SET_ARCHIVED_MESSAGE_PAGE';

//Profil Routing
export const SET_PROFIL_UPDATE_INFO                         = 'SET_PROFIL_UPDATE_INFO';
export const SET_PROFIL_HOME                                = 'SET_PROFIL_HOME';
export const SET_FAQS_PAGE                                  = 'SET_FAQS_PAGE';
export const SET_KYC_PAGE                                   = 'SET_KYC_PAGE';
export const SET_TRANSACTION_HISTORY_PAGE                   = 'SET_TRANSACTION_HISTORY_PAGE';
export const SET_UPDATE_NOTIFICATION_PAGE                   = 'SET_UPDATE_NOTIFICATION_PAGE';
export const SET_UPDATE_LANGUAGE_PAGE                       = 'SET_UPDATE_LANGUAGE_PAGE';
export const SET_ADD_DESCRIPTION_PAGE                       = 'SET_ADD_DESCRIPTION_PAGE';
export const SET_UPDATE_AUTHENTIFICATION_PAGE               = 'SET_UPDATE_AUTHENTIFICATION_PAGE';
export const SET_UPDATE_PASSWORD_PAGE                       = 'SET_UPDATE_PASSWORD_PAGE';

//School Routing
export const SET_SCHOOL_SELECTION_PAGE                      = 'SET_SCHOOL_SELECTION_PAGE';
export const SET_SCHOOL_DETAILS_PAGE                        = 'SET_SCHOOL_DETAILS_PAGE';


//New form 
export const SET_SCHOOL_SELECT_FORM_PAGE                    = 'SET_SCHOOL_SELECT_FORM_PAGE';
export const SET_SCHOOL_DETAILS_FORM_PAGE                   = 'SET_SCHOOL_DETAILS_FORM_PAGE';
export const SET_CHOOSE_ACCOUNT_FORM_PAGE                   = 'SET_CHOOSE_ACCOUNT_FORM_PAGE';
export const SET_NEW_STUDENT_FORM_PAGE                      = 'SET_NEW_STUDENT_FORM_PAGE';
export const SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE             = 'SET_NEW_CHOOSE_ADMISSION_TYPE_PAGE';
export const SET_NEW_UPLOAD_DOCUMENT_PAGE                   = 'SET_NEW_UPLOAD_DOCUMENT_PAGE'

//Activities
export const STUDENT_ACTIVITIES                             = 'STUDENT_ACTIVITIES';

//LIST ACTION
export const FAQ_LIST                                       = 'FAQ_LIST';


//DETAIL ACTION
export const SET_TEACHER_INFOS                              = 'SET_TEACHER_INFOS';

//FOOTER VISIBILITY
export const TOGGLE_FOOTER_VISIBILITY                       = 'TOGGLE_FOOTER_VISIBILITY';

//HEADER VISIBILITY
export const TOGGLE_HEADER_VISIBILITY                       = 'TOGGLE_HEADER_VISIBILITY';
