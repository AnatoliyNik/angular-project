import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpperCasePipe } from '@angular/common';
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
  allCourses: Course[] = [];

  private orderByPipe: OrderByPipe = inject(OrderByPipe);
  private filterPipe: FilterPipe = inject(FilterPipe);
  private courseService: CourseService = inject(CourseService);
  private modalService: ModalService = inject(ModalService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.courseService.getAll().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((courses: Course[]) => {
      this.allCourses = courses;
      this.coursesToDisplay.set(this.orderByPipe.transform(courses));
    });
  }

  onDeleteCourse(course: Course): void {
    const modalTitle = 'Delete course?';
    const modalText = `Are you sure you want to delete "${course.title}"?`;

    this.modalService.showConfirm(modalTitle, modalText).subscribe((answer: boolean) => {
      if (answer) {
        this.courseService.remove(course.id);
      }
    });
  }

  onSearch(searchText: string): void {
    this.coursesToDisplay.set(this.filterPipe.transform(this.allCourses, searchText));
  }

  onEditCourse(id: string): void {
    this.router.navigate([routePath.courses, id]);
  }

  onAddCourse(): void {
    this.router.navigate([routePath.newCourse]);
  }
}
