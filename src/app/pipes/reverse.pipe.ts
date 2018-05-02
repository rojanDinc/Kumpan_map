import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe helps to show the latest added item in a list.
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
