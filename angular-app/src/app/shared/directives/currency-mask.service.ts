import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyMaskService {
  private prefix: string;
  private decimalSeparator: string;
  private thousandsSeparator: string;

  constructor() {
    this.prefix = '$';
    this.decimalSeparator = '.';
    this.thousandsSeparator = ',';
  }

  transform(
    value: string,
    allowNegative = false,
    type: string,
    decimalPrecision: number = 2
  ) {
    let intFraction: string = '';
    if (type == 'number') {
      this.prefix = '';
    } else {
      this.prefix = '$';
    }

    if (value === undefined || value === '') {
      return null;
    }
    if (allowNegative) {
      value = value.toString();
      if (value.startsWith('(') || value.startsWith('-')) {
        value = '-' + value.substr(1, value.length).replace(/\(|\)|\$|\-/g, '');
      } else {
        value = value.replace(/\(|\)|\$|\-/g, '');
      }
    }
    let [integer, fraction = ''] = (value || '')
      .toString()
      .split(this.decimalSeparator);

    intFraction =
      decimalPrecision > 0 ? (fraction + '000000').substring(0, 2) : '';

    fraction =
      decimalPrecision > 0
        ? this.decimalSeparator + (fraction + '000000').substring(0, 2)
        : '';

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    // If user types .xx we can display 0.xx
    if (integer === '') {
      integer = '';
      return integer;
    } else if (integer.startsWith('$')) {
      // If there are multiple transforms, remove the previous dollar sign (blur and change at the same time)
      integer = integer.substr(1, integer.length);
    } else if (allowNegative && integer.startsWith('-')) {
      // If user inputs negative number set to paranthesis format
      integer = integer.substr(1, integer.length);
      const aintFraction = parseInt(intFraction);
      if (aintFraction > 0)
        return type == 'number'
          ? '(' + integer + ')'
          : '(' + integer + fraction + ')';
      else return type == 'number' ? '(' + integer + ')' : '(' + integer + ')';
    }
    const aintFraction = parseInt(intFraction);
    if (aintFraction > 0)
      return type == 'number' ? integer : integer + fraction;
    else return type == 'number' ? integer : integer;
  }

  parse(value: string, allowNegative = false) {
    let [integer, fraction = ''] = (value || '').split(this.decimalSeparator);
    integer = integer.replace(new RegExp(/[^\d\.]/, 'g'), '');
    fraction =
      parseInt(fraction, 10) > 0 && 2 > 0
        ? this.decimalSeparator + (fraction + '000000').substring(0, 2)
        : '';
    if (allowNegative && value.startsWith('(') && value.endsWith(')')) {
      return (-1 * parseFloat(integer + fraction)).toString();
    } else {
      return integer + fraction;
    }
  }
}
