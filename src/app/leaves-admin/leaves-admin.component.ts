import { Component,OnInit } from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {AllEmployeesComponent} from "../all-employees/all-employees.component";

@Component({
  selector: 'app-leaves-admin',
  templateUrl: './leaves-admin.component.html',
  styleUrls: ['./leaves-admin.component.scss']
})
export class LeavesAdminComponent implements OnInit{
  public allEmployee: any;
  employee: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    public empList:AllEmployeesComponent,
    ) {}
  ngOnInit(): void {
    debugger;
    this.common.getAllEmployee();
    debugger;
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');

  }


  changeSelect() {
    console.log(this.employee);
  }
}
