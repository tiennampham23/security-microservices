import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'totalPrice',
  pure: false
})
export class TotalPricePipe implements PipeTransform {

  transform(values: number[], args?: any): any {
    let total = 0;
    values.forEach(value => {
      total += value;
    });
    return total;
  }

}
