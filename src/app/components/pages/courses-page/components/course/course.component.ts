import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ColorDirective } from '@directives/color.directive';
import { DurationPipe } from '@pipes/duration.pipe';
import { Course } from '@models/course.model';
import { appearance } from '@animations/appearance.animation';
import { CourseDeletionError } from '@models/course-deletion-error.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    DatePipe,
    DurationPipe,
    NgClass,
    TranslateModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  hostDirectives: [{
    directive: ColorDirective,
    inputs: ['course']
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appearance]
})
export class CourseComponent {
  @HostBinding('@appearance')

  @Input({required: true})
  course: Course = {} as Course;

  @Input()
  deleteError: CourseDeletionError | null = null;

  @Input()
  locale!: string

  @Output()
  delete: EventEmitter<Course> = new EventEmitter<Course>();

  @Output()
  edit: EventEmitter<string> = new EventEmitter<string>();

  onDeleteCourse(course: Course): void {
    this.delete.emit(course);
  }

  onEditCourse(id: string): void {
    this.edit.emit(id);
  }
}
