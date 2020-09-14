import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  Name = '';
  imageProfile = './assets/images/profile.jpg';
  constructor() { }

  ngOnInit(): void {
      const user = JSON.parse(localStorage.getItem('user')) ;
      this.Name = `${user.firstname}  ${user.lastname}`;
  }

}
