import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';
import { sortByField } from '../helpers/sortByField';

@Pipe({
  name: 'orderBy',
  standalone: true
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], field: keyof Course = 'creationDate', desc: boolean = true): Course[] {
    const sortedCourses: Course[] = courses.sort(sortByField(field, desc));

    return [...sortedCourses];
  }

}
