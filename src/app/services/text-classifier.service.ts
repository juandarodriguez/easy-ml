import { Injectable } from '@angular/core';
import { State, IConfiguration, TText, TLabel, ILabeledText, ITrainResult, IRunResult } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { ScratchManagerService } from './scratch-manager.service';
import { CrossDomainStorageService } from './cross-domain-storage.service';
import { v4 as uuid } from 'uuid';


export let configDefault: IConfiguration = {
  iterations: 3000, // the maximum times to iterate the training data
  errorThresh: 0.006, // the acceptable error percentage from training data
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
  public trainResult: ITrainResult;
  public state = State.EMPTY;

  constructor(
    private scratchManager: ScratchManagerService,
    private storageService: CrossDomainStorageService
  ) {
  }

  setTraindata(inputData: Set<ILabeledText>) {
    
  }


  /** 
   * Train the model, update the state and set the localStorage "easyml_model"
   * in order to be shared with scratch
   */
  train(): Observable<any> {
    return of(true);
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

  }

  getState() {

  }
}
