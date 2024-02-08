import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleCoursePageComponent } from './handle-course-page.component';

describe('HandleCoursePageComponent', () => {
  let component: HandleCoursePageComponent;
  let fixture: ComponentFixture<HandleCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleCoursePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandleCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
