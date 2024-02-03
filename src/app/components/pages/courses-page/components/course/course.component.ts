import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ColorDirective } from '@directives/color.directive';
import { DurationPipe } from '@pipes/duration.pipe';
import { Course } from '@models/course.model';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    DatePipe,
    DurationPipe,
    NgClass
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  hostDirectives: [{
    directive: ColorDirective,
    inputs: ['course']
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
  readonly editButtonText = 'Edit';
  readonly deleteButtonText = 'Delete';

  @Input({required: true})
  course: Course = {} as Course;

  @Output()
  delete: EventEmitter<Course> = new EventEmitter<Course>();

  onDeleteCourse(course: Course): void {
    this.delete.emit(course);
  }
}
