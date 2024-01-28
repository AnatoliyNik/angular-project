import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';
import { CourseComponent } from './components/course/course.component';
import { Course } from '../../../models/course.model';
import { OrderByPipe } from '../../../pipes/order-by.pipe';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { courses } from '../../../data/mock-data';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {
  readonly addCourseButtonText = 'Add course';
  readonly loadMoreButtonText = 'Load more';
  readonly noCoursesMessage = 'No data. Feel free to add new course';

  courses: WritableSignal<Course[]> = signal<Course[]>([]);
  orderByPipe: OrderByPipe = inject(OrderByPipe);
  filterPipe: FilterPipe = inject(FilterPipe);

  ngOnInit(): void {
    this.courses.set(this.orderByPipe.transform(courses));
  }

  onDeleteCourse(id: string): void {
    console.log(id);
  }

  onSearch(searchText: string): void {
    this.courses.set(this.filterPipe.transform(courses, searchText));
  }
}
