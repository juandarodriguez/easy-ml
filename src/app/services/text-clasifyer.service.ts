import { Injectable } from '@angular/core';
import { ITextModel, State, IConfiguration, Data_Text, Data_Label, ITextData, ITrainResult, IRunResult } from '../interfaces/interfaces';
import { TextBrainMLService } from './text-brain-ml.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';


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
export class TextClasifyerService {

  private model: ITextModel;
  private configuration: IConfiguration = configDefault;
  public trainResult: ITrainResult;
  private bc = new BroadcastChannel('clasify_channel');

  constructor(private textMLEngine: TextBrainMLService) {
    this.model = {
      name: "ponme un nombre",
      labels: new Map<Data_Label, Set<Data_Text>>(),
      state: State.EMPTY
    }
    this.textMLEngine.configure(this.configuration);
    this.bc.onmessage = function (ev) { console.log(ev); }
  }

  getConfiguration(): IConfiguration {
    return this.configuration;
  }

  configure(config: IConfiguration) {
    this.textMLEngine.configure(config);
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  getState() {
    return this.model.state;
  }

  setName(name: string) {
    this.model.name = name;
  }

  load(modelJSON: string): Observable<ITextModel> {

    let modelObj = JSON.parse(modelJSON);

    for(let key in modelObj){
      let texts = new Set<Data_Text>();
      this.model.labels.set(key, texts);
      for(let text of modelObj[key]){
        texts.add(text);
      }
    }

    this.model.state = State.UNTRAINED;

    return of(this.model);

  }

  serializeModel(): string {
    let modelObject = {};

    for (let label of this.model.labels.keys()) {
      modelObject[label] = [];
      for (let text of this.model.labels.get(label)) {
        modelObject[label].push(text);
      }
    }
    let modelJSON = JSON.stringify(modelObject);

    return modelJSON;
  }
  save() {

    const blob = new Blob([this.serializeModel()], { type: 'application/json' });
    saveAs(blob, this.model.name);

    console.log();

  }

  addLabel(label: Data_Label) {
    this.model.labels.set(label, new Set<Data_Text>());
  }

  addEntry(data: ITextData) {
    this.model.labels.set(data.label, this.model.labels.get(data.label).add(data.text));
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    } else if (this.model.state == State.EMPTY) {
      this.model.state = State.UNTRAINED;
    }
  }

  addEntries(data: Set<ITextData>) {
    for (let d of data) {
      this.addEntry(d);
    }
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  removeLabel(label: Data_Label) {
    this.model.labels.delete(label);
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    }

  }

  removeEntry(data: ITextData) {
    this.model.labels.get(data.label).delete(data.text);
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  train(): Observable<any> {
    if (this.model.state == State.OUTDATED || this.model.state == State.UNTRAINED) {
      this.model.state = State.TRAINING;
      return this.textMLEngine.train(this.model).pipe(
        map(response => {
          this.model.state = State.TRAINED;
          return response;
        })
      )
    } else {
      return of(false);
    }
  }

  run(text: Data_Text): IRunResult {
    return this.textMLEngine.run(text);
  }

  getModelFuntionString(){
    return this.textMLEngine.modelToString();
  }

  getModel() {
    return this.model;
  }
}
