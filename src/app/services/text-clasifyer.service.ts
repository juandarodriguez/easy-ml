import { Injectable } from '@angular/core';
import { ITextModel, State, IConfiguration, Label } from '../interfaces/interfaces';
import { TextBrainMLService } from './text-brain-ml.service';

@Injectable({
  providedIn: 'root'
})
export class TextClasifyerService {

  private model: ITextModel;

  constructor(private textMLEngine: TextBrainMLService) { 
    this.model = {
      name: name,
      data: [],
      labels: [],
      state: State.UNTRAINED
    }
  }

  configure(config: IConfiguration){

  }

  setName(name: string){
    this.model.name = name;
  }

  load(name: string){

  }

  save(name?: string){
  
  }

  addEntry(text: string, label: Label){

  }

  removeEntry(text: string){

  }

  train(){

  }

  test(text: string){

  }

}
