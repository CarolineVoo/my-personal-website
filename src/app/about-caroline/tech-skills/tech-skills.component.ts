import { Component, OnInit } from '@angular/core';
import dataTechnologies from '../../../assets/data/technology.json';

@Component({
  selector: 'tech-skills',
  templateUrl: './tech-skills.component.html',
  styleUrls: ['./tech-skills.component.css']
})
export class TechSkillsComponent implements OnInit {

  technology: any;
  arrSkill = [];
  showMore = false;
  showMoreBtnTxt: string;
  cssHide: string;

  constructor() { }

  ngOnInit() {
    this.technology = dataTechnologies;
    this.createSkill();
    this.cssHide = 'hide-content';
    this.showMoreBtnTxt = 'Show more';
  }

  
  createSkill(): void {
    this.technology.map((item: any, index: number) => {
      item.skills.map((x: any)=> {
        let numOfRest = 5 - x.num;
        for(let i = 0; i < x.num; i++) {
          x.level[i] = x.num;
        }

        for(let i = 0; i < numOfRest; i++) {
          x.noLevel[i] = numOfRest;
        }
      })
    })
  }

  public onShowMore(): void {
    this.showMore = !this.showMore;
    this.cssHide = !this.showMore ? 'hide-content animation-close' : 'animation-open'
    this.showMoreBtnTxt =  !this.showMore ? 'Show more' : 'Show less';
  }



}
