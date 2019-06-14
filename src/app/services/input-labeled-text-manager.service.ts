import { Injectable } from '@angular/core';
import { TLabel, ILabeledText, TText } from '../interfaces/interfaces';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class InputLabeledTextManagerService {

  labelsWithTexts: Map<TLabel, Set<TText>>;
  labels: Set<TLabel>
  name: string;

  constructor() { 
    this.labelsWithTexts = new Map<TLabel, Set<TText>>();
    this.labels = new Set<TLabel>();
  }

  // Load input labeled text from file
  load(file: string) {

  }

  // Save input labeled data to disk
  save() {
    const blob = new Blob([this.serializeModel()], { type: 'application/json' });
    saveAs(blob, this.name);
  }

  addLabel(label: string) {
    // Add label only if not exits
    if(label == "") return;
    if (!this.labelsWithTexts.has(label)){
      this.labels.add(label);
      this.labelsWithTexts.set(label, new Set<TText>());
    }
    console.log(this.labelsWithTexts);
  }

  removeLabel(label: string){
    this.labels.delete(label);
    this.labelsWithTexts.delete(label);
  }

  addEntry(entry: ILabeledText){
    let label = entry.label;
    let text = entry.text;
    if(label == "" || text == "") return;
    this.addLabel(label);
    if(!this.labelsWithTexts.get(label).has(text)){
      this.labelsWithTexts.get(label).add(text);
    }
  }

  removeEntry(entry: ILabeledText){
    let label = entry.label;
    let text = entry.text;
    
    this.labelsWithTexts.get(label).delete(text);
  }

  serializeModel(): string {

    let inputJSONStr = JSON.stringify(this.labelsWithTexts);

    return inputJSONStr;
  }

}
