import {HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

export function fmt<TObject>(text: string, myHash: TObject) {
  let key;
  // tslint:disable-next-line: forin
  for (key in myHash) {
    text = text.replace(new RegExp('\\{' + key + '\\}', 'gm'), myHash[key]);
  }
  return text;
}

export function mapFilterArrayToParams(
  filterArr: {
    key: string,
    value: string
  }[],
  params
) {
  let httpParams: HttpParams = new HttpParams();
  for (const property in params) {
    if (params.hasOwnProperty(property) && isNotEmpty(params[property])) {
      httpParams = httpParams.set(property, params[property]);
    }
  }
  filterArr.forEach((filter) => {
    httpParams.append(`filters[${filter.key}]`, filter.value);
  });
  return httpParams;
}

export function isEmpty(args: any): boolean {
  return (
    args === null || args === undefined || args === '' || args.length === 0
  );
}

export function isNotEmpty(args: any): boolean {
  return !isEmpty(args);
}

// tslint:disable-next-line: ban-types
export function mapToHttpParamsQuery(params: Object) {
  let httpParams: HttpParams = new HttpParams();
  for (const property in params) {
    if (params.hasOwnProperty(property) && isNotEmpty(params[property])) {
      httpParams = httpParams.set(property, params[property]);
    }
  }
  return httpParams;
}

export function mapToFormData(body: object): FormData {
  const formData = new FormData();
  for (const property in body) {
    if (body.hasOwnProperty(property) && isNotEmpty(body[property])) {
      formData.append(property, body[property]);
    }
  }
  return formData;
}

export function removeTheFirstChar(args: string): string {
  if (isEmpty(args)) {
    return '';
  }
  return args.substring(1, args.length);
}

export function removeTheLastChar(args: string): string {
  if (isEmpty(args)) {
    return '';
  }
  return args.substring(0, args.length - 1);
}

export function isString(object: any): boolean {
  return typeof object === 'string';
}

export function isDecimal(value) {
  const DECIMAL_REGEX = /^\d*\.{1}\d+$/;
  return DECIMAL_REGEX.test(value);
}

export function stringToBoolean(value: string) {
  return value === 'true';
}

export function booleanToString(value: boolean) {
  return value === true ? 'true' : 'false';
}

export function deepCopyObject(source, target) {
  Object.keys(source).forEach(property => {
    target[property] = source[property];
  });
}

export function filterBy<T>(data: T[], prop: string, reversed?: boolean) {
  reversed = !reversed;
  return data.sort(
    (a, b) =>
      // tslint:disable-next-line: triple-equals
      (a[prop] == b[prop] ? 0 : a[prop] < b[prop] ? -1 : 1) *
      (reversed ? -1 : 1)
  );
}

export function compareTwoFormControl(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (!control && !matchingControlName) {
      return;
    }
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

/** Utilities for datetime */
export function convertStrToYYMMdd(str) {
  const date = new Date(str);
  const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}

/**
 * Utilities for image
 * */
export function generateImageUrl(host: string, fileName: string) {
  return host + '/' + fileName;
}


/* Utilities for string
* */
export function transform(str: string): string {
  str = str.toLowerCase();
  str = str.replace(/ /g, '_');
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/[\u02C6\u0306\u031B]/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

/*
* Utilities for chart
* */
export function isSameTypeDataChart(sourceChart: string, destinationChart: string) {
  if (sourceChart === 'line' || sourceChart === 'bar' || sourceChart === 'radar') {
    return destinationChart === 'line' || destinationChart === 'bar' || destinationChart === 'radar';
  }
  if (sourceChart === 'doughnut') {
    return destinationChart === 'doughnut';
  }
  if (sourceChart === 'polarArea') {
    return destinationChart === 'polarArea';
  }
}
