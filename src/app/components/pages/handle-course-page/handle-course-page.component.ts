import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { DurationComponent } from '@component/pages/handle-course-page/components/duration/duration.component';
import { DateComponent } from '@component/pages/handle-course-page/components/date/date.component';
import { AuthorsComponent } from '@component/pages/handle-course-page/components/authors/authors.component';
import { HandleCourseForm } from '@models/handle-course-form.model';
import { Course } from '@models/course.model';
import { Author } from '@models/author.model';
import { descriptionMaxLength, editCourseRouteResolverKey, routePath, titleMaxLength } from '@data/constants';

import { Store } from '@ngrx/store';
import { coursesFeature } from '@store/features/courses-page.feature';
import { coursesPageActions } from '@store/actions/courses-page.actions';
import { ShowErrorDirective } from '@directives/show-error.directive';

@Component({
  selector: 'app-handle-course-page',
  standalone: true,
  imports: [
    DurationComponent,
    DateComponent,
    AuthorsComponent,
    ReactiveFormsModule,
    ShowErrorDirective
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
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(titleMaxLength)]
      }),
      description: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(descriptionMaxLength)]
      }),
      creationDate: new FormControl<Date | null>(null),
      duration: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.min(1)]
      }),
      authors: new FormControl<Author[]>([], {
        nonNullable: true,
        validators: [Validators.required]
      })
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
          creationDate: this.course.creationDate,
          authors: this.course.authors
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
      authors: this.handleCourseForm.value.authors
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
