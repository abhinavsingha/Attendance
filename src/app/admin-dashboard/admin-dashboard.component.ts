import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent  implements OnInit{
  dashboardData: any;
  name: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.name=localStorage.getItem('empName');
    this.common.getDashboardData();
    debugger;
    debugger;
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/chart.js');
    $.getScript('../../assets/js/select2.min.js');

  }
}

