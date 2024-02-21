import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { courseResolver } from './course.resolver';
import { CourseService } from '@services/course.service';
import { Course } from '@models/course.model';
import { Observable, of } from 'rxjs';

describe('courseResolver', () => {
  const executeResolver: ResolveFn<Observable<Course | null>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => courseResolver(...resolverParameters));
  const courseServiceStub: Partial<CourseService> = {
    getById(): Observable<Course> {
      return of();
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CourseService,
          useValue: courseServiceStub
        }
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
