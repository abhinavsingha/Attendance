import { Component,OnInit } from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
class leaveRequest{
  leaveTypeId: any;
  empLeaveFromDate: any;
  empLeaveToDate: any;
  leaveReason: any;
}

@Component({
  selector: 'app-leaves-employee',
  templateUrl: './leaves-employee.component.html',
  styleUrls: ['./leaves-employee.component.scss']
})
export class LeavesEmployeeComponent implements OnInit{
  leaveList: any;
  leaveBal:number=0;
  req:leaveRequest= {
    leaveTypeId: undefined,
    empLeaveFromDate: undefined,
    empLeaveToDate: undefined,
    leaveReason: undefined
  }
  formData = new FormGroup({
    leaveType: new FormControl(),
    empLeaveFromDate: new FormControl(),
    empLeaveToDate: new FormControl(),
    leaveReason: new FormControl(),
  });
  // selectedLeaveType: string|null=null;\
  selectedLeaveType: string="";
  allLeaves: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getLeaveType();
    this.getAllLeaves();
    this.leaveBal=Number(localStorage.getItem('leaves'))
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');

  }

  private getLeaveType() {

    this.apiService.getApiWithToken(this.cons.api.getAllLeaveType).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'CREATED') {
        this.leaveList=result['object'];
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


  applyLeave(formData: any) {
    let json= {
      'leaveTypeId': formData.leaveType,
      'empLeaveFromDate': this.common.convertDateToEpoch(formData.empLeaveFromDate),
      'empLeaveToDate': this.common.convertDateToEpoch(formData.empLeaveToDate),
      'leaveReason': formData.leaveReason
    }
    debugger;
    this.apiService.postApiWithToken(this.cons.api.createOrUpdate,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'CREATED') {

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

  private getAllLeaves() {
    this.apiService.getApiWithToken(this.cons.api.getAll).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'OK') {

          this.allLeaves=result['object'].employeeLeaveDTO;
          if(this.allLeaves!=undefined){
            for(let leave of this.allLeaves){
              if(leave.leaveVerifyByEmpId==undefined)
                leave.leaveStatus='Pending';
            }
          }

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
