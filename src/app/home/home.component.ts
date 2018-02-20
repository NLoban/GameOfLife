import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { CalculationService } from '../calculation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  previous: any;
  next: any;
  sizeX: number = 10;
  sizeY: number = 10;

  constructor(private calculationService: CalculationService) { }

  ngOnInit() {
    this.setSize(this.sizeX, this.sizeY);
    this.setStartPositions([{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 3, y: 2}, {x: 3, y: 1}]);
    this.calculate();
  }

  setSize(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.previous = [];
    this.next = [];
    
    for (var j = 0; j < this.sizeY; j++) {
      this.previous[j] = [];
      this.next[j] = [];

      for(var i = 0; i < this.sizeX; i++) {
        this.previous[j][i] = false;
        this.next[j][i] = false;
      }
    }
  }

  setStartPositions(startPositions: Array<any>) {
    startPositions.forEach((position) => {
      this.previous[position.y][position.x] = true;
      this.next[position.y][position.x] = true;
    });
  }

  changeState(i: number, j: number) {
    this.previous[j][i] = true;
    this.next[j][i] = true;
  }

  calculate() {
    for (var j = 0; j < this.previous.length; j++) {
      for(var i = 0; i < this.previous[j].length; i++) {
        this.next[j][i] = this.calculationService.checkCondition(this.previous, {x: i, y: j});
      }
    }

    if (this.isMatrixesTheSame(this.previous, this.next)) {
      console.log("End");
      return;
    }

    setTimeout(() => {
      for (var j = 0; j < this.previous.length; j++) {
        for(var i = 0; i < this.previous[j].length; i++) {
          this.previous[j][i] = this.next[j][i];
        }
      }
      
      this.calculate() 
    }, 1000);
  }
  
  private isMatrixesTheSame(previousMatrix: any, nextMatrix: any): boolean {
    for (var j = 0; j < previousMatrix.length; j++) {
      for(var i = 0; i < previousMatrix[j].length; i++) {
        if (previousMatrix[j][i] != nextMatrix[j][i]) {
          return false;
        }
      }
    }

    return true;
  }
}
