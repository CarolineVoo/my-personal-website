import { Component, OnInit } from '@angular/core';
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
    this.timeLine = dataTimeline;

  }

}
