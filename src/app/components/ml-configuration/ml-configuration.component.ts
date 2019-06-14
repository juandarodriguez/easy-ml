import { Component, OnInit } from '@angular/core';
import { IConfiguration, ILabeledText } from 'src/app/interfaces/interfaces';
import { TextClassifierService, configDefault } from '../../services/text-classifier.service';
import { MatSnackBar } from '@angular/material';
import { ShowProgressSpinnerService } from '../../services/show-progress-spinner.service';

@Component({
  selector: 'app-ml-configuration',
  templateUrl: './ml-configuration.component.html',
  styleUrls: ['./ml-configuration.component.css']
})
export class MlConfigurationComponent implements OnInit {

  config: IConfiguration;
  traindatum: ILabeledText;

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }

  constructor(
    private textClassifierService: TextClassifierService,
    private snackBar: MatSnackBar,
    private progressSpinner: ShowProgressSpinnerService
    ) {
    this.config = this.jsonCopy(configDefault);
  }

  getState(){
    return this.textClassifierService.getState();
  }

  ngOnInit() {
  }

  update() {
    this.textClassifierService.setConfiguration(this.config);
    let trainObservable = this.textClassifierService.train();
    this.progressSpinner.showProgressSpinnerUntilExecuted(trainObservable);

  }
  reset() {
    this.config = this.jsonCopy(configDefault);

    this.textClassifierService.setConfiguration(this.config);
  }

}
