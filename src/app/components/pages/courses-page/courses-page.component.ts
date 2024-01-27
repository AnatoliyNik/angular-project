import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { SearchComponent } from "./components/search/search.component";
import { Course } from "../../../models/course.model";
import { courses } from "../../../data/mock-data";
import { CourseComponent } from "./components/course/course.component";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    SearchComponent,
    CourseComponent,
    UpperCasePipe
  ],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {
  readonly addCourseButtonText = 'Add course';
  readonly loadMoreButtonText = 'Load more';
  readonly noCoursesMessage = 'There are no courses';

  courses: Course[] = [];

  ngOnInit(): void {
    this.courses = courses;
  }

  onDeleteCourse(id: string): void {
    console.log(id);
  }
}
