import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { Course } from '@models/course.model';
import { COURSES } from '@tokens/courses.token';

describe('CourseService', () => {
  it('should be created', () => {
    const {courseService} = setup();

    expect(courseService).toBeTruthy();
  });

  it('should return array of all courses', () => {
    const {courseService, mockCourses} = setup();

    courseService.getAll().subscribe(courses => {
      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBe(mockCourses.length);
      expect(courses[0]).toBe(mockCourses[0]);
    });
  });


  it('should create new course', () => {
    const {courseService, mockCourses} = setup();
    const id = 'new course';
    const newCourse: Course = {id} as Course;
    const coursesLength: number = mockCourses.length;

    courseService.create(newCourse);

    courseService.getAll().subscribe(courses => {
      expect(courses.length).toBe(coursesLength + 1);

      const newCourse: Course | undefined = courses.find(course => course.id === id);

      expect(newCourse).toBeTruthy();
    });
  });

  it('should update existing course', () => {
    const {courseService, mockCourses} = setup();
    const newCourse: Partial<Course> = {title: 'new test title'};
    const id: string = mockCourses[0].id;

    const updatedCourse: Course | undefined = courseService.update(id, newCourse);

    expect(updatedCourse).toBeTruthy();
    expect(updatedCourse?.title).toBe(newCourse.title);
  });

  it('should get course by its id', () => {
    const {courseService, mockCourses} = setup();
    const id: string = mockCourses[0].id;

    const course: Course | undefined = courseService.getById(id);

    expect(course).toBeTruthy();
    expect(course?.id).toBe(mockCourses[0].id);
  });

  it('should remove course by its id', () => {
    const {courseService, mockCourses} = setup();
    const id: string = mockCourses[0].id;
    const coursesLength: number = mockCourses.length;

    courseService.remove(id);

    courseService.getAll().subscribe(courses => {
      expect(courses.length).toBe(coursesLength - 1);
    });
  });

});

function setup() {
  const mockCourse: Course = {id: 'mock id'} as Course;
  const mockCourses: Course[] = [mockCourse];

  TestBed.configureTestingModule({
    providers: [{
      provide: COURSES,
      useValue: mockCourses
    }]
  });

  const courseService: CourseService = TestBed.inject(CourseService);

  return {
    courseService,
    mockCourses
  };
}
