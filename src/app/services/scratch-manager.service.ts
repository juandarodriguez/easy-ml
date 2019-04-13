import { Injectable } from '@angular/core';
import { TextClasifyerService } from './text-clasifyer.service';
import { State } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ScratchManagerService {

  scratchWindow: any;
  modelUpdated = false;

  constructor() {

  }

  load() {
    this.scratchWindow = window.open('http://127.0.0.1:8601');
  }

}
