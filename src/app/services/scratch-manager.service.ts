import { Injectable } from '@angular/core';
import { TextClassifierService } from './text-classifier.service';
import { State } from '../interfaces/interfaces';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ScratchManagerService {

  scratchWindow: any;
  modelUpdated = false;

  constructor(private configService: ConfigService) {

  }

  load() {
    let urlScratch = ConfigService.settings.scratch.url;
    this.scratchWindow = window.open(urlScratch);
  }

}
