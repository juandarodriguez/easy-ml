import { Injectable } from '@angular/core';
import { ITextEngine, Data_Text, Data_Label, IRunResult, ITextModel, IConfiguration } from '../interfaces/interfaces';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextMockMlService implements ITextEngine  {

  private configuration: IConfiguration = {};

  constructor() { }

  setConfiguration(c: IConfiguration): boolean {
    this.configuration = c;
    return true;
  }

  modelToString(): string {
    let code = this.toFunction().toString();
    console.log(code);
    return code;
  }

  run(entry: Data_Text): IRunResult {
    let r = {
      text: "text",
      label: "label",
      confidence: 0.7,
      prediction: new Map<Data_Label, number>(
        [
          ["encender_lampara", 0.25],
          ["apagar_lampara", 0.25],
          ["encender_ventilador", 0.25],
          ["encender_ventilador", 0.25],
        ])
    }
    return r;
  }

  train(model: ITextModel): Observable<any> {
    return from(["kuku"])
  }
}
