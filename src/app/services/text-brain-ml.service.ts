import { Injectable } from '@angular/core';
import * as brain from 'brain.js';
import { IConfiguration, ITextEngine, ITextData, Data_Label, Data_Text, ITextModel } from '../interfaces/interfaces';
import { BagOfWordsService } from './bag-of-words.service';
import { transition } from '@angular/animations';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TextBrainMLService implements ITextEngine {

  private net: any;
  private configuration: {};
  private classes;
  private dict;

  constructor(private bow: BagOfWordsService) {
    this.net = new brain.NeuralNetwork();

    this.configuration = {
      iterations: 1000,
      errorThresh: 0.001,
      log: true,
      logPeriod: 50
    }
  }

  private toFunction() {
    return this.net.toFunction();
  }
  configure(c: IConfiguration): boolean {
    this.configuration = c;
    return true;
  }

  run(entry: Data_Text): Data_Label {
    let term = this.bow.bow(entry, this.dict);
    let predict = this.net.run(term);
    let i = this.bow.maxarg(predict);
    let flippedClasses = {};
    for(let key in this.classes){
      flippedClasses[this.classes[key]] = key
    }

    console.log(predict);

    console.log((() => {
      let s = 0;
      for(let i = 0; i < predict.length; i++){
        s = s + predict[i];
      }
      return s;
    })())
    
    return flippedClasses[i];
  }

  prepareTrainData(data: Set<ITextData>): any{
    let texts = [];
    let _classes = new Set<string>();
    let traindata = [];
    this.classes = {};

    // extract array of text to build dictionary
    // for(let i = 0; i < data.size; i++) {
    //   texts.push(data[i].value);
    //   _classes.add(data[i].label);
    // }
    for(let d of data) {
      texts.push(d.text);
      _classes.add(d.label);
    }
    
    // build dictionary
    this.dict = this.bow.extractDictionary(texts);

    // extract classes which are the labels
    let i = 0;
    for(let c of _classes){
      this.classes[c] = i;
      i++;
    }

    // build training data
    for(let d of data){
      traindata.push([this.bow.bow(d.text, this.dict), this.classes[d.label]]);
    }

    return {traindata, classes: this.classes};
  }

  train(model: ITextModel) {
    
    let data = new Set<ITextData>();

    for(let label of model.labels.keys()){
      for(let text of model.labels.get(label)){
        data.add({label: label, text: text})
      }
    }

    let { traindata, classes } = this.prepareTrainData(data);
    
    let ann_train = traindata.map( pair => {
      return {
        input: pair[0],
        output: this.bow.vec_result(pair[1], Object.keys(classes).length)
      };
    });

    this.net = new brain.NeuralNetwork();
  
    this.net.train(ann_train, this.configuration);
    console.log(model);
    alert ('modelo entrenado');
  }

  modelToString(): string {
    return this.toFunction().toString();
  }
}
