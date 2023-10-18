import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit{
  formData = new FormGroup({
    department: new FormControl(),
    });
  private currentDepartment: any;
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
    this.common.getAllDepartment();
  }

  saveDepartment(value:any) {
    let json={
      empDepartmentName:value.department,
      isFlag: 1,
    }
    this.apiService.postApiWithToken(this.cons.api.departmentCreateOrUpdate,json).subscribe({
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
  updateDepartment(value:any) {
    let json={
      empDepartmentName:value.department,
      empDepartmentId: this.currentDepartment.empDepartmentId,
      isFlag: 1
    }
    this.apiService.postApiWithToken(this.cons.api.departmentCreateOrUpdate,json).subscribe({
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

  current(department: any) {
    this.currentDepartment=department;
  }

  delete(department: any) {
    let json={
      empDepartmentName:department.empDepartmentName,
      empDepartmentId: department.empDepartmentId,
      isFlag: 0
    }
    this.apiService.postApiWithToken(this.cons.api.departmentCreateOrUpdate,json).subscribe({
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
}
