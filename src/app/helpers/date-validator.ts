import { dateFromString } from '@helpers/date-from-string';
import { stringFromDate } from '@helpers/string-from-date';

export function validateDate(currentValue: string, validValue: string): string {
  const currentValueLength: number = currentValue.length;
  const dayStrLength = 2;
  const dayMonthStrLength = 5;
  const dayMonthEmptyYearStrLength = 7;
  const dayMonthYearStrLength = 10;
  const slash = '/';
  const slashYear = '/20';

  const dayRegexp: RegExp = /^([0-3]?|0[1-9]|[12]\d|3[01])$/;
  const dayMonthRegexp: RegExp = /^(0[1-9]|[12]\d|3[01])\/([01]?|0[1-9]|1[0-2])$/;
  const dayMonthYearRegexp: RegExp = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/2(0?|0\d?|0\d{2})$/;

  const isValidCurrentValue: boolean = dayRegexp.test(currentValue)
    || dayMonthRegexp.test(currentValue)
    || dayMonthYearRegexp.test(currentValue);

  const isDeleting: boolean = currentValueLength < validValue.length;
  const isDeletingYear: boolean = isDeleting && currentValueLength === dayMonthEmptyYearStrLength;

  if (!isValidCurrentValue) {
    return validValue;
  }

  validValue = currentValue;

  if (currentValueLength === dayStrLength) {
    validValue = isDeleting ? validValue.slice(0, dayStrLength - 1) : validValue + slash;
  }

  if (currentValueLength === dayMonthStrLength) {
    validValue += slashYear;
  }

  if (isDeletingYear) {
    validValue = validValue.slice(0, dayMonthStrLength - 1);
  }

  if (currentValueLength === dayMonthYearStrLength) {
    const reversedDate: Date = dateFromString(validValue);
    validValue = stringFromDate(reversedDate);
  }

  return validValue;
}
