import {Component, OnInit} from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import * as $ from "jquery";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit{
  formData = new FormGroup({
    designation: new FormControl(),
    outside: new FormControl()});
  private currentDesignation: any;
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
    this.common.getAllDesignation();

  }

  saveDesignation(value:any) {
    let json={
      empDesignationName:value.designation,
      empOutSideAttendance:value.outside,
      isFlag: 1
    }
    this.apiService.postApiWithToken(this.cons.api.designationcreateOrUpdate,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.common.successAlert('Saved', result['message'], '');

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

  updateDesignation(value:any) {
    let json={
      empDesignationName:value.designation,
      empOutSideAttendance:value.outside,
      isFlag: 1,
      empDesignationId: this.currentDesignation.empDesignationId,
    }
    this.apiService.postApiWithToken(this.cons.api.designationcreateOrUpdate,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.common.successAlert('Updated', result['message'], '');

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

  current(designation: any) {
    this.currentDesignation=designation;
  }

  delete(designation: any) {
    let json={
      empDesignationName:designation.empDesignationName,
      empOutSideAttendance:designation.empOutSideAttendance,
      isFlag: 0,
      empDesignationId: designation.empDesignationId,
    }
    this.apiService.postApiWithToken(this.cons.api.designationcreateOrUpdate,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'CREATED') {
          this.common.successAlert('Updated', result['message'], '');

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
}
