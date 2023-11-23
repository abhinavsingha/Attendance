import { Component, OnInit } from '@angular/core';
import { getScript } from 'jquery';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

class CalendarComp{
  day:number|undefined;
  title: string|undefined;
  punchIn: string|undefined;
  punchOut: string|undefined;
  isColour:string|undefined;
}

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
  daysInMonths: CalendarComp[]=[];
  private firstDayOfMonth: any;
  dashBoardResponseList: any;
  cal: any[]=[];
  currentDate: any;
  formattedMonth: string | null='';
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private datePipe:DatePipe
  ) {}

  ngOnInit(): void {
    // this.common.showToast();
    const currentDate = new Date();
    this.currentDate=currentDate;
    this.formattedMonth = this.datePipe.transform(this.currentDate, 'MMMM');

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    this.firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    debugger;
    for(let i=0;i<this.firstDayOfMonth.getDay();i++)
    {
      let blank:CalendarComp= {
        day: undefined,
        title: undefined,
        punchIn: undefined,
        punchOut: undefined,
        isColour: undefined
      }
      this.daysInMonths.push(blank);
    }

    // this.daysInMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    $.getScript('../../assets/js/jquery-ui.min.js');
    // $.getScript('../../assets/js/fullcalendar.min.js');
    // $.getScript('../../assets/js/jquery.fullcalendar.js');
debugger;
      // setTimeout(() => {
        // Redirect to another route after waiting for 3 seconds
        this.getMobileDashBoardData();
        this.getCalenderData(null);
      // }, 3000);


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
              // let count=0;
//               for(let att of this.dashboardData.dashBoardResponseList){
//                 count++;
//                 let entry:CalendarComp= {
//                   day: count + this.firstDayOfMonth.getDay(),
//                   title: att.title,
//                   punchIn: att.punchIn,
//                   punchOut: att.punchOut,
//                   isColour: att.isColor
//                 };
//                 this.daysInMonth.push(entry);
//               }
//
// debugger;
              for(let attendance of this.timing){
                if(Number(attendance.inTime)>this.epochStartTime){
                  this.todayInTime=this.common.convertEpochTo24HourFormat(attendance.inTime);
                  if(attendance.outTime!=undefined)
                    this.todayOutTime=this.common.convertEpochTo24HourFormat(attendance.outTime);
                  else
                    this.todayOutTime=' ';
                }
              }
            // this.common.faliureAlert('Please try later', result['message'], '');
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

  getCalenderData(date: string | null){
    let json={
      date:date
    }
    debugger;
    this.apiService.postApiWithToken(this.cons.api.getCalenderData,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'Success') {
          this.dashBoardResponseList=result['response'].dashBoardResponseList;
          let count=0;
          for(let att of this.dashBoardResponseList){
            count++;
            let entry:CalendarComp= {
              day: count,
              title: att.title,
              punchIn: att.punchIn,
              punchOut: att.punchOut,
              isColour: att.isColor
            };
            this.daysInMonths.push(entry);
          }
          this.cal=this.daysInMonths;
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
      complete: () => console.info(this.daysInMonths),
    });
  }
  getFifteenthOfPreviousMonth() {
    const today = this.currentDate;
    this.daysInMonths=[];
    this.cal=[];



    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 15);

    // Handle special case: if today is January, set the year to the previous year
    if (today.getMonth() === 0) {
      previousMonth.setFullYear(today.getFullYear() - 1);
    }
    for(let i=0;i<new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1).getDay();i++)
    {
      let blank:CalendarComp= {
        day: undefined,
        title: undefined,
        punchIn: undefined,
        punchOut: undefined,
        isColour: undefined
      }
      this.daysInMonths.push(blank);
    }
    this.currentDate=previousMonth;
    this.formattedMonth = this.datePipe.transform(this.currentDate, 'MMMM');
    let previousMonthDate:string | null=this.datePipe.transform(previousMonth,'dd/MM/yyyy');

    this.getCalenderData(previousMonthDate);
  }
  getNextMonthDate() {
    const today = this.currentDate;
    this.daysInMonths=[];
    this.cal=[];
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);

    // If the 15th of next month is after the end of the next month, adjust the date to the last day of the next month
    if (nextMonth.getMonth() !== (today.getMonth() + 1) % 12) {
      nextMonth.setMonth((today.getMonth() + 1) % 12);
      nextMonth.setDate(0);
    }
    for(let i=0;i<new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).getDay();i++)
    {
      let blank:CalendarComp= {
        day: undefined,
        title: undefined,
        punchIn: undefined,
        punchOut: undefined,
        isColour: undefined
      }
      this.daysInMonths.push(blank);
    }
    this.currentDate=nextMonth;
    this.formattedMonth = this.datePipe.transform(this.currentDate, 'MMMM');
    let nextMonthDate:string | null=this.datePipe.transform(nextMonth,'dd/MM/yyyy');

    this.getCalenderData(nextMonthDate);
  }
  redirectToLeave() {
    this.router.navigate(["/leaves-employee"]);
  }

}
