import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  serviceUrl = 'http://192.168.137.27:8080/'; //UAT server
  api = {
    login:
      this.serviceUrl + 'api/adminLogin',
    getDashBoardData: this.serviceUrl+'/api/webApi/Sidebar/getDashBoardDataMain',
    getAllEmpList: this.serviceUrl+'/api/webApi/Sidebar/getAllEmpList',
    getAllDesignation: this.serviceUrl+'api/empRegistration/getAllDesignation',
    getMobileDashBoardData: this.serviceUrl+'api/dashboard/getMobileDashBoardData',
    getProfileComplete: this.serviceUrl+'api/UpdateInfoController/getProfileComplete'
  };
}
