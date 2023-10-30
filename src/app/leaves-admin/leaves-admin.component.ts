import { Component,OnInit } from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {AllEmployeesComponent} from "../all-employees/all-employees.component";

@Component({
  selector: 'app-leaves-admin',
  templateUrl: './leaves-admin.component.html',
  styleUrls: ['./leaves-admin.component.scss']
})
export class LeavesAdminComponent implements OnInit{
  public allEmployee: any;
  employee: any;
  employeeLeaveDTO: any[]=[];
  leaveType: any;
  leaveStatus: any;
  fromDate: any;
  toDate: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    public empList:AllEmployeesComponent,
    ) {}
  ngOnInit(): void {
    this.common.getAllLeaveStatus();
    this.common.getAllEmployee();
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    this.getAllLeaveWebForAdmin();
    this.common.getAllLeaves();
  }


  changeSelect() {
    console.log(this.employee);
  }

  private getAllLeaveWebForAdmin() {

    let json=
      {
        empId:undefined,
        endDate:undefined,
        startDate:undefined
    };
    this.apiService.postApiWithToken(this.cons.api.getAllLeaveWebForAdmin,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'OK') {
          this.employeeLeaveDTO=result['object'].employeeLeaveDTO;
          debugger;
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        // this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }

  approveLeave(employee: any,action:any,i:number) {
    debugger;

    let json={
      leaveId:employee.empLeaveId,
      leaveAction:action.lasid
    }
    this.apiService.postApiWithToken(this.cons.api.approvedOrRejectLeave,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'OK') {
            this.employeeLeaveDTO[i].masterLeaveApprovedStatus=action;
          // this.employeeLeaveDTO=result['object'].employeeLeaveDTO;
          // debugger;
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        // this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }

  filter() {
    debugger;
    let json=
      {
        empId:this.employee.mobileNo,
        endDate:this.common.convertDateToEpoch(this.toDate),
        startDate:this.common.convertDateToEpoch(this.fromDate)
      };
    this.apiService.postApiWithToken(this.cons.api.getAllLeaveWebForAdmin,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'OK') {
          this.employeeLeaveDTO=result['object'].employeeLeaveDTO;
          debugger;
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        // this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }
}
