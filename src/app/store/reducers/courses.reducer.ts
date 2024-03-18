import { ActionReducer, createReducer, on } from '@ngrx/store';
import { CoursesState } from '@models/store/courses-state.model';
import { coursesInitialState } from '@store/states/courses.state';
import { coursesPageActions } from '@store/actions/courses-page.actions';
import { Course } from '@models/course.model';
import { loginPageActions } from '@store/actions/login-page.actions';

export const coursesReducer: ActionReducer<CoursesState> = createReducer(
  coursesInitialState,
  on(coursesPageActions.getCourses, (state): CoursesState => ({
    ...coursesInitialState,
    authors: state.authors
  })),
  on(coursesPageActions.getCoursesSuccess, (state, {courses, canLoadMore}): CoursesState => ({
    ...state,
    courses,
    canLoadMore
  })),
  on(coursesPageActions.getCoursesError, (state, {error}): CoursesState => ({
    ...state,
    errors: {...state.errors, getAll: error}
  })),
  on(coursesPageActions.deleteCourse, (state): CoursesState => ({
    ...state,
    errors: {...state.errors, remove: null}
  })),
  on(coursesPageActions.deleteCourseSuccess, (state, {id}): CoursesState => ({
    ...state,
    courses: state.courses.filter(course => course.id !== id)
  })),
  on(coursesPageActions.deleteCourseError, (state, {error}): CoursesState => ({
    ...state,
    errors: {...state.errors, remove: error}
  })),
  on(coursesPageActions.searchCourses, (state): CoursesState => ({
    ...state,
    errors: {...state.errors, getAll: '', loadMore: ''}
  })),
  on(coursesPageActions.searchCoursesSuccess, (state, {courses, canLoadMore}): CoursesState => ({
    ...state,
    courses,
    canLoadMore
  })),
  on(coursesPageActions.searchCoursesError, (state, {error}): CoursesState => ({
    ...state,
    errors: {...state.errors, getAll: error}
  })),
  on(coursesPageActions.loadMore, (state): CoursesState => ({
    ...state,
    errors: {...state.errors, loadMore: ''}
  })),
  on(coursesPageActions.loadMoreSuccess, (state, {courses, canLoadMore}): CoursesState => ({
    ...state,
    canLoadMore,
    courses: [...state.courses, ...courses]
  })),
  on(coursesPageActions.loadMoreError, (state, {error}): CoursesState => ({
    ...state,
    errors: {...state.errors, loadMore: error}
  })),
  on(coursesPageActions.updateCourse, (state): CoursesState => ({
    ...state,
    errors: {...state.errors, handle: ''}
  })),
  on(coursesPageActions.updateCourseSuccess, (state, {course}): CoursesState => {
    const courses: Course[] = [...state.courses];
    const index: number = courses.findIndex(current => current.id === course.id);

    if (index === -1) {
      return state;
    }

    courses[index] = course;

    return {
      ...state,
      courses: [...courses]
    };
  }),
  on(coursesPageActions.updateCourseError, (state, {error}): CoursesState => ({
    ...state,
    errors: {...state.errors, handle: error}
  })),
  on(coursesPageActions.createCourse, (state): CoursesState => ({
    ...state,
    errors: {...state.errors, handle: ''}
  })),
  on(coursesPageActions.createCourseError, (state, {error}): CoursesState => ({
    ...state,
    errors: {...state.errors, handle: error}
  })),
  on(coursesPageActions.getAuthors, (state): CoursesState => ({
    ...state,
    errors: {...state.errors, getAuthors: ''}
  })),
  on(coursesPageActions.getAuthorsSuccess, (state, {authors}): CoursesState => ({
    ...state,
    authors
  })),
  on(coursesPageActions.getAuthorsError, (state, {error}): CoursesState => ({
    ...state,
    errors: {
      ...state.errors,
      getAuthors: error
    }
  })),
  on(loginPageActions.logout, (): CoursesState => ({...coursesInitialState})),
);
