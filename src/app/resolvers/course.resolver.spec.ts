import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

import { CourseService } from '@services/course.service';
import { courseResolver } from '@resolvers/course.resolver';
import { Course } from '@models/course.model';

describe('courseResolver', () => {
  it('should return course', () => {
    const {result} = setup();

    (result as Observable<Course>).pipe(
    ).subscribe(course => {
      expect(course).toBeTruthy();
    });
  });

  it('should return null if there was an error', () => {
    const {result} = setup(true);

    (result as Observable<Course>).pipe(
    ).subscribe(course => {
      expect(course).toBeNull();
    });
  });
});

function setup(isError = false) {
  const courseServiceStub: Partial<CourseService> = {
    getById(): Observable<Course> {
      return of({} as Course).pipe(
        tap(() => {
          if (isError) {
            throw new Error();
          }
        })
      );
    }
  };

  TestBed.configureTestingModule({
    providers: [
      {
        provide: CourseService,
        useValue: courseServiceStub
      }
    ]
  });

  const result = TestBed.runInInjectionContext(() =>
    courseResolver({params: {}} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
  );

  return {
    result
  };
}
