import { Injectable } from '@angular/core';
import * as createHost from 'cross-domain-storage/host'
import * as createGuest from 'cross-domain-storage/guest'
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CrossDomainStorageService {

  private storageHost;
  private storageGuest;

  constructor() {
    if(this.storageHost) return;

    let domainEasyml = ConfigService["settings"]["easyml"]["domain"];
    let domainScratch = ConfigService["settings"]["scratch"]["domain"];
    this.storageHost = createHost([
      {
        origin: domainScratch,
        allowedMethods: ['get', 'set']
      },
      {
        origin: domainEasyml,
        allowedMethods: ['get', 'set']
      },
    ]);

    this.storageGuest = createGuest(domainEasyml);

  }

  set(key: string, data: string){
    this.storageGuest.set(key, data);
  }
}
