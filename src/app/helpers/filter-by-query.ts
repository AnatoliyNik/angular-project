export const filterByQuery = <T, P extends keyof T>(query: string, property: P) => (course: T): boolean => {
  query = query.toLowerCase();

  return String(course[property]).toLowerCase().includes(query);
};
