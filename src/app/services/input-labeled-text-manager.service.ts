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
    this.name = "Sin nombre"
  }

  clear() {
    this.labels.clear();
    this.labelsWithTexts.clear();
  }
  // Load input labeled text from file
  load(file: string) {
    let inputData;

    this.clear();

    try {
      inputData = JSON.parse(file);

      Object.keys(inputData).forEach(key => {
        let texts = inputData[key];
        for (let text of texts) {
          this.addEntry({ label: key, text: text });
        }
      });
    }
    catch{
      alert("Fichero erróneo. No puedo interpretar ese fichero. ¿Seguro que está bien construido?");
    }
  }

  // Save input labeled data to disk
  save() {
    const blob = new Blob([this.serializeModel()], { type: 'application/json' });
    saveAs(blob, this.name);
  }

  addLabel(label: string) {
    // Add label only if not exits
    if (label == "") return;
    if (!this.labelsWithTexts.has(label)) {
      this.labels.add(label);
      this.labelsWithTexts.set(label, new Set<TText>());
    }
  }

  removeLabel(label: string) {
    this.labels.delete(label);
    this.labelsWithTexts.delete(label);
  }

  addEntry(entry: ILabeledText) {
    let label = entry.label;
    let text = entry.text;
    if (label == "" || text == "" ||
      label == null || text == null ||
      label == undefined || text == undefined) return;
    this.addLabel(label);
    if (!this.labelsWithTexts.get(label).has(text)) {
      this.labelsWithTexts.get(label).add(text);
    }
  }

  removeEntry(entry: ILabeledText) {
    let label = entry.label;
    let text = entry.text;

    this.labelsWithTexts.get(label).delete(text);
  }

  serializeModel(): string {

    let inputJSONStr = JSON.stringify(this.labelsWithTexts);

    return inputJSONStr;
  }

}
