import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import dataWorkExperiences from '../../../assets/data/work-experience.json';

@Component({
  selector: 'work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  @ViewChild('one', {static: true}) one: ElementRef;
  @ViewChild('two', {static: true}) two: ElementRef;
  
  workExperiences: any;
  sectionWorkExperience = ['first', 'second'];
  hobbySections = []
  level: number;
  show: boolean;
  first: number;
  end: number;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.workExperiences = dataWorkExperiences;
    this.show = true;
    this.level = 0;
    this.activePage(this.level);
  }

  refresh() {
    this.show = false;
    this.changeDetectorRef.detectChanges();
    this.show = true;
  }

  Next() {
    this.refresh();

    if(this.level === 1) {
      this.level = 0;
      this.activePage(this.level);
      return;
    }
    this.level += 1;

    this.activePage(this.level);
  }

  Previous() {
    this.refresh();

    if(this.level === 0) {
      this.level = 1;
      this.activePage(this.level);
      return;
    }
    this.level -= 1;
    this.activePage(this.level);
  }

  setLevel(num: number) {
    this.refresh();
    this.level = num;
    this.activePage(num);
  }

  activePage(level: number) {
    switch(level) {
      case 0: 
        this.one.nativeElement.style.background = '#3f5751';
        this.two.nativeElement.style.background = '#d8ede7';
        this.one.nativeElement.style.transform = 'scale(1.5)';
        this.two.nativeElement.style.transform = 'scale(1)';
        this.first = 0;
        this.end = 4;
        break;
      case 1: 
        this.one.nativeElement.style.background = '#d8ede7';
        this.two.nativeElement.style.background = '#3f5751';
        this.one.nativeElement.style.transform = 'scale(1)';
        this.two.nativeElement.style.transform = 'scale(1.5)';
        this.first = 4;
        this.end = 6;
        break;
    }
  }

}
