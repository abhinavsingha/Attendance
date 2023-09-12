import { Component, OnInit } from '@angular/core';
import { getScript } from 'jquery';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit{
 ngOnInit(): void {
  $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
 }
}
