import { CoursesState } from '@models/store/courses-state.model';

export const coursesInitialState: CoursesState = {
  courses: [],
  canLoadMore: true,
  authors: [],
  errors: {
    getAll: '',
    handle: '',
    loadMore: '',
    remove: null,
    getAuthors: ''
  }
};
