import { Injectable } from '@angular/core';
import { ITextModel, State, IConfiguration, Data_Text, Data_Label, ITextData, ITrainResult, IRunResult } from '../interfaces/interfaces';
import { TextBrainMLService } from './text-brain-ml.service';
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
export class TextClasifyerService {

  public model: ITextModel;
  private configuration: IConfiguration = configDefault;
  public trainResult: ITrainResult;

  constructor(
    private textMLEngine: TextBrainMLService,
    private scratchManager: ScratchManagerService,
    private storageService: CrossDomainStorageService
  ) {
    this.resetModel();
  }

  getModel() {
    return this.model;
  }

  resetModel() {
    this.model = {
      id: uuid(),
      name: "ponme un nombre",
      labels: new Map<Data_Label, Set<Data_Text>>(),
      state: State.EMPTY
    }
    this.textMLEngine.setConfiguration(this.configuration);
  }

  /**
   * Load a model from a JSON string representation
   * @param modelJSON 
   */
  load(modelJSON: string): Observable<ITextModel> {

    let modelObj = JSON.parse(modelJSON);

    for (let key in modelObj) {
      let texts = new Set<Data_Text>();
      this.model.labels.set(key, texts);
      for (let text of modelObj[key]) {
        if (text) texts.add(text);
      }
    }

    this.model.state = State.UNTRAINED;

    return of(this.model);

  }

  /** 
   * Save the model to a file
   */
  save() {
    const blob = new Blob([this.serializeModel()], { type: 'application/json' });
    saveAs(blob, this.model.name);
  }

  /** 
   * Train the model, update the state and set the localStorage "easyml_model"
   * in order to be shared with scratch
   */
  train(): Observable<any> {
    if (this.model.state == State.OUTDATED || this.model.state == State.UNTRAINED) {
      this.model.state = State.TRAINING;
      return this.textMLEngine.train(this.model).pipe(
        map(response => {
          this.model.id = uuid();
          this.model.state = State.TRAINED;
          console.log('Updating model storage');
          let model = this.model2JSON();
          this.storageService.set("easyml_model", model);

          return response;
        })
      )
    } else {
      return of(false);
    }
  }

  /**
   * Run the model built after training
   * @param text 
   */
  run(text: Data_Text): IRunResult {
    return this.textMLEngine.run(text);
  }

  /**
   * Add a new label to be taken into account when training the model
   * @param label 
   */
  addLabel(label: Data_Label) {
    this.model.labels.set(label, new Set<Data_Text>());
  }

  /**
   * Removes a label
   * @param label 
   */
  removeLabel(label: Data_Label) {
    this.model.labels.delete(label);
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  /**
   * Add new entry to the dataset which will be used to train the model
   * An entry has label and text.
   * @param data 
   */
  addEntry(data: ITextData) {
    this.model.labels.set(data.label, this.model.labels.get(data.label).add(data.text));
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    } else if (this.model.state == State.EMPTY) {
      this.model.state = State.UNTRAINED;
    }
  }

  /**
   * Add a set of entries
   * @param data 
   */
  addEntries(data: Set<ITextData>) {
    for (let d of data) {
      this.addEntry(d);
    }
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  /**
   * Removes an entry from the dataset
   * 
   * @param data 
   */
  removeEntry(data: ITextData) {
    this.model.labels.get(data.label).delete(data.text);
    if (this.model.state == State.TRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  getConfiguration(): IConfiguration {
    return this.configuration;
  }

  setConfiguration(config: IConfiguration) {
    this.textMLEngine.setConfiguration(config);
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

  getModelFuntionString() {
    return this.textMLEngine.modelToString();
  }

  model2JSON() {
    let m = {
      id: this.model.id,
      modelJSON: this.textMLEngine.model2JSON(),
      dict: this.textMLEngine.getDict(),
      classes: this.textMLEngine.getClasses()
    }
    return JSON.stringify(m);
  }
}
