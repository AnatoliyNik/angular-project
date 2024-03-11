import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '@models/course.model';
import { CourseDeletionError } from '@models/course-deletion-error.model';

export const coursesPageActions = createActionGroup({
  source: 'Courses Page',
  events: {
    'Get Courses': emptyProps(),
    'Get Courses Success': props<{ courses: Course[], canLoadMore: boolean }>(),
    'Get Courses Error': props<{ error: string }>(),
    'Delete Course': props<{ course: Course }>(),
    'Delete Course Cancel': emptyProps(),
    'Delete Course Success': props<{ id: string }>(),
    'Delete Course Error': props<{ error: CourseDeletionError }>(),
    'Search Courses': props<{ searchText: string }>(),
    'Search Courses Success': props<{ courses: Course[], canLoadMore: boolean }>(),
    'Search Courses Error': props<{ error: string }>(),
    'Load More': emptyProps(),
    'Load More Success': props<{ courses: Course[], canLoadMore: boolean }>(),
    'Load More Error': props<{ error: string }>(),
    'Update Course': props<{ id: string, course: Course }>(),
    'Update Course Success': props<{ course: Course }>(),
    'Update Course Error': props<{ error: string }>(),
    'Create Course': props<{ newCourse: Course }>(),
    'Create Course Success': props<{ course: Course }>(),
    'Create Course Error': props<{ error: string }>(),
  }
});
