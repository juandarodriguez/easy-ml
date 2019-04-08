import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';

@Component({
  selector: 'app-ml-test-model',
  templateUrl: './ml-test-model.component.html',
  styleUrls: ['./ml-test-model.component.css']
})
export class MlTestModelComponent implements OnInit {

  testText: string;

  constructor(
    private textClasifyerService: TextClasifyerService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  test(){
    let result = this.textClasifyerService.run(this.testText);
    this.snackBar.open(result,
    'Resultado', {
      duration: 2000,
    });
  }

}