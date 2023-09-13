import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  name: any;
  photo: any;
  ngOnInit(): void {
    this.name=localStorage.getItem('role');
    this.photo=localStorage.getItem('photo');
  }



}
