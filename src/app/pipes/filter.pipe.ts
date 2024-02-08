import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '@models/course.model';
import { filterByQuery } from '@helpers/filter-by-query';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(courses: Course[], query: string): Course[] {
    query = query.trim();

    if (!query) {
      return courses;
    }

    return courses.filter(filterByQuery(query, 'title'));
  }

}
