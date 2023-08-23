import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  serviceUrl = 'http://192.168.100.122:3001/'; //UAT server
  api = {
    login:
      this.serviceUrl + '/adminLogin',
    getDashBoardData: this.serviceUrl+'/api/webApi/Sidebar/getDashBoardDataMain'
  };
}
