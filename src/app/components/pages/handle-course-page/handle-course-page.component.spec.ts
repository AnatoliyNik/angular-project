import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HandleCoursePageComponent } from './handle-course-page.component';
import { coursesFeature } from '@store/features/courses-page.feature';
import { coursesInitialState } from '@store/states/courses.state';
import { By } from '@angular/platform-browser';
import { FormGroupDirective } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { coursesPageActions } from '@store/actions/courses-page.actions';
import { Course } from '@models/course.model';
import { Router } from '@angular/router';
import { routePath } from '@data/constants';

describe('HandleCoursePageComponent', () => {
  let component: HandleCoursePageComponent;
  let fixture: ComponentFixture<HandleCoursePageComponent>;
  let store: MockStore;
  let form: DebugElement;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({
        initialState: {
          [coursesFeature.name]: {...coursesInitialState}
        }
      })]
    });

    fixture = TestBed.createComponent(HandleCoursePageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    form = fixture.debugElement.query(By.directive(FormGroupDirective));

    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new course', () => {
    form.triggerEventHandler('submit');

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: coursesPageActions.createCourse.type
      })
    );

  });

  it('should update course', () => {
    component.course = {} as Course;
    form.triggerEventHandler('submit');

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: coursesPageActions.updateCourse.type
      })
    );
  });

  it('should navigate to courses page if user clicks cancel button', () => {
    const cancelBtn = fixture.debugElement.query(By.css('[data-testingId="handleFormCancelBtn"]'));

    expect(cancelBtn).not.toBeNull();

    spyOn(router, 'navigate');
    cancelBtn.triggerEventHandler('click');

    expect(router.navigate).toHaveBeenCalledWith([routePath.courses]);
  });
});

