import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesPageComponent } from './courses-page.component';
import { CourseComponent } from './components/course/course.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';

import { Course } from '@models/course.model';

import { courses } from '@data/mock-data';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CoursesPageComponent', () => {
  it('should create', () => {
    const {fixture} = setup();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should properly render courses', () => {
    const {fixture, coursePageDebugEl, coursesPageComponent, changeDetectorRef} = setup();

    coursesPageComponent.coursesToDisplay.set([...courses]);
    changeDetectorRef.markForCheck();

    fixture.detectChanges();

    const courseDebugEl: DebugElement[] | null = coursePageDebugEl.queryAll(By.directive(CourseComponent));

    expect(courseDebugEl?.length).toBe(courses.length);
  });

  it('should display message if there are no courses in uppercase', () => {
    const {fixture, coursePageDebugEl, coursesPageComponent, changeDetectorRef} = setup();

    coursesPageComponent.coursesToDisplay.set([]);
    changeDetectorRef.markForCheck();

    fixture.detectChanges();

    const courseDebugEl: DebugElement | null = coursePageDebugEl.query(By.css('[data-testId="noCourseMessage"]'));

    expect(courseDebugEl?.nativeElement.innerText).toContain(coursesPageComponent.noCoursesMessage.toUpperCase());
  });

  it('should render search component', () => {
    const {coursePageDebugEl} = setup();
    const searchDebugEl: DebugElement | null = coursePageDebugEl.query(By.directive(SearchComponent));

    expect(searchDebugEl).not.toBeNull();
  });

  it('should render breadcrumbs component', () => {
    const {coursePageDebugEl} = setup();
    const searchDebugEl: DebugElement | null = coursePageDebugEl.query(By.directive(BreadcrumbsComponent));

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
  }

  @Component({
    selector: 'app-search',
    template: '',
    standalone: true,
    providers: [{provide: SearchComponent, useExisting: StubSearchComponent}]
  })
  class StubSearchComponent implements Partial<SearchComponent> {
  }

  @Component({
    selector: 'app-breadcrumbs',
    template: '',
    standalone: true,
    providers: [{provide: BreadcrumbsComponent, useExisting: StubBreadcrumbsComponent}]
  })
  class StubBreadcrumbsComponent implements Partial<BreadcrumbsComponent> {
  }

  TestBed.overrideComponent(CoursesPageComponent, {
    remove: {
      imports: [
        BreadcrumbsComponent,
        SearchComponent,
        CourseComponent
      ]
    },
    add: {
      imports: [
        StubBreadcrumbsComponent,
        StubSearchComponent,
        StubCourseComponent,
      ]
    }
  });

  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule]
  });

  const fixture: ComponentFixture<CoursesPageComponent> = TestBed.createComponent(CoursesPageComponent);
  const coursePageDebugEl: DebugElement = fixture.debugElement;
  const coursesPageComponent: CoursesPageComponent = fixture.componentInstance;
  const changeDetectorRef: ChangeDetectorRef = coursePageDebugEl.injector.get(ChangeDetectorRef);

  fixture.detectChanges();

  return {
    fixture,
    coursePageDebugEl,
    coursesPageComponent,
    changeDetectorRef
  };
}
