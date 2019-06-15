import { Injectable } from '@angular/core';
import { State, IConfiguration, TText, TLabel, ILabeledText, ITrainResult, IRunResult } from '../interfaces/interfaces';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { ScratchManagerService } from './scratch-manager.service';
import { CrossDomainStorageService } from './cross-domain-storage.service';
import { v4 as uuid } from 'uuid';
import * as BrainText from 'brain-text'


export let configDefault: IConfiguration = {
  iterations: 3000, // the maximum times to iterate the training data
  errorThresh: 0.06, // the acceptable error percentage from training data
  log: true, // true to use console.log, when a function is supplied it is used
  logPeriod: 10, // iterations between logging out
  learningRate: 0.3, // multiply's against the input and the delta then adds to momentum
  momentum: 0.1, // multiply's against the specified "change" then adds to learning rate for change
};

@Injectable({
  providedIn: 'root'
})
export class TextClassifierService {

  private configuration: IConfiguration = configDefault;
  private brainText;
  private traindata: ILabeledText[];
  public trainResult: ITrainResult;
  public state = State.EMPTY;

  constructor(
    private storageService: CrossDomainStorageService
  ) {
    this.traindata = [];
    this.brainText = new BrainText();
    this.brainText.setConfiguration(configDefault);
  }

  setTraindata(labelsWithTexts: Map<TLabel, Set<TText>>) {
    this.traindata = [];
    console.log(this.brainText);
    for(let label of labelsWithTexts){
      for(let text of label["1"]){
        this.traindata.push({label: label[0], text: text});
      }
    }
    this.brainText.addData(this.traindata);
  }


  /** 
   * Train the model, update the state and set the localStorage "easyml_model"
   * in order to be shared with scratch
   */
  train(): Observable<any> {
    return from(this.brainText.train());
  }

  /**
   * Run the model built after training
   * @param text 
   */
  run(text: TText): IRunResult {
    let r = {
      text: "text",
      label: "label",
      confidence: 0.90,
      prediction: new Map<TLabel, number>()
    }

    return r;
  }

  getConfiguration(): IConfiguration {
    return this.configuration;
  }

  setConfiguration(config: IConfiguration) {
    this.brainText.setConfiguration(config);
  }

  getState() {

  }
}
