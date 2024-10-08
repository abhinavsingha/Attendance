import {Component, OnInit} from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import { NgxSpinnerService } from 'ngx-spinner';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
  ) {}

  formData = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {

  }
  login(){
    // this.router.navigate(['/employee-dashboard']);
    // [routerLink]="['admin-dashboard']"
    let json={
      username:this.formData.get('username')?.value,
      password:this.formData.get('password')?.value
    }
    this.SpinnerService.show();
    this.apiService.postApi(this.cons.api.login,json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'Success') {
          localStorage.setItem('token',result['token']);
          debugger;
          localStorage.setItem('detail',result['details']);
          localStorage.setItem('empName',result['details'].empName);
          localStorage.setItem('phone',result['details'].mobileNo);
          localStorage.setItem('role',result['details'].masterEmpRole.roleDescr);
          localStorage.setItem('photo',result['details'].photo);
          if(result['details'].masterEmpRole.empRoleId=='300')
            this.router.navigate(['/admin-dashboard']);
          else if(result['details'].masterEmpRole.empRoleId=='200')
            debugger;
            this.router.navigate(['/employee-dashboard']);
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
          this.SpinnerService.hide();

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
