import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-attendence-employee',
  templateUrl: './attendence-employee.component.html',
  styleUrls: ['./attendence-employee.component.scss']
})
export class AttendenceEmployeeComponent implements OnInit{

  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');

  }

}
