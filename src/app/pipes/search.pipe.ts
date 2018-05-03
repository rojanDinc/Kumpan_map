import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe is used as a search filter for the search field.
 */

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {

  transform(value, keys: string, term: string) {

    if (!term) {
      return value;
    }
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  }

}
