import { Component,OnInit } from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  formDataBasic= new FormGroup({
    name: new FormControl(),
    gender: new FormControl(),
    dob: new FormControl(),
    phone: new FormControl(),
    designation: new FormControl(),
  });
  profileData: any;
  gender: any;
  department: any;
  designation: any;
  userDesignation: any;
  numbers: any[]=[];
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
    this.getProfileData();
    this.getGender();
    // this.getDepartment();
    this.getDesignation();


  }

  private getProfileData() {
      this.apiService.getApiWithToken(this.cons.api.getProfileComplete).subscribe({
          next: (v: object) => {
            this.SpinnerService.hide();
            let result: { [key: string]: any } = v;

            if (result['message'] == 'Success') {
              this.profileData=result['object'];
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
        }
      );
  }
  updateBasicInfo(){
    for(let i=0;i<this.designation.length;i++){
      if(this.profileData.empDesignation.empDesignationId==this.designation[i].empDesignationId) {
        this.userDesignation = this.designation[i];
      }
      i++;
    }
    for(let i=0;i<this.gender.length;i++){

    }
    let json=this.profileData.employeeSubDetails;
    debugger;
  }
  getGender(){

    this.apiService.getApiWithToken(this.cons.api.getAllGender).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['message'] == 'CREATED') {
            this.gender=result['object'];
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
      }
    );
  }

  private getDepartment() {

    this.apiService.getApiWithToken(this.cons.api.getAllDepartment).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['message'] == 'CREATED') {
            this.department=result['object'];
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
      }
    );
  }
  private getDesignation() {

    this.apiService.getApiWithToken(this.cons.api.getAllDesignation).subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          if (result['message'] == 'CREATED') {
            this.designation=result['object'];
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
      }
    );
  }
}
