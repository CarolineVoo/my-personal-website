import { Component, HostListener, OnInit } from '@angular/core';
import { BoardModel } from './models/board.model';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit{
  public pixelBoard: Array<BoardModel>;
  public snake: Array<number>;
  private initMove: any;

  ngOnInit(): void {
    this.pixelBoard = new Array();
    this.snake = new Array();
    this.generateBoardPixels();

    this.startGame();
    console.log(this.pixelBoard)
  }

  //Keyboard Event
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    this.keyEventMove();
  }

  //Game Start - Snake position in middle 
  startGame(): void {
    const startPosition = 500;
    const activeBoard = this.pixelBoard.find(s => s.index == startPosition);
    this.snake.push(startPosition);
    activeBoard.active = true;

    this.initMove = setInterval(() => {
      console.log('Init');
    }, 2000);
  }

  //Keyboard Event Move
  keyEventMove(): void {
    clearInterval(this.initMove);
    this.clearActivePixels();
    setInterval(() => {
      console.log('Move');
    }, 2000);
  }

  //Keyboard Event Move
  setActiveIndexBoard(actives: Array<number>): void {
  
  }

  //Generates the board
  generateBoardPixels(): void {
    for(var i = 1; i <= 1000; i++) {
      let pixelBoard = {
        index: i, active: false, corner: false
      }

      //Horizontal corners
      if(i <= 40 || i > 960) { 
        pixelBoard.corner = true;
      }

      //Vertical corners
      for(var j = 1; j < 25; j++) {
        if(((40 * j) + 1) == i || (40 * j) == i) { 
          pixelBoard.corner = true;
        }
      }

      this.pixelBoard.push(pixelBoard);
    }
  }

  //Clears the active pixels
  clearActivePixels(): void {
    for(var i = 0; i < 1000; i++) {
      this.pixelBoard[i].active = false;
    }
  }

}
