import { Component, OnInit } from '@angular/core';
import { IConfiguration, ITextModel } from 'src/app/interfaces/interfaces';
import { TextClasifyerService, configDefault } from 'src/app/services/text-clasifyer.service';
import { MatSnackBar } from '@angular/material';
import { ShowProgressSpinnerService } from '../../services/show-progress-spinner.service';

@Component({
  selector: 'app-ml-configuration',
  templateUrl: './ml-configuration.component.html',
  styleUrls: ['./ml-configuration.component.css']
})
export class MlConfigurationComponent implements OnInit {

  config: IConfiguration;
  model: ITextModel;

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }

  constructor(
    private textClasifyerService: TextClasifyerService,
    private snackBar: MatSnackBar,
    private progressSpinner: ShowProgressSpinnerService
    ) {
    this.config = this.jsonCopy(configDefault);
    this.model = textClasifyerService.getModel();
  }

  ngOnInit() {
  }

  update() {
    this.textClasifyerService.configure(this.config);
    let trainObservable = this.textClasifyerService.train();
    this.progressSpinner.showProgressSpinnerUntilExecuted(trainObservable);

  }
  reset() {
    this.config = this.jsonCopy(configDefault);

    this.textClasifyerService.configure(this.config);
  }

}
