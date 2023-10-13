import { Component, OnInit } from '@angular/core';
import { getScript } from 'jquery';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit{
  dashboardData: any;
  todayInTime: any;
  private timing: any;
  private epochStartTime: number=0;
  todayOutTime: any;
  daysInMonth: number[]=[];
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    debugger;
  $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
   this.getMobileDashBoardData();
 }

  private getMobileDashBoardData() {
    this.apiService.getApiWithToken(this.cons.api.getMobileDashBoardData).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['message'] == 'Success') {
            this.dashboardData=result['response'];
            this.timing=this.dashboardData.empAttenaceList;
            localStorage.setItem('leaves',this.dashboardData.employeeLeaveBalance.empTotalLeaveBalance)
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
              this.epochStartTime = today.getTime();
              for(let attendance of this.timing){
                if(Number(attendance.inTime)>this.epochStartTime){
                  this.todayInTime=this.common.convertEpochTo24HourFormat(attendance.inTime);
                  if(attendance.outTime!=undefined)
                    this.todayOutTime=this.common.convertEpochTo24HourFormat(attendance.outTime);
                  else
                    this.todayOutTime=' ';
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
      }
    );
  }

  redirectToLeave() {
    this.router.navigate(["/leaves-employee"]);
  }
}
