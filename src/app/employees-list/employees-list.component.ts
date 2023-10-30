import { Component,OnInit } from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit{
  allEmpList: any;
  currentEmployee: any;
  designations: any[]=[];
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    this.getAllEmployee();
    this.common.getAllDesignation();
  }

  private getAllEmployee() {
    this.SpinnerService.show();
    this.apiService.getApiWithToken(this.cons.api.getAllEmpList).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'Success') {
          this.allEmpList=result['response'];
          for(let emp of this.allEmpList){
            if(emp.employeeSubDetails!=undefined){
              emp.employeeSubDetails.dateOfJoining = this.datePipe.transform(new Date(Number(emp.employeeSubDetails.dateOfJoining)), 'MM/dd/yyyy');
            }
          }
        } else {
          this.SpinnerService.hide();
          this.common.faliureAlert('Please try later', result['message'], '');

        }
      },
      error: (e) => {
        this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }

  currentEmployeeMethod(emp: any) {
    this.currentEmployee=emp;
  }

  // private getAllDesignation() {
  //   this.apiService.getApiWithToken(this.cons.api.getAllDesignation).subscribe({
  //     next: (v: object) => {
  //       this.SpinnerService.hide();
  //       let result: { [key: string]: any } = v;
  //
  //       if (result['message'] == 'CREATED') {
  //         this.designations=result['object'];
  //
  //       } else {
  //         this.common.faliureAlert('Please try later', result['message'], '');
  //       }
  //     },
  //     error: (e) => {
  //       this.SpinnerService.hide();
  //       console.error(e);
  //       this.common.faliureAlert('Error', e['error']['message'], 'error');
  //     },
  //     complete: () => console.info('complete'),
  //   });
  // }
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return new Date();
  }
}
