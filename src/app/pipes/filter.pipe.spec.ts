import { FilterPipe } from './filter.pipe';
import { Course } from '../models/course.model';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return only courses that contains query string in its title', () => {
    const title = 'mock title';
    const course: Course = {title} as Course;
    const courses: Course[] = [course];
    const result: Course[] = pipe.transform(courses, title);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe(title);
  });

  it('should return all courses if query string is empty', () => {
    const courses: Course[] = [{} as Course];

    expect(pipe.transform(courses, '')).toBe(courses);
  });

  it('should trim query string', () => {
    const queryWithWhitespaces = '    title   ';
    const trimmedQuery = queryWithWhitespaces.trim();
    const course: Course = {title: trimmedQuery} as Course;
    const courses: Course[] = [course];
    const result: Course[] = pipe.transform(courses, queryWithWhitespaces);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe(trimmedQuery);
  });
});
