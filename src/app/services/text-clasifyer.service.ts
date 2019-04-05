import { Injectable } from '@angular/core';
import { ITextModel, State, IConfiguration, Data_Text, Data_Label, ITextData } from '../interfaces/interfaces';
import { TextBrainMLService } from './text-brain-ml.service';
import { trigger } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TextClasifyerService {

  private model: ITextModel;

  constructor(private textMLEngine: TextBrainMLService) { 
    this.model = {
      name: name,
      data: new Set<ITextData>(),
      labels: new Set<Data_Label>(),
      state: State.UNTRAINED
    }
  }

  configure(config: IConfiguration){
      this.textMLEngine.configure(config);
  }

  setName(name: string){
    this.model.name = name;
  }

  load(name: string){

  }

  save(name?: string){
  
  }

  addEntry(text: Data_Text, label: Data_Label){
    this.model.data.add({text, label})
  }

  addEntries(data: Set<ITextData>){
    this.model.data = new Set([...this.model.data, ...data]);
  }

  removeEntry(entry: ITextData){
    this.model.data.delete(entry);
  }

  train(){
    this.textMLEngine.train(this.model.data)
  }

  run(text: Data_Text): Data_Label {
    return this.textMLEngine.run(text);
  }
}
