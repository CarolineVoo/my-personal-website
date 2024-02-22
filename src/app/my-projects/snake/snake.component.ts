import { Component, HostListener, OnInit } from '@angular/core';
import { BoardModel, CornerModel } from './models/board.model';
import {Router} from "@angular/router"

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit{
  public pixelBoard: Array<BoardModel>;
  public corner: CornerModel;
  public points: number;
  public scoreBoard: string;
  public snake: Array<number>;
  public activeMoveKeyEvent: boolean;
  public activeGameOverKeyEvent: boolean;
  private moveInterval: any;
  private gameOverInterval: any;
  private lastKey: string;
  public showMenuScreen: boolean;
  public showGameScreen: boolean;
  public showGameOverScreen: boolean;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initGame();
  }

  //Keyboard Event
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.activeMoveKeyEvent) {
      this.keyEventMove(event.key);
    }

    if(this.activeGameOverKeyEvent) {
      this.keyEventGameOver(event.key)
    }
  }

  initGame(): void {
    this.showMenuScreen = true;
    this.showGameScreen = false;
    this.showGameOverScreen = false;
    this.activeGameOverKeyEvent = false;

    setTimeout(() => {
      this.showMenuScreen = false;
      this.showGameScreen = true;
      this.startGame();
    }, 4000);
  }

  //Game Start - Snake position in middle 
  startGame(): void {
    this.pixelBoard = new Array();
    this.snake = new Array();
    this.generateBoardPixels();
    this.lastKey = null;

    this.activeMoveKeyEvent = true;
    this.snake = [100, 140, 180];
    this.points = 0;
    this.scoreBoard = '0000';

    this.keyEventMove('ArrowDown');
    this.setBall();
  }

  //Keyboard Event Move
  keyEventMove(keyEvent: string): void {
    if(!this.activeMoveKeyEvent) {
      return;
    }

    if(keyEvent === 'ArrowDown' || keyEvent === 'ArrowUp' ||
      keyEvent === 'ArrowRight' || keyEvent === 'ArrowLeft') {

        //Validate key event
        if(this.isKeyEventNotValid(keyEvent,this.lastKey)) {
          return;
        }
        this.clearIntervals();
      
        this.moveInterval = setInterval(() => {
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
          
          let tempSnake = [];
          let lastPosition = this.snake.length - 1;
          let head = this.snake[0] + step;

          tempSnake.push(head);
          
          this.snake.forEach((position, index) => {
            if(index != lastPosition) {
              tempSnake.push(position);
            }
          });

          if(this.snakeHitBall(head)) {
            tempSnake.push(this.snake[lastPosition]);
            this.setBall();
          }

          if(this.snakeHitCornerOrItself(head)) {
            this.gameOver();
            return;
          }

          this.setActiveIndexBoard(tempSnake);

          this.snake = tempSnake;
        }, 150);
    }
  }

  //Keyboard Event Move
  setActiveIndexBoard(snake: Array<number>): void {
    this.clearActivePixels();
    snake.forEach(x => {
      const index = x - 1;
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
  snakeHitBall(head: number): boolean {
    let isBall = false;
    const pixel = this.pixelBoard.find(x => x.index === head);
    if(pixel.ball) {
      isBall = true;
      this.setPoints();
    }
    return isBall;
  }

  //Check if snake hits the corner
  snakeHitCornerOrItself(head: number): boolean {
    let isHit = false;
    const pixel = this.pixelBoard.find(x => x.index === head);
    if(pixel.corner || pixel.active) {
      isHit = true;
    }
    return isHit;
  }

  //Points
  setPoints(): void {
    this.points++;
    let result = this.points.toString().padStart(4, '0');
    this.scoreBoard = result;
  }

  //Game over
  gameOver(): void {
    this.activeMoveKeyEvent = false;
    this.clearIntervals();
    this.gameOverInterval = setInterval(() => {
        this.snake.forEach(x => {
          let pixel = this.pixelBoard.find(s => s.index === x)
          pixel.active = false;
        });
        setTimeout(() => {
          this.snake.forEach(x => {
            let pixel = this.pixelBoard.find(s => s.index === x)
            pixel.active = true;
          })
        }, 100);
      }, 300);

    setTimeout(() => {
      clearInterval(this.gameOverInterval);
    }, 4000);

    setTimeout(() => {
      this.showGameOverScreen = true;
      this.showGameScreen = false;
      this.activeGameOverKeyEvent = true;
    }, 5000);
  }

  keyEventGameOver(keyEvent: string): void {    
    if(!this.activeGameOverKeyEvent) {
      return;
    }

    if(keyEvent === 'ArrowRight' || keyEvent === 'ArrowLeft') {
      switch(keyEvent) {
        case 'ArrowLeft':
          this.activeGameOverKeyEvent = false;
          this.showGameScreen = true;
          this.showGameOverScreen = false;
          this.startGame();
          break;
        case 'ArrowRight':
          this.router.navigate(['/my-projects/']);
          break;
      }
    }
  }

  //Generates the board
  generateBoardPixels(): void {
    for(var i = 1; i <= 1000; i++) {
      let pixelBoard = {
        index: i, active: false, corner: null, ball: false
      }

      //Top corner
      if(i < 40 && i !== 1) { 
        let corner = {
          position: 'top'
        }
        pixelBoard.corner = corner;
      }
      
      //Bottom corner
      if(i > 961 && i < 1000) { 
        let corner = {
          position: 'bottom'
        }
        pixelBoard.corner = corner;
      }

      //Vertical corners
      for(var j = 1; j < 25; j++) {

        //Left corner
        if(((40 * j) + 1) === i && i !== 961) {
          let corner = {
            position: 'left'
          }
          pixelBoard.corner = corner;
        }
        //Right corner
        if(((40 * j) === i) && i !== 1000) {
          let corner = {
            position: 'right'
          }
          pixelBoard.corner = corner;
        }
      }

      //1, 40, 961, 1000
      if(i === 1 || i === 40 || i === 961 || i === 1000) {
        let corner = {
          position: ''
        }
        pixelBoard.corner = corner;
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

  //Validates the key event
  isKeyEventNotValid(keyEvent: string, lastKey: string): boolean {
    let isNotValid = false;

    if(keyEvent === lastKey) {
      isNotValid = true;
    }

    if(keyEvent === 'ArrowDown' && lastKey === 'ArrowUp') {
      isNotValid = true;
    }

    if(keyEvent === 'ArrowUp' && lastKey === 'ArrowDown') {
      isNotValid = true;
    }

    if(keyEvent === 'ArrowRight' && lastKey === 'ArrowLeft') {
      isNotValid = true;
    }

    if(keyEvent === 'ArrowLeft' && lastKey === 'ArrowRight') {
      isNotValid = true;
    }
    return isNotValid;
  }

}
