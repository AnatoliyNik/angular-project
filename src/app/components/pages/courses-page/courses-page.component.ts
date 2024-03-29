import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';
import { CourseComponent } from './components/course/course.component';
import { OrderByPipe } from '@pipes/order-by.pipe';
import { FilterPipe } from '@pipes/filter.pipe';
import { Course } from '@models/course.model';
import { RoutePath } from '@data/constants';
import { CourseDeletionError } from '@models/course-deletion-error.model';

import { Store } from '@ngrx/store';
import { coursesFeature } from '@store/features/courses-page.feature';
import { coursesPageActions } from '@store/actions/courses-page.actions';
import { TranslateModule } from '@ngx-translate/core';
import { loginFeature } from '@store/features/login-page.feature';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    SearchComponent,
    CourseComponent,
    TranslateModule,
  ],
  providers: [OrderByPipe, FilterPipe],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit {
  private store: Store = inject(Store);
  private router: Router = inject(Router);

  courses: Signal<Course[]> = this.store.selectSignal(coursesFeature.selectCourses);
  canLoadMore: Signal<boolean> = this.store.selectSignal(coursesFeature.selectCanLoadMore);
  error: Signal<string> = this.store.selectSignal(coursesFeature.selectGetAll);
  loadMoreError: Signal<string> = this.store.selectSignal(coursesFeature.selectLoadMore);
  deleteError: Signal<CourseDeletionError | null> = this.store.selectSignal(coursesFeature.selectRemove);
  locale: Signal<string> = this.store.selectSignal(loginFeature.selectLanguage);

  ngOnInit(): void {
    this.store.dispatch(coursesPageActions.getCourses());
  }

  onDeleteCourse(course: Course): void {
    this.store.dispatch(coursesPageActions.deleteCourse({course}));
  }

  onSearch(searchText: string): void {
    this.store.dispatch(coursesPageActions.searchCourses({searchText}));
  }

  onEditCourse(id: string): void {
    this.router.navigate([RoutePath.Courses, id]);
  }

  onAddCourse(): void {
    this.router.navigate([RoutePath.NewCourse]);
  }

  loadMore(): void {
    this.store.dispatch(coursesPageActions.loadMore());
  }
}
