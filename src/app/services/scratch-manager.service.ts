import { Injectable } from '@angular/core';
import { TextClasifyerService } from './text-clasifyer.service';

@Injectable({
  providedIn: 'root'
})
export class ScratchManagerService {

  scratchWindow: any;
  constructor(private textClasifyerService: TextClasifyerService) { }

  load() {
    this.scratchWindow = window.open('http://127.0.0.1:8601');
  }

  updateModel() {
    let model = this.textClasifyerService.model2JSON();
    console.log(this.scratchWindow);
    this.scratchWindow.postMessage(model, "*");
  }
}
