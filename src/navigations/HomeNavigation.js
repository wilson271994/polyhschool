// ./routes/StackNavigator.js
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from "react-native";
import Enregistrement1 from "../components/Home/Parent/Enregistrement1";
import Enregistrement2 from "../components/Home/Parent/Enregistrement2";
import School_Selection from "../components/Home/Parent/School_Selection";
import Home from "../screens/Home";
import StudentAbsences from "../components/ParentMenu/StudentAbsences.js";
import StudentProgress from "../components/ParentMenu/StudentProgress.js";
import TeachersList from "../components/ParentMenu/TeachersList.js";
import NotificationIndex from "../components/Home/NotificationIndex";
import ChildInfos from "../components/ParentMenu/ChildInfos.js";
import SchoolFees from "../components/ParentMenu/SchoolFees.js";
import StudentRemarks from "../components/ParentMenu/StudentRemarks.js";
import Student_Infos from "../components/StudentMenu/Student_Infos";
import Student_Menu from "../components/Home/Pages/Menu.js";
import Teachers_List from "../components/StudentMenu/Teachers_List";

import Planning from "../components/Home/Pages/Planning.js";
import Absences from "../components/Home/Pages/Absences.js";
import Student_Remarks from "../components/StudentMenu/Student_Remarks";
import Homework from "../components/Home/Pages/Homework.js";

import Fees from "../components/Home/Pages/Fees.js";
import Student_Progress from "../components/StudentMenu/Student_Progress";
import Activities from "../components/Home/Pages/Activities.js";
import AdvanceRemarksFilter from "../components/ParentMenu/AdvanceRemarksFilter.js";
import Advance_Remarks_Filter from "../components/StudentMenu/Advance_Remarks_Filter.js";
import Student_Transport from "../components/StudentMenu/Student_Transport.js";
import Student_Hosting from "../components/StudentMenu/Student_Hosting.js";
import StudentHosting from "../components/ParentMenu/StudentHosting.js";
import StudentTransport from "../components/ParentMenu/StudentTransport.js";
import TeacherInfos from "../components/ParentMenu/SubPage/TeacherInfos.js";
import Teacher_Infos from "../components/StudentMenu/SubPage/Teacher_Infos.js";
import Student_Project from "../components/StudentMenu/Student_Project.js";
import StudentProject from "../components/ParentMenu/StudentProject.js";
import Student_Library from "../components/StudentMenu/Student_Library.js";
import Student_Books_Details from "../components/StudentMenu/SubPage/Student_Books_Details.js";
import Student_Book_Shop from "../components/StudentMenu/Student_Book_Shop.js";
import Student_Book_Shop_Details from "../components/StudentMenu/SubPage/Student_Book_Shop_Details.js";
import StudentLibrary from "../components/ParentMenu/StudentLibrary.js";
import StudentBooksDetails from "../components/ParentMenu/SubPage/StudentBooksDetails.js";
import StudentBookShop from "../components/ParentMenu/StudentBookShop.js";
import StudentBookShopDetails from "../components/ParentMenu/SubPage/StudentBookShopDetails.js";
import StudentCV from "../components/ParentMenu/StudentCV.js";
import School_Select from "../components/PolyHForm/School_Select.js";
import Choose_account from "../components/PolyHForm/Choose_account.js";
import School_Infos from "../components/PolyHForm/School_Infos.js";
import New_Student_Form from "../components/PolyHForm/New_Student_Form.js";
import School_Detail from "../components/Home/Parent/School_Detail.js";
import ChooseAdmission from "../components/Home/Parent/ChooseAdmission.js";
import UploadAdmissionDocument from "../components/Home/Parent/UploadAdmissionDocument.js";
import NewChooseAdmission from "../components/PolyHForm/NewChooseAdmission.js";
import NewUploadAdmissionDocument from "../components/PolyHForm/NewUploadAdmissionDocument.js";
import Agenda from "../components/Home/Pages/Agenda.js";

class HomeNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        } 
    }

    render() {
        const {
            is_sys_home,
            is_register_1,
            is_register_2,
            is_school_selection_parent_page,
            is_school_details_parent_page,
            is_parent_choose_admission_type,
            is_parent_upload_document_page,
            is_notif_home,
            is_student_absences_page,
            is_student_infos_page,
            is_student_planning_page,
            is_student_progress_page,
            is_teacher_list_page,
            is_school_fees_page,
            is_student_remarks_page,
            is_child_infos_page,
            is_menu_student_page,
            is_list_teacher_page,
            is_absences_student_page,
            is_remark_student_page,
            is_homework_student_page,
            is_fees_school_page,
            is_student_progression_page,
            is_agenda_student_page,
            is_advance_remarks_filter_page,
            is_advance_remarks_search_page,
            is_student_transport_page,
            is_student_hosting_page,
            is_hosting_student_page,
            is_transport_student_page,
            is_teacher_infos_page,
            is_infos_teacher_page,
            is_student_project_page,
            is_parent_student_project_page,
            is_student_library_page,
            is_student_book_details_page,
            is_student_book_shop_page,
            is_student_book_shop_details_page,
            is_parent_student_library_page,
            is_parent_student_book_detail_page,
            is_parent_student_book_shop_page,
            is_parent_student_book_shop_detail_page,
            is_parent_student_cv_page,
            is_school_select_form_page,
            is_choose_account_form_page,
            is_school_details_form_page,
            is_new_student_form_page,
            is_new_choose_admission_type_page,
            is_new_upload_document_page,
            is_activities_student_page,
        } = this.props;
        return (
            <View style={{ flex:1 }}>
                { 
                    is_sys_home ?
                        <Home />
                    :null
                }
                {
                    is_notif_home ?
                        <NotificationIndex />
                    :null
                }
                {
                    is_register_1 ?
                        <Enregistrement1 />
                    :null
                }
                {
                    is_register_2 ?
                        <Enregistrement2 />
                    :null
                }
                {
                    is_school_selection_parent_page ?
                        <School_Selection />
                    :null
                }
                {
                    is_school_details_parent_page ?
                        <School_Detail />
                    :null
                }
                {
                    is_parent_choose_admission_type ?
                        <ChooseAdmission />
                    :null
                }
                {
                    is_parent_upload_document_page ?
                        <UploadAdmissionDocument />
                    :null
                }
                {
                    is_student_absences_page ?
                        <StudentAbsences />
                    :null
                }
                {
                    is_student_infos_page ?
                        <ChildInfos/>
                    :null
                }
                {
                    is_student_progress_page ?
                        <StudentProgress />
                    :null
                }
                {
                    is_teacher_list_page ?
                        <TeachersList />
                    :null
                }
                {
                    is_school_fees_page ?
                        <SchoolFees />
                    :null
                }
                {
                    is_student_remarks_page ?
                        <StudentRemarks />
                    :null
                }
                {
                    is_child_infos_page ?
                        <Student_Infos/>
                    :null
                }
                {
                    is_menu_student_page ?
                        <Student_Menu/>
                    :null
                }
                {
                    is_list_teacher_page ?
                        <Teachers_List/>
                    :null
                }
                {
                    is_student_planning_page ?
                        <Planning/>
                    :null
                }
                {
                    is_absences_student_page ?
                        <Absences/>
                    :null
                }
                {
                    is_remark_student_page ?
                        <Student_Remarks/>
                    :null
                }
                {
                    is_homework_student_page ?
                        <Homework/>
                    :null
                }
                {
                    is_fees_school_page ?
                        <Fees/>
                    :null
                }
                {
                    is_student_progression_page ?
                        <Student_Progress/>
                    :null
                }
                {
                    is_activities_student_page ?
                        <Activities/>
                    :null
                }
                {
                    is_agenda_student_page ?
                        <Agenda/>
                    :null
                }
                
                {
                    is_advance_remarks_filter_page ?
                        <Advance_Remarks_Filter/>
                    :null
                }
                
                {
                    is_advance_remarks_search_page ?
                        <AdvanceRemarksFilter/>
                    :null
                }
                {
                    is_student_transport_page ?
                        <Student_Transport/>
                    :null
                }
                {
                    is_student_hosting_page ?
                        <Student_Hosting/>
                    :null
                }
                {
                    is_hosting_student_page ?
                        <StudentHosting/>
                    :null
                }
                {
                    is_transport_student_page ?
                        <StudentTransport/>
                    :null
                }
                {
                    is_teacher_infos_page ?
                        <TeacherInfos/>
                    :null
                }
                {
                    is_infos_teacher_page ?
                        <Teacher_Infos/>
                    :null
                }
                {
                    is_student_project_page ?
                        <Student_Project/>
                    :null
                }
                {
                    is_parent_student_project_page ?
                        <StudentProject/>
                    :null
                }
                {
                    is_student_library_page ?
                        <Student_Library/>
                    :null
                }
                {
                    is_student_book_details_page ?
                        <Student_Books_Details/>
                    :null
                }
                {
                    is_student_book_shop_page ?
                        <Student_Book_Shop/>
                    :null
                }
                {
                    is_student_book_shop_details_page ?
                        <Student_Book_Shop_Details/>
                    :null
                }
                {
                    is_parent_student_library_page ?
                        <StudentLibrary/>
                    :null
                }
                {
                    is_parent_student_book_detail_page ?
                        <StudentBooksDetails/>
                    :null
                }
                {
                    is_parent_student_book_shop_page ?
                        <StudentBookShop/>
                    :null
                }
                {
                    is_parent_student_book_shop_detail_page ?
                        <StudentBookShopDetails/>
                    :null
                    }
                    {
                        is_parent_student_cv_page ?
                            <StudentCV/>
                        :null
                    }
                    {
                        is_school_select_form_page ?
                            <School_Select/>
                        :null
                    }
                    {
                        is_choose_account_form_page ?
                            <Choose_account/>
                        :null
                    }
                    {
                        is_school_details_form_page ?
                            <School_Infos/>
                        :null
                    }
                    {
                        is_new_student_form_page ?
                            <New_Student_Form/>
                        :null
                    }
                    {
                        is_new_choose_admission_type_page ?
                            <NewChooseAdmission/>
                        :null
                    }
                    {
                        is_new_upload_document_page ?
                            <NewUploadAdmissionDocument/>
                        :null
                    }
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({}, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        is_sys_home                                 : state.navigation.is_sys_home,
        is_notif_home                               : state.navigation.is_notif_home,
        is_register_1                               : state.navigation.is_register_1,
        is_school_details_parent_page               : state.navigation.is_school_details_parent_page,
        is_school_selection_parent_page             : state.navigation.is_school_selection_parent_page,
        is_register_2                               : state.navigation.is_register_2,
        is_student_absences_page                    : state.navigation.is_student_absences_page,
        is_student_infos_page                       : state.navigation.is_student_infos_page,
        is_student_planning_page                    : state.navigation.is_student_planning_page,
        is_student_progress_page                    : state.navigation.is_student_progress_page,
        is_teacher_list_page                        : state.navigation.is_teacher_list_page,
        is_school_fees_page                         : state.navigation.is_school_fees_page,
        is_student_remarks_page                     : state.navigation.is_student_remarks_page,
        is_child_infos_page                         : state.navigation.is_child_infos_page,
        is_menu_student_page                        : state.navigation.is_menu_student_page,
        is_list_teacher_page                        : state.navigation.is_list_teacher_page,
        is_planning_student_page                    : state.navigation.is_planning_student_page,
        is_absences_student_page                    : state.navigation.is_absences_student_page,
        is_remark_student_page                      : state.navigation.is_remark_student_page,
        is_homework_student_page                    : state.navigation.is_homework_student_page,
        is_fees_school_page                         : state.navigation.is_fees_school_page,
        is_student_progression_page                 : state.navigation.is_student_progression_page,
        is_activities_student_page                  : state.navigation.is_activities_student_page,
        is_agenda_student_page                      : state.navigation.is_agenda_student_page,
        is_advance_remarks_filter_page              : state.navigation.is_advance_remarks_filter_page,
        is_advance_remarks_search_page              : state.navigation.is_advance_remarks_search_page,
        is_student_transport_page                   : state.navigation.is_student_transport_page,
        is_student_hosting_page                     : state.navigation.is_student_hosting_page,
        is_hosting_student_page                     : state.navigation.is_hosting_student_page,
        is_transport_student_page                   : state.navigation.is_transport_student_page,
        is_teacher_infos_page                       : state.navigation.is_teacher_infos_page,
        is_infos_teacher_page                       : state.navigation.is_infos_teacher_page,
        is_student_project_page                     : state.navigation.is_student_project_page,
        is_parent_student_project_page              : state.navigation.is_parent_student_project_page,
        is_student_library_page                     : state.navigation.is_student_library_page,
        is_student_book_details_page                : state.navigation.is_student_book_details_page,
        is_student_book_shop_page                   : state.navigation.is_student_book_shop_page,
        is_student_book_shop_details_page           : state.navigation.is_student_book_shop_details_page,
        is_parent_student_library_page              : state.navigation.is_parent_student_library_page,
        is_parent_student_book_detail_page          : state.navigation.is_parent_student_book_detail_page,
        is_parent_student_book_shop_page            : state.navigation.is_parent_student_book_shop_page,
        is_parent_student_book_shop_detail_page     : state.navigation.is_parent_student_book_shop_detail_page,
        is_parent_student_cv_page                   : state.navigation.is_parent_student_cv_page,
        is_school_select_form_page                  : state.navigation.is_school_select_form_page,
        is_choose_account_form_page                 : state.navigation.is_choose_account_form_page,
        is_school_details_form_page                 : state.navigation.is_school_details_form_page,
        is_new_student_form_page                    : state.navigation.is_new_student_form_page,
        is_new_choose_admission_type_page           : state.navigation.is_new_choose_admission_type_page,
        is_new_upload_document_page                 : state.navigation.is_new_upload_document_page,
        is_parent_choose_admission_type             : state.navigation.is_parent_choose_admission_type,
        is_parent_upload_document_page              : state.navigation.is_parent_upload_document_page,
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(HomeNavigation);