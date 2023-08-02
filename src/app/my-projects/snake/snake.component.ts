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
  private moveInterval: any;

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
    this.keyEventMove(event.key);
  }

  //Game Start - Snake position in middle 
  startGame(): void {
    this.snake = [500, 540, 580, 620, 660];
    this.keyEventMove('ArrowDown')
  }

  //Keyboard Event Move
  keyEventMove(keyEvent: string): void {
    this.clearIntervals();
    let step;

    switch(keyEvent) {
      case 'ArrowDown':
        step = 40;
        break;
      case 'ArrowUp':
        step = -40;
        break;
      case 'ArrowRight':
        step = 1;
        break;
      case 'ArrowLeft':
        step = -1;
        break;
    }
  
    this.moveInterval = setInterval(() => {
      let tempSnake = [];
      let lastPosition = this.snake.length - 1;
      let head = this.snake[0] + step;

      tempSnake.push(head);
      
      this.snake.forEach((position, index) => {
        if(index != lastPosition) {
          tempSnake.push(position);
        }
      });
      console.log(tempSnake);

      this.setActiveIndexBoard(tempSnake);
      this.snake = tempSnake;
    }, 500);
  }

  //Keyboard Event Move
  setActiveIndexBoard(snake: Array<number>): void {
    this.clearActivePixels();

    snake.forEach(x => {
      const index = x - 1;
      this.pixelBoard[index].active = true;

      //Hits the corner
      if(this.pixelBoard[index].corner) {
        this.clearIntervals();
        this.pixelBoard[index].active = false;
        console.log('GAME OVER');
        return;
      }
    });
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

  //Clears all intervals
  clearIntervals(): void {
    clearInterval(this.moveInterval);
  }

}
