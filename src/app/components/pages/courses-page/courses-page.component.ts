import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpperCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';
import { CourseComponent } from './components/course/course.component';
import { CourseService } from '@services/course.service';
import { OrderByPipe } from '@pipes/order-by.pipe';
import { FilterPipe } from '@pipes/filter.pipe';
import { Course } from '@models/course.model';
import { ModalService } from '@services/modal.service';
import { routePath } from '@data/constants';
import { CourseDeletionError } from '@models/course-deletion-error.model';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    SearchComponent,
    CourseComponent,
    UpperCasePipe,
  ],
  providers: [OrderByPipe, FilterPipe],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit {
  readonly addCourseButtonText = 'Add course';
  readonly loadMoreButtonText = 'Load more';
  readonly noCoursesMessage = 'No data. Feel free to add new course';

  coursesToDisplay: WritableSignal<Course[]> = signal<Course[]>([]);
  canLoadMore!: Signal<boolean>;
  error: WritableSignal<string> = signal<string>('');
  loadMoreError: WritableSignal<string> = signal<string>('');
  deleteError: WritableSignal<CourseDeletionError | null> = signal<CourseDeletionError | null>(null);

  private courseService: CourseService = inject(CourseService);
  private modalService: ModalService = inject(ModalService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.canLoadMore = this.courseService.canLoadMore;

    this.courseService.courses$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (courses: Course[]) => {
        this.coursesToDisplay.set(courses);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set(error.message);
      }
    });
  }

  onDeleteCourse(course: Course): void {
    const modalTitle = 'Delete course?';
    const modalText = `Are you sure you want to delete "${course.title}"?`;

    this.modalService.showConfirm(modalTitle, modalText).pipe(
      switchMap((answer: boolean) => {
        if (answer) {
          return this.courseService.remove(course.id);
        }

        return EMPTY
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      error: (error: HttpErrorResponse) => {
        const courseDeletionError: CourseDeletionError = {
          id: course.id,
          message: error.message
        };
        this.deleteError.set(courseDeletionError);
      }
    });
  }

  onSearch(searchText: string): void {
    this.error.set('');
    this.loadMoreError.set('');

    this.courseService.search(searchText).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  onEditCourse(id: string): void {
    this.router.navigate([routePath.courses, id]);
  }

  onAddCourse(): void {
    this.router.navigate([routePath.newCourse]);
  }

  loadMore(): void {
    this.loadMoreError.set('');

    this.courseService.loadMore().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      error: (error: HttpErrorResponse) => {
        this.loadMoreError.set(error.message);
      }
    });
  }
}
