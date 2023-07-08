import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init();
  }

}
