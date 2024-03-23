import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CoursesPageComponent } from './courses-page.component';
import { CourseComponent } from './components/course/course.component';
import { SearchComponent } from './components/search/search.component';

import { Course } from '@models/course.model';
import { CourseDeletionError } from '@models/course-deletion-error.model';

import { courses } from '@data/mock-data';

import { coursesFeature } from '@store/features/courses-page.feature';
import { coursesInitialState } from '@store/states/courses.state';

describe('CoursesPageComponent', () => {
  it('should create', () => {
    const {fixture} = setup();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should properly render courses', () => {
    const {fixture, coursePageDebugEl, store} = setup();

    store.overrideSelector(coursesFeature.selectCourses, [...courses]);
    store.refreshState();

    fixture.detectChanges();

    const courseDebugEl: DebugElement[] | null = coursePageDebugEl.queryAll(By.directive(CourseComponent));

    expect(courseDebugEl?.length).toBe(courses.length);
  });

  it('should display message if there are no courses', () => {
    const {fixture, coursePageDebugEl, store} = setup();

    store.overrideSelector(coursesFeature.selectCanLoadMore, false);
    store.refreshState();

    fixture.detectChanges();

    const courseDebugEl: DebugElement | null = coursePageDebugEl.query(By.css('[data-testId="noCourseMessage"]'));

    expect(courseDebugEl?.nativeElement.innerText).toBeTruthy();
  });

  it('should render search component', () => {
    const {coursePageDebugEl} = setup();
    const searchDebugEl: DebugElement | null = coursePageDebugEl.query(By.directive(SearchComponent));

    expect(searchDebugEl).not.toBeNull();
  });
});


function setup() {
  @Component({
    selector: 'app-course',
    template: '',
    standalone: true,
    providers: [{provide: CourseComponent, useExisting: StubCourseComponent}]
  })
  class StubCourseComponent implements Partial<CourseComponent> {
    @Input()
    course!: Course;
    @Input()
    deleteError!: CourseDeletionError;
    @Input()
    locale!: string;
  }

  @Component({
    selector: 'app-search',
    template: '',
    standalone: true,
    providers: [{provide: SearchComponent, useExisting: StubSearchComponent}]
  })
  class StubSearchComponent implements Partial<SearchComponent> {
  }

  TestBed.overrideComponent(CoursesPageComponent, {
    remove: {
      imports: [
        SearchComponent,
        CourseComponent
      ]
    },
    add: {
      imports: [
        StubSearchComponent,
        StubCourseComponent,
      ]
    }
  });

  TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [
      provideMockStore({
        initialState: {
          [coursesFeature.name]: {...coursesInitialState}
        },
      })
    ]
  });

  const fixture: ComponentFixture<CoursesPageComponent> = TestBed.createComponent(CoursesPageComponent);
  const coursePageDebugEl: DebugElement = fixture.debugElement;
  const coursesPageComponent: CoursesPageComponent = fixture.componentInstance;
  const store: MockStore = TestBed.inject(MockStore);

  fixture.detectChanges();

  return {
    fixture,
    coursePageDebugEl,
    coursesPageComponent,
    store
  };
}
