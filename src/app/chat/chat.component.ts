import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    $.getScript('../../assets/js/dropfiles.js')

  }
}
