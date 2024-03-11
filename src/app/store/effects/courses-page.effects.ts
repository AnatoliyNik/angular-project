import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { CourseService } from '@services/course.service';
import { ModalService } from '@services/modal.service';
import { Course } from '@models/course.model';
import { routePath } from '@data/constants';

import { coursesPageActions } from '@store/actions/courses-page.actions';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';

export const getCourses: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    courseService: CourseService = inject(CourseService)
  ) => {
    return actions$.pipe(
      ofType(coursesPageActions.getCourses),
      exhaustMap(() => {
        courseService.resetInitialData();

        return courseService.getAll().pipe(
          map((courses: Course[]) => coursesPageActions.getCoursesSuccess({
            courses,
            canLoadMore: courseService.canLoadMore
          })),
          catchError((error: HttpErrorResponse) => of(coursesPageActions.getCoursesError({error: error.message})))
        );
      })
    );
  },
  {functional: true}
);

export const remove: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    courseService: CourseService = inject(CourseService),
    modalService: ModalService = inject(ModalService)
  ) => {
    return actions$.pipe(
      ofType(coursesPageActions.deleteCourse),
      exhaustMap(({course}) => {
        const modalTitle = 'Delete course?';
        const modalText = `Are you sure you want to delete "${course.title}"?`;

        return modalService.showConfirm(modalTitle, modalText).pipe(
          switchMap((result: boolean) => {
            if (!result) {
              return of(coursesPageActions.deleteCourseCancel());
            }

            return courseService.remove(course.id).pipe(
              map(() => coursesPageActions.deleteCourseSuccess({id: course.id})),
              catchError((error: HttpErrorResponse) => of(coursesPageActions.deleteCourseError({
                error: {
                  id: course.id,
                  message: error.message
                }
              })))
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const search: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    courseService: CourseService = inject(CourseService)
  ) => {
    return actions$.pipe(
      ofType(coursesPageActions.searchCourses),
      switchMap(({searchText}) => courseService.search(searchText).pipe(
        map((courses) => coursesPageActions.searchCoursesSuccess({courses, canLoadMore: courseService.canLoadMore})),
        catchError((error: HttpErrorResponse) => of(coursesPageActions.searchCoursesError({error: error.message})))
      ))
    )
      ;
  },
  {functional: true}
);


export const loadMore: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    courseService: CourseService = inject(CourseService)
  ) => {
    return actions$.pipe(
      ofType(coursesPageActions.loadMore),
      exhaustMap(() => courseService.loadMore().pipe(
        map((courses) => coursesPageActions.loadMoreSuccess({courses, canLoadMore: courseService.canLoadMore})),
        catchError((error: HttpErrorResponse) => of(coursesPageActions.loadMoreError({error: error.message})))
      ))
    );
  },
  {functional: true}
);

export const update: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    courseService: CourseService = inject(CourseService),
    router: Router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(coursesPageActions.updateCourse),
      exhaustMap(({id, course}) => courseService.update(id, course).pipe(
        map((course) => {
          router.navigate([routePath.courses]);

          return coursesPageActions.updateCourseSuccess({course});
        }),
        catchError((error: HttpErrorResponse) => of(coursesPageActions.updateCourseError({error: error.message})))
      ))
    );
  },
  {functional: true}
);

export const create: FunctionalEffect = createEffect((
    actions$: Actions = inject(Actions),
    courseService: CourseService = inject(CourseService),
    router: Router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(coursesPageActions.createCourse),
      exhaustMap(({newCourse}) => courseService.create(newCourse).pipe(
        map((course) => {
          router.navigate([routePath.courses]);

          return coursesPageActions.createCourseSuccess({course});
        }),
        catchError((error: HttpErrorResponse) => of(coursesPageActions.createCourseError({error: error.message})))
      ))
    );
  },
  {functional: true}
);
