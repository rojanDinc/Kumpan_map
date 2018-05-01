import { Place } from './place';
import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';

/**
 * Service for accessing localstorage with the plugin "angular-persistence"
 */
@Injectable()
export class StorageService {

  constructor(private persistanceService: PersistenceService) {}

  /**
   * Returns localstorage items if not empty
   */
  getListItems() {
    const list = this.persistanceService.get('placesList', StorageType.LOCAL);
    if (list == null) {
      return null;
    }
    return JSON.parse(list);
  }

  /**
   * Sets/Updates localstorage
   * @param list
   */
  updateStorage(list: Place[]) {
    const newList = JSON.stringify(list);
    this.persistanceService.set('placesList', newList, { type: StorageType.LOCAL });
  }
}


