import { Injectable } from '@angular/core';

@Injectable()
export class CalculationService {
  private neighborsPositions: any = [
      [-1,-1],[-1, 0],[-1, 1],
      [ 0,-1],        [ 0, 1], 
      [ 1,-1],[ 1, 0],[ 1, 1]
  ];

  checkCondition(field: boolean[][], position: any): boolean {
    var neighbors = [];
    var targetCellValue = field[position.y][position.x];

    this.neighborsPositions.forEach(np => {
      var y, x;
      y = (position.y + np[0]) == -1 ? field.length - 1 : position.y + np[0];
      y = y == field.length ? 0 : y;
      x = (position.x + np[1]) == -1 ? field[0].length - 1 : position.x + np[1];
      x = x == field[0].length ? 0 : x;

      neighbors.push(field[y][x]);
    });
    
    var lifeCellsCount = neighbors.filter(function (item) { return item }).length;

    return (lifeCellsCount == 3 && !targetCellValue || (lifeCellsCount == 2 || lifeCellsCount == 3) && targetCellValue);
  }
}
