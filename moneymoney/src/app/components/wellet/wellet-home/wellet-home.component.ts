import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wellet-home',
  templateUrl: './wellet-home.component.html',
  styleUrls: ['./wellet-home.component.scss']
})
export class WelletHomeComponent implements OnInit {

  isWellet = false;
  constructor() { }

  ngOnInit(): void {
  }

}
