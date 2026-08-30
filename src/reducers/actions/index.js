import axios from 'axios';
import { store } from '../store';
import { BASE_URL, SERVER_KEY, TokenSandbox, headerRequest } from '../../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {
    AUTH_ERROR_MESSAGE,
    IS_AUTHENTICATED,
    IS_AUTH_ERROR,
    IS_HEADER, IS_LOADING,
    IS_NETWORK,
    USER_INFOS,
    USER_TOKEN,
    SITE_INFOS,
    SCHOOL_INFOS,
    IS_PARENT,
    IS_ADMISSION_APPROVED,
    IS_SCHOOL_USER,
    GARDIAN_INFOS,
    STUDENT_INFOS,
    STUDENT_ACTIVITIES,
    SCHOOL_NOTIFICATION_LIST,
} from './types';

import {
    switchActivationFormAction,
    switchChooseFormAction,
    switchCourseHistoryPageAction,
    switchCoursePageAction,
    switchHomePageAction,
    switchHomeParentAction,
    switchLoginFormAction,
    switchMessagePageAction,
    switchProfilPageAction,
    switchProfilHomeAction,
    switchSchoolDetailsAction,
    switchSchoolSelectionAction,
    switchSignupForm1Action,
    switchSignupForm2Action,
} from '../../navigations/rootNavigation';

//Global Constantes
const TIMEOUT = 8000;
const LIMIT_LIST = 10;
let IS_REQUEST_ACTIVE = false;
let isConnected = store.getState().alert.is_network;

//SET AXIOS 
const axiosClient = axios.create();
axiosClient.defaults.headers = headerRequest.headers;
axiosClient.defaults.onUploadProgress = headerRequest.onUploadProgress;
axiosClient.defaults.onDownloadProgress = headerRequest.onUploadProgress;


/**
 * Manage switcher Action
 */
export const switchHeaderAction = (data) => {
    store.dispatch({ type: IS_HEADER, value: data });
}

/**
 * Check If Auth Persist
 */
export const checkAuthDataAction = async () => {
    const dataUser = await AsyncStorage.getItem('userInfos');
    const dataToken = await AsyncStorage.getItem('userToken');
    if (dataUser && dataToken) {
        store.dispatch({ type: IS_AUTHENTICATED, value: true });
        const user_data = JSON.parse(dataUser);
        const user_token = JSON.parse(dataToken);
        store.dispatch({ type: USER_INFOS, value: user_data });
        store.dispatch({ type: USER_TOKEN, value: user_token });
        await FetchShoolUserInfos(user_token);
    }
    await FetchPolyHAuthPreloadDataAction();
    await FetchSchoolPreloadDataAction();

}

/**
 * 
 * Preload Data 
 */
export const FetchPolyHAuthPreloadDataAction = () => {
    store.dispatch({ type: IS_LOADING, value: true });
    axios.get(`${BASE_URL}/api-auth/site-infos`)
        .then(async (res) => {
            if (res.data.status === 200) {
                const result = res.data.result;
                store.dispatch({ type: SITE_INFOS, value: result });
                store.dispatch({ type: IS_LOADING, value: false });
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })
}

//Récupération des écoles
export const FetchSchoolPreloadDataAction = () => {
    store.dispatch({ type: IS_LOADING, value: true });
    axios.get(`${BASE_URL}/api-school/preload-data`)
        .then(async (res) => {
            if (res.data.status === 200) {
                const result = res.data.result;
                store.dispatch({ type: SCHOOL_INFOS, value: result });
                store.dispatch({ type: IS_LOADING, value: false });
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })
}

//Home Page User Infos
export const FetchShoolUserInfos = (data) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axios.get(`${BASE_URL}/api-school/school-user-info?token=${data}`)
        .then(async (res) => {
            if (res.data.status === 200) {
                const result = res.data.result;
                store.dispatch({ type: GARDIAN_INFOS, value: result.gardian_infos });
                store.dispatch({ type: STUDENT_INFOS, value: result.student_infos });

                // NOUVEAU : on stocke la liste des notifications reçue de l'API
                store.dispatch({ type: SCHOOL_NOTIFICATION_LIST, value: result.school_notification_list || [] });

                await store.dispatch({ type: IS_ADMISSION_APPROVED, value: result.is_admission_approved })
                await store.dispatch({ type: IS_SCHOOL_USER, value: result.is_school_user })
                await store.dispatch({ type: IS_PARENT, value: result.is_parent })

                store.dispatch({ type: IS_LOADING, value: false });
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })
}

/**
 * Manage Login action
 * 
 */
export const LoginAction = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.post(`${BASE_URL}/api-auth/auth`, postdata)
        .then(async (res) => {
            const result = res.data.result;
            if (res.data.status === 200) {
                console.log(result.is_school_parent, 'fff')
                await store.dispatch({ type: USER_TOKEN, value: result.token });
                await store.dispatch({ type: USER_INFOS, value: result.user });
                await store.dispatch({ type: IS_PARENT, value: result.is_school_parent });

                //persist user information
                await AsyncStorage.setItem('userInfos', JSON.stringify(result.user));
                await AsyncStorage.setItem('userToken', JSON.stringify(result.token));

                //update auth validation state
                await store.dispatch({ type: IS_AUTHENTICATED, value: true })

                if( result.is_school_parent) {
                    switchHomeParentAction(false);
                    switchHomePageAction(true);
                    switchCoursePageAction(false);
                    switchMessagePageAction(false);
                    switchProfilPageAction(false);
                    switchCourseHistoryPageAction(false)
                } else {
                    switchHomeParentAction(false);
                    switchHomePageAction(true);
                    switchCoursePageAction(false);
                    switchMessagePageAction(false);
                    switchProfilPageAction(false);
                    switchCourseHistoryPageAction(false)
                }
                //réinitialisation de la navigation


            } else {
                store.dispatch({ type: IS_LOADING, value: false });

                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Connexion',
                        description: res.data.message,
                    }
                });
            }
        })
        .then(async () => {
            const dataToken = await AsyncStorage.getItem('userToken');
            if (dataToken) {
                const user_token = JSON.parse(dataToken);
                await FetchShoolUserInfos(user_token);
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });

            store.dispatch({ type: IS_LOADING, value: false });

        })
}

/**
 * 
 * @param {*} postdata 
 * Create Account
 */
export const SignupAction = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.post(`${BASE_URL}/api-auth/signup`, postdata)
        .then(async (res) => {
            const result = res.data;
            if (result.status === 200) {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    'type': 'success',
                    props: {
                        title: 'Création de compte',
                        description: result.message,
                    }
                });
                switchActivationFormAction(true);
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Création de compte',
                        description: result.message,
                    }
                });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Création de compte',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })

}

/**
 * 
 * @param {*} postdata 
 * Activate Account
 */
export const AccountActivationAction = (postdata) => {
    if (isConnected) {
        store.dispatch({ type: IS_LOADING, value: true });
        axiosClient.post(`${BASE_URL}/api-auth/activate-account`, postdata)
            .then(async (res) => {
                const result = res.data.result;
                if (res.data.status === 200) {
                    await store.dispatch({ type: USER_TOKEN, value: result.token });
                    await store.dispatch({ type: USER_INFOS, value: result.user });

                    //perist user information
                    await AsyncStorage.setItem('userInfos', JSON.stringify(result.user));
                    await AsyncStorage.setItem('userToken', JSON.stringify(result.token));

                    //update auth validation state
                    await store.dispatch({ type: IS_AUTHENTICATED, value: true })


                    //réinitialisation de la navigation
                    switchHomePageAction(true)
                    switchCoursePageAction(false);
                    switchMessagePageAction(false);
                    switchProfilPageAction(false);
                    switchCourseHistoryPageAction(false)
                }

                console.log(result)
            })
            .catch((error) => {
                Toast.show({
                    'type': 'info',
                    props: {
                        title: 'Connexion internet!',
                        description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                    }
                });
                store.dispatch({ type: IS_LOADING, value: false });
                console.log('error', error)
            })
    } else {
        Toast.show({
            'type': 'info',
            props: {
                title: 'Connexion internet!',
                description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
            }
        });
        store.dispatch({ type: IS_LOADING, value: false });
    }
}

/**
 * 
 * @param {*} postdata  
 * Activate Account
 */
export const resentActivationCodeAction = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true});
    axiosClient.post(`${BASE_URL}/api-auth/send-activation-otp`, postdata)
    .then(async (res) => {
        const result = res.data;
        if(result.status === 200) {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                'type': 'success',
                props: {
                    title: 'Opération réussie.',
                    description: result.message,
                }
            });
        } else {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                'type': 'error',
                props: {
                    title: 'Erreur de connexion',
                    description: result.message,
                }
            });
        }
    })
    .catch((error) => {
        Toast.show({
            'type': 'info',
            props: {
                title: 'Connexion internet!',
                description: 'Votre débit internet est instable. Vérifiez votre connectivité et réessayez',
            }
        });
        store.dispatch({ type: IS_LOADING, value: false });
    })
}


export const addChildAction = (postdata, gardiant_data) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.post(`${BASE_URL}/api-school/school-student-registration`, postdata)
        .then(async (res) => {
            const result = res.data.result;
            if (res.data.status === 200) {
                await store.dispatch({ type: IS_LOADING, value: false });

                const admission_list = result.gardian_infos.admission_list;
                var old_data = gardiant_data;
                Object.keys(old_data).forEach((element) => {
                    if (element === 'admission_list') {
                        old_data[element] = admission_list
                    }
                });

                Toast.show({
                    type: 'success',
                    props: {
                        title: 'Compte créé avec succès',
                        description: res.data.message,
                    }
                });
                switchHomeParentAction(true);
                switchCoursePageAction(false);
                switchMessagePageAction(false);
                switchProfilPageAction(false);
                switchCourseHistoryPageAction(false)

                // const dataToken = await AsyncStorage.getItem('userToken');
                // if (dataToken) {
                //     const user_token = JSON.parse(dataToken);
                //     await FetchShoolUserInfos(user_token);
                // }
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'error',
                    props: {
                        title: 'Une erreur s\'est produite',
                        description: res.data.message
                    }
                });
            }
        })
        .catch(() => {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                type: 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Impossible de se connecter à l\'API',
                }
            });
        });
};

/**
 * 
 * @param {*} postdata 
 * Logout Account
 */
export const SchoolAppSubscription = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true })
    axiosClient.post(`${BASE_URL}/api-school/school-student-registration`, postdata)
        .then(async (res) => {
            const result = res.data;
            if (result.status === 200) {
                await store.dispatch({ type: IS_LOADING, value: false });

                //Retour de la valeur de l'authentification
                store.dispatch({ type: IS_SCHOOL_USER, value: result.is_school_user });

                Toast.show({
                    'type': 'success',
                    props: {
                        title: 'Admission scolaire réussie',
                        description: result.message,
                    }
                });

                //réinitialisation de la navigation
                switchHomePageAction(true)
                switchCoursePageAction(false);
                switchMessagePageAction(false);
                switchProfilPageAction(false);
                switchCourseHistoryPageAction(false);


            } else if (result.status === 500) {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Une erreur s\'est produite',
                        description: result.message,
                    }
                });
            } else {
                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Erreur de connexion',
                        description: 'Une erreur s\'est produite',
                    }
                });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })
}

/**
 * 
 * @param {*} postdata 
 * Logout Account
 */
export const LogoutAction = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.post(`${BASE_URL}/api-auth/logout`, postdata)
        .then(async (res) => {
            const result = res.data;
            if (result.status === 200) {
                await store.dispatch({ type: USER_TOKEN, value: '' });
                await store.dispatch({ type: USER_INFOS, value: {} });
                await store.dispatch({ type: IS_PARENT, value: false });

                await AsyncStorage.removeItem('infoUser'),
                    await AsyncStorage.removeItem('userToken');
                await store.dispatch({ type: IS_AUTHENTICATED, value: false });

                switchLoginFormAction(true);
                switchChooseFormAction(false);
                switchSchoolSelectionAction(false);
                switchSchoolDetailsAction(false);
                switchSignupForm1Action(false);
                switchSignupForm2Action(false);
                switchActivationFormAction(false)

                await store.dispatch({ type: IS_LOADING, value: false });
            } else if (result.status === 500) {
                store.dispatch({ type: IS_LOADING, value: false })
                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Erreur de déconnexion',
                        description: result.message,
                    }
                });
            }
            else {
                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Une erreur s\'et produite',
                        description: 'Contactez l\'administrateur',
                    }
                });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable veuillez vérifier votre connectivité et réessayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })
}



/**
 * 
 * @param {*} postdata 
 * Add/Update/Delete Agenda
 */

// Ajouter un événement agenda
export const CreateAgendaAction = (data, events, _callBack) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.post(`${BASE_URL}/api-school/create-student-agenda`, data)
        .then((res) => {
            if (res.data.status === 200) {
                Toast.show({
                    type: 'success',
                    props: { title: 'Succès', description: 'Événement ajouté avec succès' }
                });

                const new_event = res.data.result.new_task;
                var objectList = events;
                objectList.push(new_event);
                _callBack();
                store.dispatch({ type: IS_LOADING, value: false });
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'error',
                    props: { title: 'Erreur', description: res.data.message || 'Une erreur est survenue' }
                });
            }
        })
        .catch(() => {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                type: 'info',
                props: { title: 'Connexion internet!', description: 'Votre débit internet est instable. Vérifiez votre connectivité et réessayez' }
            });
        });
};

// Modifier un événement agenda
export const UpdateAgendaAction = (data) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.put(`${BASE_URL}/api-school/agenda`, data)
        .then((res) => {
            if (res.data.status === 200) {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'success',
                    props: { title: 'Succès', description: 'Événement modifié avec succès' }
                });
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'error',
                    props: { title: 'Erreur', description: res.data.message || 'Une erreur est survenue' }
                });
            }
        })
        .catch(() => {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                type: 'info',
                props: { title: 'Connexion internet!', description: 'Votre débit internet est instable. Vérifiez votre connectivité et réessayez' }
            });
        });
};

// Supprimer un événement agenda
export const DeleteAgendaAction = (data) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.delete(`${BASE_URL}/api-school/agenda`, { data })
        .then((res) => {
            if (res.data.status === 200) {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'success',
                    props: { title: 'Succès', description: 'Événement supprimé avec succès' }
                });
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'error',
                    props: { title: 'Erreur', description: res.data.message || 'Une erreur est survenue' }
                });
            }
        })
        .catch(() => {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                type: 'info',
                props: { title: 'Connexion internet!', description: 'Votre débit internet est instable. Vérifiez votre connectivité et réessayez' }
            });
        });
};

/**
 * 
 * @param {*} postdata 
 * List Student Activities
 */
export const FetchStudentActivitiesAction = (token) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axios.get(`${BASE_URL}/api-school/student-activities?token=${token}`)
        .then((res) => {
            if (res.data.status === 200) {
                const result = res.data.result;
                store.dispatch({ type: STUDENT_ACTIVITIES, value: result });
                store.dispatch({ type: IS_LOADING, value: false });
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
            }
        })
        .catch(() => {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                type: 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et réessayez',
                }
            });
        });
};

/**
 * 
 * @param {*} postdata 
 * Upload Documents
 */
export const UploadDocumentAction = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.post(`${BASE_URL}/api-school/upload-admission-documents`, postdata)
        .then(async (res) => {
            if (res.data.status === 200) {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'success',
                    props: {
                        title: 'Documents envoyés',
                        description: res.data.message || 'Vos documents ont été soumis avec succès',
                    }
                });
                const dataToken = await AsyncStorage.getItem('userToken');
                if (dataToken) {
                    const user_token = JSON.parse(dataToken);
                    await FetchShoolUserInfos(user_token);
                }
                switchHomePageAction(true);
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'error',
                    props: {
                        title: 'Erreur',
                        description: res.data.message || 'Une erreur s\'est produite',
                    }
                });
            }
        })
        .catch((error) => {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                type: 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et réessayez',
                }
            });
        });
};

/**
 * 
 * @param {*} postdata 
 * UpdateProfilAction
 */
export const UpdateProfilAction = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true })
    axiosClient.post(`${BASE_URL}/api-auth/user-update-info`, postdata)
        .then(async (res) => {
            const result = res.data;
            if (result.status === 200) {
                const response_data = res.data.result;
                store.dispatch({ type: IS_LOADING, value: false });
                await store.dispatch({ type: USER_INFOS, value: response_data.user });
                await AsyncStorage.setItem('userInfos', JSON.stringify(response_data.user));
                Toast.show({
                    'type': 'success',
                    props: {
                        title: 'Opération réssie!',
                        description: res.data.message,
                    }
                });
            } else {
                store.dispatch({ type: IS_LOADING, value: false })
                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Une erreur s\'est produite',
                        description: result.message,
                    }
                });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })

}

/**
 * 
 * @param {*} postdata 
 * UpdateKycAction
 */
export const UpdateKycAction = (formdata) => {
    store.dispatch({ type: IS_LOADING, value: true})
    axiosClient.post(`${BASE_URL}/api-auth`, formdata)
    .then(async (res) => {
        const response_data = res.data.result;
        console.log(response_data)
        if(res.data.status === 200) {
            store.dispatch({ type: IS_LOADING, value: false });
            await store.dispatch({ type: USER_INFOS, value: response_data.user });
            await AsyncStorage.setItem('userInfos', JSON.stringify(response_data.user));
            Toast.show({
                'type': 'success',
                props: {
                    title: 'Opération réssie!',
                    description:res.data.message,
                }
            });
        } else {
            store.dispatch({ type : IS_LOADING, value: false })
            Toast.show({
                'type': 'error',
                props: {
                    title: 'Une erreur s\'est produite',
                    description: res.data.message,
                }
            });
        }
    })
    .catch((error) => {
        Toast.show({
            'type': 'info',
            props: {
                title: 'Connexion internet!',
                description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
            }
        });
        store.dispatch({ type: IS_LOADING, value: false });
    })

}

/**
 * 
 * @param {*} postdata 
 * UpdateNotification
 */
export const UpdateNotificationPermissionAction = (postdata) => {
    store.dispatch({ type: IS_LOADING, value: true })
    axiosClient.post(`${BASE_URL}/api-school/update-gardian-notification`, postdata)
        .then(async (res) => {
            const result = res.data;
            if (result.status === 200) {
                const response_data = res.data.result;
                store.dispatch({ type: IS_LOADING, value: false });

                await store.dispatch({ type: USER_INFOS, value: response_data.user });
                await AsyncStorage.setItem('userInfos', JSON.stringify(response_data.user));

                if (response_data.school_notification_list) {
                    store.dispatch({ type: SCHOOL_NOTIFICATION_LIST, value: response_data.school_notification_list });
                }

                Toast.show({
                    'type': 'success',
                    props: {
                        title: 'Opération réssie!',
                        description: res.data.message,
                    }
                });
                switchProfilHomeAction(true);
            } else {
                store.dispatch({ type: IS_LOADING, value: false })
                Toast.show({
                    'type': 'error',
                    props: {
                        title: 'Une erreur s\'est produite',
                        description: result.message,
                    }
                });
            }
        })
        .catch((error) => {
            Toast.show({
                'type': 'info',
                props: {
                    title: 'Connexion internet!',
                    description: 'Votre débit internet est instable. Vérifiez votre connectivité et reéssayez',
                }
            });
            store.dispatch({ type: IS_LOADING, value: false });
        })
}



/**
 * 
 * @param {*} postdata 
 * Manage Payment fee extension
 */

// Create request for extension
export const CreateFeeExtensionAction = (data, moratoires, _callBack) => {
    store.dispatch({ type: IS_LOADING, value: true });
    axiosClient.post(`${BASE_URL}/api-school/create-fee-extension`, data)
        .then((res) => {
            if (res.data.status === 200) {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'success',
                    props: { title: 'Succès', description: res.data.message }
                });

                const newObject = res.data.result.fee_extension;

                //Update the current list
                var extensionList = moratoires;
                extensionList.push(newObject)
                _callBack();
                
            } else {
                store.dispatch({ type: IS_LOADING, value: false });
                Toast.show({
                    type: 'error',
                    props: { title: 'Erreur', description: res.data.message || 'Une erreur est survenue' }
                });
            }
        })
        .catch(() => {
            store.dispatch({ type: IS_LOADING, value: false });
            Toast.show({
                type: 'info',
                props: { title: 'Connexion internet!', description: 'Votre débit internet est instable. Vérifiez votre connectivité et réessayez' }
            });
        });
};