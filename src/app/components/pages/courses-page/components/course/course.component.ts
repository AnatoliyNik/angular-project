import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Course } from '../../../../../models/course.model';
import { ColorDirective } from '../../../../../directives/color.directive';
import { DurationPipe } from '../../../../../pipes/duration.pipe';

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
  delete: EventEmitter<string> = new EventEmitter<string>();

  onDeleteCourse(id: string): void {
    this.delete.emit(id);
  }
}
