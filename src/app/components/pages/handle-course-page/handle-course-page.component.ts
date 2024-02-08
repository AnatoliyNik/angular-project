import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DurationComponent } from '@component/pages/handle-course-page/components/duration/duration.component';
import { DateComponent } from '@component/pages/handle-course-page/components/date/date.component';
import { AuthorsComponent } from '@component/pages/handle-course-page/components/authors/authors.component';

@Component({
  selector: 'app-handle-course-page',
  standalone: true,
  imports: [
    DurationComponent,
    DateComponent,
    AuthorsComponent
  ],
  templateUrl: './handle-course-page.component.html',
  styleUrl: './handle-course-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandleCoursePageComponent {
  readonly required = '*required';
  readonly titleLabelText = 'Title:';
  readonly titleInputPlaceholderText = 'Add title';
  readonly descriptionLabelText = 'Description:';
  readonly descriptionTextareaPlaceholderText = 'Add description';
  readonly durationLabelText = 'Duration:';
  readonly durationComponentPlaceholderText = 'minutes';
  readonly dateLabelText = 'Date:';
  readonly dateComponentPlaceholderText = 'DD/MM/YYYY';
  readonly authorsLabelText = 'Authors:';
  readonly authorsComponentPlaceholderText = 'Start typing';
  readonly cancelButtonText = 'Cancel';
  readonly saveButtonText = 'Save';
  pageTitle = 'New course';
}
