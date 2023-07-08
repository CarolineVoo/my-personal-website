import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './about-caroline/header/header.component';
import { IntroComponent } from './about-caroline/intro/intro.component';
import { TimelineComponent } from './about-caroline/about-me/timeline/timeline.component';
import { TimelineBoxComponent } from './about-caroline/about-me/timeline/timeline-box/timeline-box.component';
import { HobbyComponent } from './about-caroline/hobby/hobby.component';
import { AboutMeComponent } from './about-caroline/about-me/about-me.component';
import { AboutCarolineComponent } from './about-caroline/about-caroline.component';
import { TechSkillsComponent } from './about-caroline/tech-skills/tech-skills.component';
import { WorkExperienceComponent } from './about-caroline/work-experience/work-experience.component';
// import { FooterComponent } from './about-caroline/footer/footer.component';
// import { ProjectsComponent } from './about-caroline/projects/projects.component';
// import { MyProjectsComponent } from './my-projects/my-projects.component';
// import { TicTacToeComponent } from './my-projects/tic-tac-toe/tic-tac-toe.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroComponent,
    TimelineComponent,
    TimelineBoxComponent,
    HobbyComponent,
    AboutMeComponent,
    AboutCarolineComponent,
    TechSkillsComponent,
    WorkExperienceComponent,
    // FooterComponent,
    // ProjectsComponent,
    // MyProjectsComponent,
    // TicTacToeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
