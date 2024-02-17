import { MatDateFormats } from '@angular/material/core';

export const matDateFormats: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const editCourseRouteIdParam = 'id';
export const editCourseRouteResolverKey = 'course';

export enum routePath {
  courses = 'courses',
  login = 'login',
  notFound = 'not-found',
  newCourse = 'courses/new',
  editCourse = `courses/:${editCourseRouteIdParam}`
}
