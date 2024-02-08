export function dateFromString(string: string): Date {
  const date: string = string.split('/').reverse().join('/');
  return new Date(date);
}

