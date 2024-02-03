import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { CourseComponent } from './course.component';
import { Course } from '@models/course.model';
import { courses } from '@data/mock-data';

describe('CourseComponent', () => {

  it('should create', () => {
    const {courseDebugEl} = setup();

    expect(courseDebugEl.componentInstance).toBeTruthy();
  });

  it('should take course as input parameter', () => {
    const {fixture, courseDebugEl} = setup();

    expect(fixture.componentInstance.course).toBe(courseDebugEl.componentInstance.course);
  })

  it('should emit course if delete button is clicked', () => {
    const {fixture, courseDebugEl} = setup();
    const deleteButtonDebugEl: DebugElement = courseDebugEl.query(By.css('[data-testingId="deleteButton"]'))

    deleteButtonDebugEl.triggerEventHandler('click');

    expect(fixture.componentInstance.emittedCourse).toBe(fixture.componentInstance.course)
  });
});


function setup() {
  @Component({
    standalone: true,
    imports: [
      CourseComponent
    ],
    template: `
      <app-course
        [course]="course"
        (delete)="emittedCourse = $event"
      />`,
  })
  class HostCourseComponent {
    course: Course = courses[0];
    emittedCourse!: Course;
  }

  const fixture: ComponentFixture<HostCourseComponent> = TestBed.createComponent(HostCourseComponent);
  const courseDebugEl: DebugElement = fixture.debugElement.query(By.directive(CourseComponent));

  fixture.detectChanges();

  return {
    fixture,
    courseDebugEl
  }
}
