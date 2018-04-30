import { Place } from './place';
import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';

// Service for saveing and fetching saved data in localstorage
@Injectable()
export class StorageService {

  constructor(private persistanceService: PersistenceService) {}

  /**
   * Getter
   */

  getListItems() {
    const list = this.persistanceService.get('placesList', StorageType.LOCAL);
    if (list == null) {
      return null;
    }

    return JSON.parse(list);
  }

  /**
   * Setter
   */

  addListItem(list: Place[]) {
    const newList = JSON.stringify(list);
    this.persistanceService.set('placesList', newList, { type: StorageType.LOCAL });
  }
}


