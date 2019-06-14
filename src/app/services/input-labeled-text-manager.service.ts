import { Injectable } from '@angular/core';
import { TLabel, ILabeledText } from '../interfaces/interfaces';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class InputLabeledTextManagerService {

  private traindata: Set<ILabeledText>;
  private labels: Set<TLabel>
  private name: string;

  constructor() { }

  // Load input labeled text from file
  load(file: string) {
    this.traindata = null;
    
  }

  // Save input labeled data to disk
  save() {
    const blob = new Blob([this.serializeModel()], { type: 'application/json' });
    saveAs(blob, this.name);
  }

  addLabel(label: string) {
    // Add label only if not exits
    if (!this.labels.has(label)){
      this.labels.add(label);
    }
  }

  removeLabel(label: string){
    this.labels.delete(label);
  }

  addEntry(entry: ILabeledText){
    if(!this.traindata.has(entry)){
      this.traindata.add(entry);
    }
    
  }

  removeEntry(entry: ILabeledText){
    this.traindata.delete(entry);
  }

  serializeModel(): string {

    let inputJSONStr = JSON.stringify(this.traindata);

    return inputJSONStr;
  }

}
