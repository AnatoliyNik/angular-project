import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { Course } from '@models/course.model';
import { CourseFromServer } from '@models/course-from-server.model';
import { coursesServerUrl } from '@data/constants';
import { Author } from '@models/author.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private start = 0;
  private count = 3;
  private textFragment = '';
  private sort: keyof CourseFromServer = 'date';

  private http: HttpClient = inject(HttpClient);

  private _canLoadMore: WritableSignal<boolean> = signal<boolean>(true);

  get canLoadMore(): boolean {
    return this._canLoadMore();
  }

  resetInitialData(): void {
    this.start = 0;
    this.textFragment = '';
  }

  getAll(): Observable<Course[]> {
    return this.http.get<CourseFromServer[]>(coursesServerUrl.courses, {
      params: {
        start: this.start,
        count: this.count,
        textFragment: this.textFragment,
        sort: this.sort
      }
    }).pipe(
      map(this.toCourse.bind(this)),
      tap((courses: Course[]) => {
        const canLoadMore: boolean = courses.length >= this.count;
        this._canLoadMore.set(canLoadMore);
      })
    );
  }

  getById(id: number): Observable<Course> {
    return this.http.get<CourseFromServer>(`${coursesServerUrl.courses}/${id}`).pipe(
      map((courseFromServer: CourseFromServer) => this.toCourse(courseFromServer))
    );
  }

  create(course: Course): Observable<Course> {
    const newCourse: CourseFromServer = this.fromCourse(course);

    return this.http.post<CourseFromServer>(coursesServerUrl.courses, newCourse).pipe(
      map((courseFromServer: CourseFromServer) => this.toCourse(courseFromServer))
    );
  }

  update(id: string, newCourse: Partial<Course>): Observable<Course> {
    const updatedCourse: CourseFromServer = this.fromCourse(newCourse as Course);

    return this.http.patch<CourseFromServer>(`${coursesServerUrl.courses}/${id}`, updatedCourse).pipe(
      map((courseFromServer: CourseFromServer) => this.toCourse(courseFromServer))
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${coursesServerUrl.courses}/${id}`).pipe(
      tap(() => this.start--)
    );
  }

  loadMore(): Observable<Course[]> {
    this.start += this.count;

    return this.getAll().pipe(
      catchError((err) => {
        this.start -= this.count;
        return throwError(() => err);
      })
    );
  }

  search(text: string): Observable<Course[]> {
    this.textFragment = text;
    this.start = 0;
    this._canLoadMore.set(true);

    return this.getAll().pipe(
      catchError((err) => {
        this.textFragment = '';
        return throwError(() => err);
      })
    );
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(coursesServerUrl.authors);
  }

  private toCourse(courseFromServer: CourseFromServer): Course
  private toCourse(courseFromServer: CourseFromServer[]): Course[]
  private toCourse(courseFromServer: CourseFromServer | CourseFromServer[]): Course | Course[] {
    if (Array.isArray(courseFromServer)) {
      return courseFromServer.map((courseFromServer: CourseFromServer) => this.toCourse(courseFromServer));
    }

    return {
      id: String(courseFromServer.id),
      duration: courseFromServer.length,
      creationDate: new Date(courseFromServer.date),
      description: courseFromServer.description,
      topRated: courseFromServer.isTopRated,
      title: courseFromServer.name,
      authors: courseFromServer.authors
    };
  }

  private fromCourse(course: Course): CourseFromServer {

    return {
      id: Number(course.id),
      name: course.title,
      isTopRated: course.topRated,
      description: course.description,
      date: course.creationDate.toString(),
      length: course.duration,
      authors: course.authors
    };
  }
}
