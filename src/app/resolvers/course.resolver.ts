import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Course } from '@models/course.model';
import { inject } from '@angular/core';
import { CourseService } from '@services/course.service';
import { editCourseRouteIdParam } from '@data/constants';

export const courseResolver: ResolveFn<Course | undefined> = (route: ActivatedRouteSnapshot): Course | undefined => {
  const id: string = route.params[editCourseRouteIdParam];
  const courseService: CourseService = inject(CourseService);

  return courseService.getById(id);
};
