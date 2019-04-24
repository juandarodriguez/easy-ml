import { Injectable } from '@angular/core';
import * as createHost from 'cross-domain-storage/host'
import * as createGuest from 'cross-domain-storage/guest'

@Injectable({
  providedIn: 'root'
})
export class CrossDomainStorageService {

  private storageHost;
  private storageGuest;

  constructor() {
    if(this.storageHost) return;

    this.storageHost = createHost([
      {
        origin: 'http://localhost:8601',
        allowedMethods: ['get', 'set']
      },
      {
        origin: 'http://localhost:4200',
        allowedMethods: ['get', 'set']
      },
    ]);

    this.storageGuest = createGuest("http://localhost:4200");

  }

  set(key: string, data: string){
    this.storageGuest.set(key, data);
  }
}
