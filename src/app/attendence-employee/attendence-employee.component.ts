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

    this.getLocation()

  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
