import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'timeline-box',
  templateUrl: './timeline-box.component.html',
  styleUrls: ['./timeline-box.component.css']
})
export class TimelineBoxComponent implements OnInit {
  @Input() position: string;
  @Input() image: string;
  @Input() title: string;
  @Input() content: string;
  @Input() yearFromTo: string;

  constructor() { }

  ngOnInit() {

  }

}
