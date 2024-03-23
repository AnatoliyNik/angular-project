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

export enum RoutePath {
  Courses = 'courses',
  Login = 'login',
  NotFound = 'not-found',
  NewCourse = 'courses/new',
  EditCourse = `courses/:${editCourseRouteIdParam}`
}

const baseUrl: string = environment.coursesServerUrl;

export const coursesServerUrl = {
  login: `${baseUrl}auth/login`,
  userinfo: `${baseUrl}auth/userInfo`,
  courses: `${baseUrl}courses`,
  authors: `${baseUrl}authors`,
};

export const titleMaxLength = 50;
export const descriptionMaxLength = 500;

export enum Language {
  En = 'en',
  Ru = 'ru'
}
