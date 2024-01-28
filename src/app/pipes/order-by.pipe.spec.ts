import { OrderByPipe } from './order-by.pipe';
import { Course } from '../models/course.model';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  const second = 1000;
  const oldCourse: Course = {creationDate: new Date(Date.now() - second)} as Course;
  const currentCourse: Course = {creationDate: new Date()} as Course;
  const upcomingCourse: Course = {creationDate: new Date(Date.now() + second)} as Course;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array of courses in descendant order by default', () => {
    const courses: Course[] = [currentCourse, oldCourse, upcomingCourse];
    const result: Course[] = pipe.transform(courses);

    expect(result[0]).toBe(upcomingCourse);
    expect(result[1]).toBe(currentCourse);
    expect(result[2]).toBe(oldCourse);
  });

  it("should sort array of courses in ascendant order", () => {
    const courses: Course[] = [currentCourse, upcomingCourse, oldCourse];
    const result: Course[] = pipe.transform(courses, 'creationDate', false);

    expect(result[0]).toBe(oldCourse);
    expect(result[1]).toBe(currentCourse);
    expect(result[2]).toBe(upcomingCourse);
  });
});
