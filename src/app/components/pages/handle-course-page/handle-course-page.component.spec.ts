import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HandleCoursePageComponent } from './handle-course-page.component';

describe('HandleCoursePageComponent', () => {
  let component: HandleCoursePageComponent;
  let fixture: ComponentFixture<HandleCoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(HandleCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

