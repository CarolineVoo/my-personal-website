import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutCarolineComponent } from './about-caroline/about-caroline.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { TicTacToeComponent } from './my-projects/tic-tac-toe/tic-tac-toe.component';
import { SnakeComponent } from './my-projects/snake/snake.component';

const routes: Routes = [
  {path: '', component: AboutCarolineComponent},
  {path: 'my-projects', component: MyProjectsComponent},
  {path: 'my-projects/tic-tac-toe', component: TicTacToeComponent},
  {path: 'my-projects/snake', component: SnakeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
