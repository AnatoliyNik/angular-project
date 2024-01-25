import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from "../../../../../models/course.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
  readonly editButtonText = 'Edit';
  readonly deleteButtonText = 'Delete';

  @Input({required: true})
  course!: Course

  @Output()
  delete: EventEmitter<string> = new EventEmitter<string>();

  onDeleteCourse(id: string): void {
    this.delete.emit(id)
  }
}
