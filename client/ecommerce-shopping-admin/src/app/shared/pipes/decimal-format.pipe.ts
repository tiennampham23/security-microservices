import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'decimalFormat'
})
export class DecimalFormatPipe implements PipeTransform {
  transform(value: any): number {
    return this.localeString(value);
  }

  missingOneDecimalCheck(nStr) {
    nStr += '';
    const x = nStr.split(',')[1];
    return x && x.length === 1;
  }

  missingAllDecimalsCheck(nStr) {
    nStr += '';
    const x = nStr.split(',')[1];
    return !x;
  }

  localeString(nStr) {
    if (nStr === '') {
      return '';
    }
    // tslint:disable-next-line:one-variable-per-declaration
    let x, x1, x2, rgx, y1, y2;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }

    /** If value was input by user, it could have many decimals(up to 7)so we need to reformat previous x1 results
     * */
    if (x1.indexOf(',') !== -1) {
      y1 = x1.slice(x1.lastIndexOf(',')).replace(/\./g, '');

      y2 = x1.split(',');
      x = y2[0] + y1;
    } else {
      x = x1 + x2;
      if (this.missingOneDecimalCheck(x)) {
        return x += '0';
      }
      if (this.missingAllDecimalsCheck(x)) {
        return x;
      }
    }

    return x;
  }


}
