import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrls: ['./employee-directory.component.scss']
})
export class EmployeeDirectoryComponent implements OnInit{
  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    $.getScript('../../assets/js/dropfiles.js')

  }
}