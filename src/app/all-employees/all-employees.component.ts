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
    cAddressL1: new FormControl(),
    cAddressL2: new FormControl(),
    cAddressL3: new FormControl(),
    cAddressL4: new FormControl(),
    pAddressL1: new FormControl(),
    pAddressL2: new FormControl(),
    pAddressL3: new FormControl(),
    pAddressL4: new FormControl(),
    checked: new FormControl(),
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
      dateOfJoiningString: value.joinDate,
      department: value.department.empDepartmentId,
      designation: value.designation.empDesignationId,
      emailId: value.email,
      empCurrentAddress: {
        addressLine1: value.cAddressL1,
        addressLine2: value.cAddressL2,
        locality: value.cAddressL3,
        pinCode: value.cAddressL4,
        mobileNo: value.phone,
      },
      empDob: value.dob,
      empName: value.name,
      empPassword: value.password,
      empPermanentAddress: {
        addressLine1: value.pAddressL1,
        addressLine2: value.pAddressL2,
        locality: value.pAddressL3,
        pinCode: value.pAddressL4,
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

        if (result['httpStatus'] == 'CREATED') {
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

  checkedSame(value: any) {
    if(!value.checked){
      this.formData.get('pAddressL1')?.setValue(this.formData.get('cAddressL1')?.value);
      this.formData.get('pAddressL2')?.setValue(this.formData.get('cAddressL2')?.value);
      this.formData.get('pAddressL3')?.setValue(this.formData.get('cAddressL3')?.value);
      this.formData.get('pAddressL4')?.setValue(this.formData.get('cAddressL4')?.value);
    }
    else{
      this.formData.get('pAddressL1')?.reset();
      this.formData.get('pAddressL2')?.reset();
      this.formData.get('pAddressL3')?.reset();
      this.formData.get('pAddressL4')?.reset();
    }
  }

  editDetails(emp: any) {
    this.formData.get('email')?.setValue(emp.emailId);
    this.formData.get('name')?.setValue(emp.empName);
    this.formData.get('name')?.setValue(emp.empName);
    this.formData.get('password')?.setValue(emp.empPassword);
    this.formData.get('password1')?.setValue(emp.empPassword);
    this.formData.get('accNo')?.setValue(emp.employeeSubDetails.bankAccountNo);
    this.formData.get('joinDate')?.setValue((emp.employeeSubDetails.dateOfJoining));
    this.formData.get('dob')?.setValue((emp.employeeSubDetails.empDob));

    this.formData.get('phone')?.setValue(emp.mobileNo);
    this.formData.get('pan')?.setValue(emp.employeeSubDetails.panNo);
    this.formData.get('pfNo')?.setValue(emp.employeeSubDetails.pfAccNo);
    this.formData.get('uanNo')?.setValue(emp.employeeSubDetails.uanNo);
    this.formData.get('cAddressL1')?.setValue(emp.employeeSubDetails.empCurrentAddress.addressLine1);
    this.formData.get('cAddressL2')?.setValue(emp.employeeSubDetails.empCurrentAddress.addressLine2);
    this.formData.get('cAddressL3')?.setValue(emp.employeeSubDetails.empCurrentAddress.locality);
    this.formData.get('cAddressL4')?.setValue(emp.employeeSubDetails.empCurrentAddress.pinCode);
    this.formData.get('pAddressL1')?.setValue(emp.employeeSubDetails.empPermanentAddress.addressLine1);
    this.formData.get('pAddressL2')?.setValue(emp.employeeSubDetails.empPermanentAddress.addressLine2);
    this.formData.get('pAddressL3')?.setValue(emp.employeeSubDetails.empPermanentAddress.locality);
    this.formData.get('pAddressL4')?.setValue(emp.employeeSubDetails.empPermanentAddress.pinCode);

    for(let rol of this.common.role){
      if (JSON.stringify(rol) === JSON.stringify(emp.masterEmpRole)) {
        this.formData.get('role')?.setValue(rol);
      }
    }
    for(let des of this.common.designations){
      if (JSON.stringify(des) === JSON.stringify(emp.empDesignation)) {
        this.formData.get('designation')?.setValue(des);
      }
    }
    for(let gen of this.common.gender){
      if (JSON.stringify(gen) === JSON.stringify(emp.employeeSubDetails.gender)) {
        this.formData.get('gender')?.setValue(gen);
      }
    }
    for(let dep of this.common.departments){
      if (JSON.stringify(dep) === JSON.stringify(emp.employeeSubDetails.gender)) {
        this.formData.get('gender')?.setValue(dep);
      }
    }

    debugger;
  }
}
