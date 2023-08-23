import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves-employee',
  templateUrl: './leaves-employee.component.html',
  styleUrls: ['./leaves-employee.component.scss']
})
export class LeavesEmployeeComponent implements OnInit{

  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');

  }


}
