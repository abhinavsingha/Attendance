import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-marital-status',
  templateUrl: './marital-status.component.html',
  styleUrls: ['./marital-status.component.scss']
})
export class MaritalStatusComponent implements OnInit{
  formData = new FormGroup({
    maritalStatus: new FormControl(),
  });
  private currentMaritalStatus: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    this.common.getMaritalStatus();
  }

  saveMaritalStatus(value:any) {
    let json={
      maritalStatusDesc:value.maritalStatus,
      isFlag:1,
    }
    this.apiService.postApiWithToken(this.cons.api.maritalStatusCreateOrUpdate,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.common.successAlert('Saved', result['message'], '');
          this.common.getMaritalStatus();
        } else {
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
  updateMaritalStatus(value:any) {
    let json={
      maritalStatusDesc:value.maritalStatus,
      isFlag:1,
      maritalStatusId:this.currentMaritalStatus.maritalStatusId
    }
    this.apiService.postApiWithToken(this.cons.api.maritalStatusCreateOrUpdate,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.common.successAlert('Updated', result['message'], '');
          this.common.getMaritalStatus();
        } else {
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

  delete(maritalStatus: any) {
    let json={
      maritalStatusDesc:maritalStatus.maritalStatusDesc,
      maritalStatusId:maritalStatus.maritalStatusId,
      isFlag:0
    }
    this.apiService.postApiWithToken(this.cons.api.maritalStatusCreateOrUpdate,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.common.successAlert('Deleted', result['message'], '');
          this.common.getMaritalStatus();
        } else {
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

  current(maritalStatus: any) {
    this.currentMaritalStatus=maritalStatus;
  }
}


