import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewRef } from '@angular/core';
import ticTacToeData from '../../../assets/data/tic-tac-toe.json';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit, AfterViewInit {
  public ticTacToeBoard;
  private ticTacToeWinningResult;
  public startPage: boolean;
  public computerModeActive: boolean;
  public playerTwosTurn: boolean;
  public playersTurnTxt: string;
  public gameOver: boolean;
  public newGame: boolean;
  public winnerTxt: string;
  public disableBoard: boolean;

  selectedRowPlayerOne = [];
  selectedRowPlayerTwo = [];
  availableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  chosenRows = [];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.ticTacToeBoard = ticTacToeData.board;
    this.ticTacToeWinningResult = ticTacToeData.winning;
    this.startPage = true;
    this.playerTwosTurn = false;
    this.disableBoard = false;
    this.playersTurnTxt = this.playerTwosTurn ? "Player 2" : "Player 1";
    this.restart();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.ref && !(this.ref as ViewRef).destroyed) {
        this.ref.detectChanges();
      }
    });
  }

  public setMode(mode: string): void {
    this.startPage = false;
    if(mode === 'onePlayer') {
      this.computerModeActive = true;
      this.restart();
      console.log('onePlayer');
    }

    if(mode === 'twoPlayers') {
      this.computerModeActive = false;
      this.restart();
      console.log('twoPlayers');
    }
  }

  public selectRow(index: number): void {
    this.insertSelectedRow(index);

    if(this.computerModeActive) {
      this.disableBoard = true;
      setTimeout(() => {
        this.insertComputerSelection();
      }, 1000);
    }
  }

  private insertComputerSelection(): void {
    const randomRow = Math.floor(Math.random() * this.availableRows.length);
    let index = this.availableRows[randomRow];

    if(this.chosenRows.length >= 3) {
      for(let i = 0; i < this.ticTacToeWinningResult.length; i++) {
        let rowArray = [];
        
        for(let j = 0; j < this.selectedRowPlayerOne.length; j++) {
          const row = this.ticTacToeWinningResult[i].find(x => x === this.selectedRowPlayerOne[j]);
          if(row) {
            rowArray.push(row);
          }
        }

        if(rowArray.length >= 2) {
          const almostThreeInRow = this.ticTacToeWinningResult[i];
          for(let j = 0; j < almostThreeInRow.length; j++) {
            const checkAlreadySelectedRow = this.chosenRows.find(x => x === almostThreeInRow[j]);
            if(!checkAlreadySelectedRow && checkAlreadySelectedRow === undefined) {
              index = almostThreeInRow[j];
            }
          }
        } 
      }

    }

    this.insertSelectedRow(index);
    this.disableBoard = false;
  } 


  private checkThreeInARow(selected: Array<number>) {
    const chosenRow = selected;

    this.checkTie();

    if(chosenRow.length >= 3) {
      for(let i = 0; i < this.ticTacToeWinningResult.length; i++) {
        let arrayThreeInARow = [];
        
        for(let j = 0; j < chosenRow.length; j++) {
          let index = this.ticTacToeWinningResult[i].find(row => row == chosenRow[j]);
          if(index != null) {
            arrayThreeInARow.push(index);
          }
        }
        arrayThreeInARow.sort();
        
        if(this.ticTacToeWinningResult[i].toString() === arrayThreeInARow.toString()) {
          const indexThreeInARow = this.ticTacToeWinningResult.indexOf(this.ticTacToeWinningResult[i]);
          this.appendThreeInARowLine(indexThreeInARow);
          this.winnerTxt = !this.playerTwosTurn ? 'Player 1 wins!' : (this.playerTwosTurn && this.computerModeActive) 
            ? 'Computer wins!' : 'Player 2 wins';
          this.setGameOver();
        }
      }
    } 

  }

  private insertSelectedRow(index: number) {
    const row = this.ticTacToeBoard.find(x => x.index === index);
    if(row) {
      row.selected = true;
    }

    if(!this.playerTwosTurn) {
      const element = document.getElementById('selected-row-'+ index);
      element.classList.add('playerOne');
      this.selectedRowPlayerOne.push(index);
      this.checkThreeInARow(this.selectedRowPlayerOne);
    }

    if(this.playerTwosTurn) {
      const element = document.getElementById('selected-row-'+ index);
      element.classList.add('playerTwo');
      this.selectedRowPlayerTwo.push(index);
      this.checkThreeInARow(this.selectedRowPlayerTwo);
    }

    this.removeAvailabilityRows(index);
    this.playerTwosTurn = !this.playerTwosTurn;
    this.playersTurnTxt = this.playerTwosTurn ? "Player 2" : "Player 1";
  };

  private removeAvailabilityRows(index: number): void {
    const indexOfRow = this.availableRows.indexOf(index);
    if(indexOfRow > -1) {
      this.availableRows.splice(indexOfRow, 1);
    }
    this.chosenRows.push(index);
  };

  private appendThreeInARowLine(index: number){
    const classRow = 'line-' + index;
    const element = document.getElementById('three-in-a-row-line');
    element.classList.add(classRow);
  }

  private checkTie(){
    const tie = this.ticTacToeBoard.every(index => index.selected);
    if(tie) {
      this.winnerTxt = "It's a TIE!";
      this.setGameOver();
    }
  }

  private setGameOver(): void {
    this.disableBoard = true;
    setTimeout(() => {
      this.gameOver = true;
    }, 2000);
    setTimeout(() => {
      this.newGame = true;
    }, 3000);
  }

  public restart() {
    this.disableBoard = false;
    this.playerTwosTurn = false;
    this.newGame = false;
    this.gameOver = false;
    this.selectedRowPlayerOne = [];
    this.selectedRowPlayerTwo = [];
    this.chosenRows = [];
    this.availableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.ticTacToeBoard.map(x => {
      x.selected = false;
    });
    
    for(let i = 0; i < this.ticTacToeBoard.length; i++) {
      const element = document.getElementById('selected-row-'+ i);
      const line = document.getElementById('three-in-a-row-line');
      if(element) {
        element.classList.remove('playerOne');
        element.classList.remove('playerTwo');
      }
      if(line) {
        line.classList.remove('line-'+ i);
      }
    }
  }

  public menu() {
    this.restart();
    this.startPage = true;
  }

}
