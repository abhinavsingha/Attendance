import {Component, OnInit} from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  name: any;
  photo: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.name=localStorage.getItem('role');
    this.photo=localStorage.getItem('photo');
  }


  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('photo');
  }
  redirect(){
    localStorage.removeItem('phoneToEdit');
    localStorage.removeItem('redirect');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate back to the original route
      this.router.navigateByUrl('/profile');
    });
  }
}
