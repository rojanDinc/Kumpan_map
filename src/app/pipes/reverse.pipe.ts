import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe reverses the list to show the latest added item in the list.
 */

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value) {
      if (!value) {
        return;
      }
      return value.reverse();
    }
}
