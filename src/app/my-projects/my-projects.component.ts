import { Component, OnInit } from '@angular/core';
import dataMyProjects from '../../assets/data/my-projects.json';

@Component({
  selector: 'my-projects',
  templateUrl: './index.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  projects: any;

  constructor() { }

  ngOnInit() {
    this.projects = dataMyProjects;
  }

}
