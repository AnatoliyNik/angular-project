import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { DurationComponent } from '@component/pages/handle-course-page/components/duration/duration.component';
import { DateComponent } from '@component/pages/handle-course-page/components/date/date.component';
import { AuthorsComponent } from '@component/pages/handle-course-page/components/authors/authors.component';
import { HandleCourseForm } from '@models/handle-course-form.model';
import { Course } from '@models/course.model';
import { editCourseRouteResolverKey, routePath } from '@data/constants';

import { Store } from '@ngrx/store';
import { coursesFeature } from '@store/features/courses-page.feature';
import { coursesPageActions } from '@store/actions/courses-page.actions';

@Component({
  selector: 'app-handle-course-page',
  standalone: true,
  imports: [
    DurationComponent,
    DateComponent,
    AuthorsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './handle-course-page.component.html',
  styleUrl: './handle-course-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandleCoursePageComponent implements OnInit {
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
  readonly newCoursePageTitle = 'New course';
  readonly editCoursePageTitle = 'Edit course';
  pageTitle = this.newCoursePageTitle;

  handleCourseForm!: FormGroup<HandleCourseForm>;
  course?: Course;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private store: Store = inject(Store);

  error: Signal<string> = this.store.selectSignal(coursesFeature.selectHandle);

  ngOnInit(): void {
    this.handleCourseForm = new FormGroup<HandleCourseForm>({
      title: new FormControl<string>('', {nonNullable: true}),
      description: new FormControl<string>('', {nonNullable: true}),
      creationDate: new FormControl<Date | null>(null),
      duration: new FormControl<number>(0, {nonNullable: true})
    });

    this.route.data.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data: Data) => {
      this.course = data[editCourseRouteResolverKey];

      if (this.course) {
        this.pageTitle = this.editCoursePageTitle;

        this.handleCourseForm.setValue({
          title: this.course.title,
          description: this.course.description,
          duration: this.course.duration,
          creationDate: this.course.creationDate
        });
      }
    });
  }

  onSubmit(): void {
    if (this.handleCourseForm.invalid || this.handleCourseForm.pending) {
      return;
    }

    const course: Course = {
      title: this.handleCourseForm.controls.title.value,
      description: this.handleCourseForm.controls.description.value,
      duration: this.handleCourseForm.controls.duration.value,
      creationDate: this.handleCourseForm.value.creationDate || new Date(),
    } as Course;

    if (this.course) {
      this.store.dispatch(coursesPageActions.updateCourse({id: this.course.id, course}));

      return;
    }

    const newCourse: Course = {
      ...course,
      id: String(Date.now()),
      topRated: false
    };

    this.store.dispatch(coursesPageActions.createCourse({newCourse}));
  }

  onCancel(): void {
    this.router.navigate([routePath.courses]);
  }
}
