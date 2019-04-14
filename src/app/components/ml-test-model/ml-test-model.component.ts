import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';
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
    public textClasifyerService: TextClasifyerService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  test(){
    this.result = this.textClasifyerService.run(this.testText);
    console.log(this.result);
    let sum = 0;
    this.result.prediction.forEach((v, k) => {
      sum += v;
    });
    console.log(sum);
    // this.snackBar.open(this.result,
    // 'Resultado', {
    //   duration: 2000,
    // });
  }

}