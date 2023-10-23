import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  serviceUrl = 'http://192.168.137.99:8080/'; //UAT server
  // serviceUrl = 'http://petregistration.mynoida.co.in/NaprWeb/'; //UAT server
  api = {
    login:
      this.serviceUrl + 'api/adminLogin',
    getDashBoardData: this.serviceUrl+'/api/webApi/Sidebar/getDashBoardDataMain',
    getAllEmpList: this.serviceUrl+'/api/webApi/Sidebar/getAllEmpList',
    getAllDesignation: this.serviceUrl+'/api/designation/getAllDesignation',
    getMobileDashBoardData: this.serviceUrl+'api/dashboard/getMobileDashBoardData',
    getProfileComplete: this.serviceUrl+'api/UpdateInfoController/getProfileComplete',
    getAllGender: this.serviceUrl+'/api/gender/getAllGender',
    getAllDependent: this.serviceUrl+'/api/empDependent/getAllDependent',
    getAllDepartment: undefined,
    getAllLeaveType: this.serviceUrl+'api/empLeave/getAllLeaveType',
    createOrUpdate: this.serviceUrl+'api/empLeave/createOrUpdate',
    getAll: this.serviceUrl+'api/empLeave/getAll'
  };
}
