import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import dataTimeline from '../../../../assets/data/timeline.json';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  
  timeLine: any;

  constructor() { }

  ngOnInit() {
    AOS.init();
    this.timeLine = dataTimeline;

  }

}
