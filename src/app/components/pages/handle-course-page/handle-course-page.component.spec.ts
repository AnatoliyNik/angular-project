import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DebugElement } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { HandleCoursePageComponent } from './handle-course-page.component';
import { DurationComponent } from './components/duration/duration.component';
import { DateComponent } from './components/date/date.component';
import { AuthorsComponent } from './components/authors/authors.component';

import { coursesFeature } from '@store/features/courses-page.feature';
import { coursesInitialState } from '@store/states/courses.state';
import { coursesPageActions } from '@store/actions/courses-page.actions';

import { Course } from '@models/course.model';
import { RoutePath } from '@data/constants';
import { courses } from '@data/mock-data';

describe('HandleCoursePageComponent', () => {
  it('should create', () => {
    const {component} = setup();

    expect(component).toBeTruthy();
  });

  it('should render DurationComponent', () => {
    const {fixture} = setup();

    const durationComponentDebugEl: DebugElement | null = fixture.debugElement.query(By.directive(DurationComponent));

    expect(durationComponentDebugEl).not.toBeNull();
  });

  it('should render DateComponent', () => {
    const {fixture} = setup();

    const dateComponentDebugEl: DebugElement | null = fixture.debugElement.query(By.directive(DateComponent));

    expect(dateComponentDebugEl).not.toBeNull();
  });

  it('should render AuthorsComponent', () => {
    const {fixture} = setup();

    const authorsComponentDebugEl: DebugElement | null = fixture.debugElement.query(By.directive(AuthorsComponent));

    expect(authorsComponentDebugEl).not.toBeNull();
  });

  it('should create new course', () => {
    const {formGroup, form, store} = setup();

    formGroup.reset(courses[0]);
    form.triggerEventHandler('submit');

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: coursesPageActions.createCourse.type
      })
    );

  });

  it('should update course', () => {
    const {formGroup, component, form, store} = setup();

    formGroup.reset(courses[0]);
    component.course = {} as Course;
    form.triggerEventHandler('submit');

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: coursesPageActions.updateCourse.type
      })
    );
  });

  it('should navigate to courses page if user clicks cancel button', () => {
    const {fixture, router} = setup();
    const cancelBtn = fixture.debugElement.query(By.css('[data-testingId="handleFormCancelBtn"]'));

    expect(cancelBtn).not.toBeNull();

    spyOn(router, 'navigate');
    cancelBtn.triggerEventHandler('click');

    expect(router.navigate).toHaveBeenCalledWith([RoutePath.Courses]);
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, NoopAnimationsModule, TranslateModule.forRoot()],
    providers: [
      provideMomentDateAdapter(),
      provideMockStore({
      initialState: {
        [coursesFeature.name]: {...coursesInitialState}
      }
    })],
  });

  const fixture: ComponentFixture<HandleCoursePageComponent> = TestBed.createComponent(HandleCoursePageComponent);
  const component: HandleCoursePageComponent = fixture.componentInstance;
  const store: MockStore = TestBed.inject(MockStore);
  const router: Router = TestBed.inject(Router);

  const form: DebugElement = fixture.debugElement.query(By.directive(FormGroupDirective));
  const formGroup: FormGroupDirective = form.injector.get(FormGroupDirective);

  spyOn(store, 'dispatch');

  fixture.detectChanges();

  return {
    fixture,
    component,
    store,
    router,
    form,
    formGroup
  };
}
