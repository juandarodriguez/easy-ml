import { Injectable } from '@angular/core';
import * as brain from 'brain.js';
import { IConfiguration, ITextEngine, ITextData, Label, Text } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TextBrainMLService implements ITextEngine {

  net: any;
  configuration: IConfiguration;

  constructor() {
    console.log(brain);
    //this.net = new brain.recurrent.LSTM();
    // this.configuration = {
    //   iterations: 1000,      
    //   errorThresh: 0.005,    
    //   learningRate: 0.3,  
    //   momentum: 0.1
    // }
  }

  private toFunction(){
    return this.net.toFunction();
  }
  configure(c: IConfiguration) {
    this.configuration = c;
  }

  getConfiguration(): IConfiguration{
    return this.configuration;
  }

  run(entry: Text): Label {
    return this.net.run(entry);
  }

  train(data: ITextData[]) {
    this.net.train(data, this.configuration);
  }

  modelToString(): string {
    return this.toFunction().toString();
  }
}
