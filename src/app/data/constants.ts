import { MatDateFormats } from '@angular/material/core';
import { environment } from '@environments/environment.development';

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

const baseUrl: string = environment.coursesServerUrl;

export const coursesServerUrl = {
  login: `${baseUrl}auth/login`,
  userinfo: `${baseUrl}auth/userInfo`,
  courses: `${baseUrl}courses`
};
