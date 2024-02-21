import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef, Component, DebugElement, Input, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesPageComponent } from './courses-page.component';
import { CourseComponent } from './components/course/course.component';
import { SearchComponent } from './components/search/search.component';

import { Course } from '@models/course.model';
import { CourseDeletionError } from '@models/course-deletion-error.model';

import { courses } from '@data/mock-data';

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

    coursesPageComponent.canLoadMore = signal(false)
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
    deleteError!: CourseDeletionError
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
    imports: [HttpClientTestingModule]
  })

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
