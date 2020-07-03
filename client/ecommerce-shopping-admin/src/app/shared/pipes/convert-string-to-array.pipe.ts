import { Pipe, PipeTransform } from '@angular/core';
import {Logger} from "@drop-shipping/core/logger/public-api";

const logger = new Logger('ConvertStringToArrayPipe');
@Pipe({
  name: 'convertStringToArray'
})
export class ConvertStringToArrayPipe implements PipeTransform {

  transform(arrString: string): string[] {
    const arrLink = JSON.parse(arrString);
    return arrLink;
  }

}
