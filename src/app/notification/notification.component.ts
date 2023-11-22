import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');

  }
}
