import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

import { CourseService } from '@services/course.service';
import { coursesServerUrl } from '@data/constants';
import { CourseFromServer } from '@models/course-from-server.model';
import { Course } from '@models/course.model';
import { of } from 'rxjs';

describe('CourseService', () => {
  it('should be created', () => {
    const {courseService} = setup();

    expect(courseService).toBeTruthy();
  });

  it('should return array of all courses', () => {
    const {courseService, mockCourses, httpTestingController} = setup();

    courseService.getAll().subscribe(courses => {
      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBe(mockCourses.length);
      expect(courses[0].title).toBe(mockCourses[0].name);
    });

    const req: TestRequest = httpTestingController.expectOne((req: HttpRequest<unknown>) => req.url.includes(coursesServerUrl.courses));
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
    httpTestingController.verify();
  });


  it('should create new course', () => {
    const {courseService, httpTestingController} = setup();
    const name = 'new course';
    const newCourse: Course = {creationDate: new Date()} as Course;
    const newCourseFromServer: CourseFromServer = {name} as CourseFromServer;

    courseService.create(newCourse).subscribe((course: Course) => {
      expect(course.title).toBe(newCourseFromServer.name);
    });

    const req: TestRequest = httpTestingController.expectOne((req: HttpRequest<unknown>) => req.url.includes(coursesServerUrl.courses));
    expect(req.request.method).toBe('POST');
    req.flush(newCourseFromServer);

    httpTestingController.verify();
  });

  it('should update existing course', () => {
    const {courseService, httpTestingController} = setup();
    const newCourse: Partial<Course> = {creationDate: new Date()};
    const updatedCourse: CourseFromServer = {name: 'updated'} as CourseFromServer;
    const id: string = 'mock id';

    courseService.update(id, newCourse).subscribe((course: Course) => {
      expect(course.title).toBe(updatedCourse.name);
    });

    const req: TestRequest = httpTestingController.expectOne((req: HttpRequest<unknown>) => req.url.includes(`${coursesServerUrl.courses}/${id}`));
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedCourse);

    httpTestingController.verify();
  });

  it('should get course by its id', () => {
    const {courseService, httpTestingController} = setup();
    const id = 123;
    const courseFromServer: CourseFromServer = {name: 'some name'} as CourseFromServer;

    courseService.getById(id).subscribe((course: Course) => {
      expect(course.title).toBe(courseFromServer.name);
    });

    const req: TestRequest = httpTestingController.expectOne((req: HttpRequest<unknown>) => req.url.includes(`${coursesServerUrl.courses}/${id}`));
    expect(req.request.method).toBe('GET');
    req.flush(courseFromServer);

    httpTestingController.verify();
  });

  it('should remove course by its id', () => {
    const {courseService, httpTestingController} = setup();
    const id = 'some id';

    courseService.remove(id).subscribe();

    const req: TestRequest = httpTestingController.expectOne((req: HttpRequest<unknown>) => req.url.includes(`${coursesServerUrl.courses}/${id}`));
    expect(req.request.method).toBe('DELETE');

    httpTestingController.verify();
  });

  it('should load more courses', () => {
    const {courseService} = setup();
    const getAllSpy = spyOn(courseService, 'getAll').and.returnValue(of([]));

    courseService.loadMore().subscribe(() => {
      expect(getAllSpy).toHaveBeenCalled();
    });
  });

  it('should search courses', () => {
    const {courseService, httpTestingController} = setup();
    const textToSearch = 'some text';
    const getAllSpy = spyOn(courseService, 'getAll').and.callThrough();

    courseService.search(textToSearch).subscribe();

    const req: TestRequest = httpTestingController.expectOne((req: HttpRequest<unknown>) => {
      return req.params.get('start') === '0' && req.params.get('textFragment') === textToSearch;
    });

    expect(req.request.method).toBe('GET');
    expect(getAllSpy).toHaveBeenCalled();

    httpTestingController.verify();
  });

});

function setup() {
  const mockCourse: CourseFromServer = {id: 222, name: 'mock name'} as CourseFromServer;
  const mockCourses: CourseFromServer[] = [mockCourse];

  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  });

  const courseService: CourseService = TestBed.inject(CourseService);
  const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

  return {
    courseService,
    mockCourses,
    httpTestingController
  };
}
