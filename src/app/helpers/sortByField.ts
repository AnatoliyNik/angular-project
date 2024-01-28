export const sortByField = <T>(field: keyof T, desc: boolean = true) => (a: T, b: T): number => {
  const value1 = a[field];
  const value2 = b[field];

  if (desc) {
    return value2 > value1 ? 1 : -1;
  }

  return value1 > value2 ? 1 : -1;
};
