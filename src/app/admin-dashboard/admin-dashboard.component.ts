import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent  implements OnInit{

  ngOnInit(): void {
    $.getScript('../../assets/js/chart.js');
    $.getScript('../../assets/js/select2.min.js');

  }


}

