export const SearchQueryFilter = (value: string): boolean => {
  const length = 3;

  return value.length >= length || !value.length
}
