import { InjectionToken } from '@angular/core';
import { Course } from '@models/course.model';
import { courses } from '@data/mock-data';

export const COURSES: InjectionToken<Course[]> = new InjectionToken<Course[]>('mock courses', {
  providedIn: 'root',
  factory: () => courses
});

