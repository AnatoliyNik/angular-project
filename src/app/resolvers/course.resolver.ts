import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Course } from '@models/course.model';
import { inject } from '@angular/core';
import { CourseService } from '@services/course.service';
import { editCourseRouteIdParam } from '@data/constants';
import { catchError, Observable, of } from 'rxjs';

export const courseResolver: ResolveFn<Observable<Course | null>> = (route: ActivatedRouteSnapshot): Observable<Course | null> => {
  const id = Number(route.params[editCourseRouteIdParam]);
  const courseService: CourseService = inject(CourseService);

  return courseService.getById(id).pipe(
    catchError(() => {
      return of(null);
    })
  );
};
