import { Component, OnInit } from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
  notificationSent: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
  ) {}
  formData= new FormGroup({
    message: new FormControl(),
    title: new FormControl(),
  });
  empList:any[]=[];
  mobileNumberList:string[]=[];
  mobileNumber: string='';
  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    this.common.getAllEmployee();
    this.populateEmpList();
    this.getAllBroadCastSelfNotification()
  }

  private populateEmpList() {
    if(this.common.allEmpList!=undefined){
      this.empList=this.common.allEmpList;
      debugger;
      return;
    }
    else{
      const delayMilliseconds = 1000;
      setTimeout(() => {
        // Reload the page
        this.populateEmpList();
      }, delayMilliseconds);


    }
  }

  sendNotification(value:any) {
    debugger;
    this.mobileNumberList=[];
    this.mobileNumberList.push(this.mobileNumber);
    if(this.mobileNumber!='all'){
      let json={
        title:value.title,
        msg:value.message,
        imagePath:'',
        mobileNumber:this.mobileNumberList
      }
      this.apiService.postApiWithToken(this.cons.api.createNotification,json).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['httpStatus'] == 'CREATED') {
            this.common.successAlert('Notification Sent',result['message'],'')
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
    else{
      let json={
        title:value.title,
        msg:value.message,
        imagePath:'',
      }
      this.apiService.postApiWithToken(this.cons.api.createNotificationForAll,json).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['httpStatus'] == 'CREATED') {
            this.common.successAlert('Notification Sent',result['message'],'')
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

  private getAllBroadCastSelfNotification() {
    this.apiService.getApiWithToken(this.cons.api.getAllBroadCastSelfNotification).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'CREATED') {
          this.notificationSent=result['object'].notificationData;
        } else {
          this.common.faliureAlert('Please reload', result['message'], '');
        }
      },
      error: (e) => {
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }
}
