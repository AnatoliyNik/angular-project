import { CoursesState } from '@models/store/courses-state.model';

export const coursesInitialState: CoursesState = {
  courses: [],
  canLoadMore: true,
  errors: {
    getAll: '',
    handle: '',
    loadMore: '',
    remove: null,
  }
};
