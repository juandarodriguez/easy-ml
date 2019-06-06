import { Injectable } from '@angular/core';
import * as brain from 'brain.js';
import { IConfiguration, ITextEngine, ITextData, Data_Label, Data_Text, ITextModel, IRunResult } from '../interfaces/interfaces';
import { BagOfWordsService } from './bag-of-words.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextBrainMLService implements ITextEngine {

  private net: any;
  private configuration: IConfiguration = {};
  private classes;
  private dict;

  constructor(private bow: BagOfWordsService) {
    this.net = new brain.NeuralNetwork();
  }

  
  setConfiguration(c: IConfiguration): boolean {
    this.configuration = c;
    return true;
  }

  run(entry: Data_Text): IRunResult {
    // Entry is vectorized as a Bag Of Word
    let term = this.bow.bow(entry, this.dict);
    let predict = this.net.run(term);
    let i = this.bow.maxarg(predict);
    let flippedClasses = {};
    for (let key in this.classes) {
      flippedClasses[this.classes[key]] = key
    }

    console.log(predict);

    let prediction = new Map<Data_Label, number>();
    for (let i = 0; i < predict.length; i++) {
      prediction.set(flippedClasses[i], predict[i]);
    }
    

    let result: IRunResult = {
      text: entry,
      label: flippedClasses[i],
      confidence: predict[i],
      prediction: prediction
    }

    return result;
  }

  prepareTrainData(data: Set<ITextData>): any {
    let texts = [];
    let _classes = new Set<string>();
    let traindata = [];
    this.classes = {};

    for (let d of data) {
      texts.push(d.text);
      _classes.add(d.label);
    }

    // build dictionary
    this.dict = this.bow.extractDictionary(texts);

    // extract classes which are the labels
    let i = 0;
    for (let c of _classes) {
      this.classes[c] = i;
      i++;
    }

    // build training data
    for (let d of data) {
      traindata.push([this.bow.bow(d.text, this.dict), this.classes[d.label]]);
    }

    return { traindata, classes: this.classes };
  }

  train(model: ITextModel): Observable<any> {

    let dataArray = [];

    for (let label of model.labels.keys()) {
      for (let text of model.labels.get(label)) {
        dataArray.push({ label: label, text: text })
      }
    }

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  
    shuffle(dataArray);

    let data = new Set(dataArray);

    let { traindata, classes } = this.prepareTrainData(data);

    let ann_train = traindata.map(pair => {
      return {
        input: pair[0],
        output: this.bow.vec_result(pair[1], Object.keys(classes).length)
      };
    });

    this.net = new brain.NeuralNetwork();

    let promise = this.net.trainAsync(ann_train, this.configuration)
    console.log("#####");
    console.log(promise);
    console.log("###FIN###");
    return from(promise);

  }

  model2JSON(){
    return this.net.toJSON();
  }

  getDict(){
    return this.dict;
  }

  getClasses(){
    return this.classes;
  }
}
