import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit{
  allEmpList: any;
  formData = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    password1: new FormControl(),
    joinDate: new FormControl(),
    phone: new FormControl(),
    department: new FormControl(),
    designation: new FormControl(),
    dob: new FormControl(),
    cAddress: new FormControl(),
    pAddress: new FormControl(),
    gender: new FormControl(),
    pan: new FormControl(),
    accNo: new FormControl(),
    pfNo: new FormControl(),
    uanNo: new FormControl(),
    role: new FormControl(),
  });
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
    this.common.getAllEmployee();
    this.common.getAllDepartment();
    this.common.getAllDesignation();
    this.common.getGender();
    this.common.getAllRole();

  }

  createJson(value: any) {
    let json={
      bankAccountNo: value.accNo,
      dateOfJoining: value.joinDate,
      department: value.department.empDepartmentId,
      designation: value.designation.empDesignationId,
      emailId: value.email,
      empCurrentAddress: {
        addressLine1: value.cAddress,
        addressLine2: value.cAddress,
        mobileNo: value.phone,
      },
      empDob: value.dob,
      empName: value.name,
      empPassword: value.password,
      empPermanentAddress: {
        addressLine1: value.pAddress,
        addressLine2: value.pAddress,
        mobileNo: value.phone,
      },
      gender: value.gender.genderId,
      mobileNo: value.phone,
      panNo: value.pan,
      pfAccNo: value.pfNo,
      // photo: "string",
      uanNo: value.uanNo,
      masterEmpRoleDTO:value.role
    }
    debugger;
    this.apiService.postApiWithToken(this.cons.api.createOrUpdateEmployee,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'ACCEPTED') {
          this.common.successAlert('Success', result['message'], '');
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

  updateJson(value: any) {
    debugger;
  }
}
