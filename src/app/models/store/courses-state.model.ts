import { Course } from '@models/course.model';
import { CourseStateErrors } from '@models/store/courses-state-errors.model';

export interface CoursesState {
  courses: Course[];
  canLoadMore: boolean;
  errors: CourseStateErrors;
}
