import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {DatePipe} from "@angular/common";
import {ApiCallingServiceService} from "../api-calling/api-calling-service.service";
import {ConstantsService} from "../constants/constants.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private convertedTime: any;
  public dashboardDta: any;
  public allEmpList: any;
  public designations: any;
  public departments: any;
  public gender: any;
  public role: any;
  public bloodGroup: any;
  public maritalStatus: any;
  public relation: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private datePipe:DatePipe
  ) {}

  async successAlert(title: string, msg: string, icon: string) {
    // Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
    Swal.fire(title, msg, 'success');
  }

  async faliureAlert(title: string, msg: string, icon: string) {
    Swal.fire(title, msg, 'error');
  }

  async warningAlert(title: string, msg: string, icon: string) {
    Swal.fire(title, msg, 'warning');
  }
  convertEpochTo24HourFormat(epochTimestamp:string) {
    const date = new Date(epochTimestamp);
    return(this.datePipe.transform(date, 'HH:mm:ss'));
  }
  convertDateToEpoch(dateString:string){
    var dateObject = new Date(dateString);

// Getting the epoch time in milliseconds
    var epochTimeInMilliseconds = dateObject.getTime();
    return(epochTimeInMilliseconds);
  }
  getDashboardData() {
    this.apiService.getApiWithToken(this.cons.api.getDashBoardData).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['message'] == 'Success') {
            this.dashboardDta=result['response'];

          } else {
            this.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          // this.SpinnerService.hide();
          console.error(e);
          this.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.info('complete'),
      }
    );
    return this.dashboardDta;
  }
  public getAllEmployee():any {
    //
    this.apiService.getApiWithToken(this.cons.api.getAllEmpList).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'Success') {
          this.allEmpList=result['response'];
          return result['response'];
        } else {
          this.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        // this.SpinnerService.hide();
        console.error(e);
        this.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });

  }
  public getAllDesignation() {
    this.apiService.getApiWithToken(this.cons.api.getAllDesignation).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.designations=result['object'];

        } else {
          this.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        this.SpinnerService.hide();
        console.error(e);
        this.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }

  public getAllDepartment() {
    this.apiService.getApiWithToken(this.cons.api.getAllDepartment).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.departments=result['object'];

        } else {
          this.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        this.SpinnerService.hide();
        console.error(e);
        this.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }
  getGender(){

    this.apiService.getApiWithToken(this.cons.api.getAllGender).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['message'] == 'CREATED') {
            this.gender=result['object'];
          } else {
            this.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          this.SpinnerService.hide();
          console.error(e);
          this.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.info('complete'),
      }
    );
  }
  getAllRole(){

    this.apiService.getApiWithToken(this.cons.api.getAllRole).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;
          if (result['message'] == 'CREATED') {
            this.role=result['object'];
          } else {
            this.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          this.SpinnerService.hide();
          console.error(e);
          this.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.info('complete'),
      }
    );
  }
  getAllBloodGroup(){

    this.apiService.getApiWithToken(this.cons.api.getAllBloodGroup).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;
          if (result['message'] == 'CREATED') {
            this.bloodGroup=result['object'];
          } else {
            this.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          this.SpinnerService.hide();
          console.error(e);
          this.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.info('complete'),
      }
    );
  }

  epochtoDateTime(epoch: string): string {
    const date = new Date(epoch); // JavaScript uses milliseconds, so multiply by 1000
    return date.toLocaleString(); // You can customize the date format as per your requirements
  }

  getMaritalStatus() {
    this.apiService.getApiWithToken(this.cons.api.getAllBloodGroup).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;
          if (result['message'] == 'CREATED') {
            this.maritalStatus=result['object'];
          } else {
            this.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          this.SpinnerService.hide();
          console.error(e);
          this.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.info('complete'),
      }
    );
  }

  getRelation() {

    this.apiService.getApiWithToken(this.cons.api.getAllRelation).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;
          if (result['message'] == 'CREATED') {
            this.relation=result['object'];
          } else {
            this.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          this.SpinnerService.hide();
          console.error(e);
          this.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.info('complete'),
      }
    );
  }
}
