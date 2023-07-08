import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  animations: [
    trigger('rotateArrow', [
      state('close', style({transform: 'rotate(0)'})),
      state('open', style({transform: 'rotate(180deg)'})),
      transition('close => open', animate('400ms ease-out')),
      transition('open => close', animate('400ms ease-in'))
    ])
  ]
})
export class AboutMeComponent implements OnInit {

  showTimeline: boolean;
  animation: string;
  textTimeline: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.showTimeline = false;
    this.textTimeline = 'Open timeline';
    this.animation = 'close';
  }

  show() {  
    this.showTimeline = !this.showTimeline;
    this.animation = (this.animation === 'close' ? 'open' : 'close');
    this.textTimeline = (this.showTimeline ? 'Close timeline' : 'Open timeline');
  
  }

}
