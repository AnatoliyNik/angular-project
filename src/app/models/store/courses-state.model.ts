import { Course } from '@models/course.model';
import { CourseStateErrors } from '@models/store/courses-state-errors.model';
import { Author } from '@models/author.model';

export interface CoursesState {
  courses: Course[];
  canLoadMore: boolean;
  errors: CourseStateErrors;
  authors: Author[]
}
