import { CourseDeletionError } from '@models/course-deletion-error.model';

export interface CourseStateErrors {
  getAll: string,
  handle: string,
  loadMore: string
  remove: CourseDeletionError | null,
  getAuthors: string
}
