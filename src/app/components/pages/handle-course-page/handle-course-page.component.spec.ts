import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleCoursePageComponent } from './handle-course-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HandleCoursePageComponent', () => {
  let component: HandleCoursePageComponent;
  let fixture: ComponentFixture<HandleCoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(HandleCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

