import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-attendence-admin',
  templateUrl: './attendence-admin.component.html',
  styleUrls: ['./attendence-admin.component.scss']
})
export class AttendenceAdminComponent implements OnInit{

  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');

  }

}
