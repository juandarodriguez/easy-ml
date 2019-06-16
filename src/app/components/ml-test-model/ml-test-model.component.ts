import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextClassifierService } from '../../services/text-classifier.service';
import { IRunResult } from '../../interfaces/interfaces';

@Component({
  selector: 'app-ml-test-model',
  templateUrl: './ml-test-model.component.html',
  styleUrls: ['./ml-test-model.component.css']
})
export class MlTestModelComponent implements OnInit {

  testText: string;
  result: IRunResult;

  constructor(
    private textClassifierService: TextClassifierService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getState(){
    return this.textClassifierService.getState();
  }

  test(){
    this.result = this.textClassifierService.run(this.testText);
    console.log(this.result);
    let sum = 0;
    Object.keys(this.result.prediction).forEach(k => {
      sum += this.result.prediction[k];
    })
    
    console.log(sum);
  }

}