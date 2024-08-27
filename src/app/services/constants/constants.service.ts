import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

 serviceUrl = 'http://192.168.2.2:8081/'; //UAT server
  // serviceUrl = 'http://172.20.10.5:8081/';
  // serviceUrl = 'http://petregistration.mynoida.co.in/NaprWeb/'; //UAT server
  api = {
    login:
      this.serviceUrl + 'api/adminLogin',
    getDashBoardData: this.serviceUrl+'api/webApi/Sidebar/getDashBoardDataMain',
    getAllEmpList: this.serviceUrl+'api/webApi/Sidebar/getAllEmpList',
    getAllDesignation: this.serviceUrl+'api/designation/getAllDesignation',
    getMobileDashBoardData: this.serviceUrl+'api/dashboard/getMobileDashBoardData',
    getCalenderData: this.serviceUrl+'api/dashboard/getCalenderData',
    // getProfileComplete: this.serviceUrl+'api/UpdateInfoController/getProfileComplete',
    getProfileComplete: this.serviceUrl+'api/UpdateInfoController/getProfileData/',
    getAllGender: this.serviceUrl+'api/gender/getAllGender',
    getAllDependent: this.serviceUrl+'api/empDependent/getAllDependent',
    getAllDepartment: this.serviceUrl+'api/department/getAllDepartment',
    getAllLeaveType: this.serviceUrl+'api/leaveType/getAllLeaveType',
    createOrUpdate: this.serviceUrl+'api/empLeave/createOrUpdate',
    createOrUpdateDoc: this.serviceUrl+'api/personalDocument/createOrUpdate',
    getAll: this.serviceUrl+'api/empLeave/getAll',
    createOrUpdateEmployee: this.serviceUrl+'/api/empRegistrationWeb/createOrUpdateEmployee',
    getAllRole: this.serviceUrl+'api/role/getAllRole',
    designationcreateOrUpdate: this.serviceUrl+'api/designation/createOrUpdate',
    departmentCreateOrUpdate: this.serviceUrl+'api/department/createOrUpdate',
    getAllBloodGroup: this.serviceUrl+'api/bloodGroup/getAllBloodGroup',
    bloodCreateOrUpdate: this.serviceUrl+'api/bloodGroup/createOrUpdate',
    genderCreateOrUpdate: this.serviceUrl+'api/gender/createOrUpdate',
    maritalStatusCreateOrUpdate: this.serviceUrl+'api/maritalStatus/createOrUpdate',
    getAllRelation: this.serviceUrl+'api/relation/getAllRelation',
    relationCreateOrUpdate: this.serviceUrl+'api/relation/createOrUpdate',
    getAllMaritalStatus: undefined,
    attendanceFileUpload: this.serviceUrl+'/api/fileUpload/uploadAttendance',
    uploadSalary: this.serviceUrl+'api/fileUpload/uploadSalary',
    getAllLeaveWebForAdmin: this.serviceUrl+'api/empLeave/getAllLeaveWebForAdmin',
    approvedOrRejectLeave: this.serviceUrl+'api/empLeave/approvedOrRejectLeave',
    getAllLeaveStatus: this.serviceUrl+'api/leaveStatus/getAllLeaveStatus',
    getAttendanceReport: this.serviceUrl+'api/report/attendanceReport',
    deleteAccount: this.serviceUrl+'api/empRegistration/deleteAccount/',
    activeAccount: this.serviceUrl+'api/empRegistration/activeAccount/',
    deActiveAccount: this.serviceUrl+'api/empRegistration/deActiveAccount/', updateBankInfo: this.serviceUrl+'api/empRegistrationWeb/updateBankInfo',
    createNotification: this.serviceUrl+'api/notification/createNotification',
    createNotificationForAll: this.serviceUrl+'api/notification/createNotificationForAll',
    getNotification: this.serviceUrl+'api/notification/getDialogNotification',
    getAllBroadCastSelfNotification: this.serviceUrl+'api/notification/getAllBroadCastSelfNotification',
    isAllSeen:this.serviceUrl+'api/notification/isAllSeen',
    getAllDocumentType: this.serviceUrl+'api/personalDocument/getAllDocumentType',
    uploadFileTransactional: this.serviceUrl+'api/personalDocument/uploadFileTransactional',
    uploadOfficialDocument: this.serviceUrl+'api/personalDocument/uploadOfficialDocument',
    getAllUserDocument: this.serviceUrl+'api/personalDocument/getAllUserDocument',


  };
}
