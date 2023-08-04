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
  private lastKey: string;

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
    this.snake = [500, 540, 580];
    this.keyEventMove('ArrowDown');
    this.setBall();
  }

  //Keyboard Event Move
  keyEventMove(keyEvent: string): void {
    if(keyEvent == 'ArrowDown' || keyEvent == 'ArrowUp' ||
      keyEvent == 'ArrowRight' || keyEvent == 'ArrowLeft') {

        //Validate key event
        if(keyEvent == this.lastKey) {
          return;
        }

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

        this.lastKey = keyEvent;
      
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

          if(this.snakeHittedBall(head)) {
            tempSnake.push(this.snake[lastPosition]);
            this.setBall();
          }

          this.setActiveIndexBoard(tempSnake);
          this.snake = tempSnake;
        }, 200);

    
    }
  }

  //Keyboard Event Move
  setActiveIndexBoard(snake: Array<number>): void {
    this.clearActivePixels();

    snake.forEach(x => {
      const index = x - 1;

      //Game over
      if(this.pixelBoard[index].corner) {
        this.clearIntervals();
        console.log('GAME OVER');
        // return;
      }

      this.pixelBoard[index].active = true;
    
    });
  }

  //Clears all intervals
  setBall(): void {
    this.pixelBoard.forEach(x => {
      x.ball = false;
    });

    let ballIndex = Math.floor(Math.random() * 1000);
    const board = this.pixelBoard[ballIndex];

    if(board.corner || board.active) {
      this.setBall();
      return;
    }

    board.ball = true;

    this.pixelBoard[ballIndex] = board;
  }

  //Check if snake hits the ball 
  snakeHittedBall(head: number): boolean {
    let isBall = false;
    const pixel = this.pixelBoard.find(x => x.index == head);
    if(pixel.ball) {
      isBall = true;
    }
    return isBall;
  }

  //Generates the board
  generateBoardPixels(): void {
    for(var i = 1; i <= 1000; i++) {
      let pixelBoard = {
        index: i, active: false, corner: false, ball: false
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
