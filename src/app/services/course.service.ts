import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Course } from '@models/course.model';
import { CourseFromServer } from '@models/course-from-server.model';
import { coursesServerUrl } from '@data/constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private start = 0;
  private count = 3;
  private textFragment = '';
  private sort: keyof CourseFromServer = 'date';
  private isInitialLoading = true;

  private _canLoadMore: WritableSignal<boolean> = signal<boolean>(true);

  get canLoadMore(): Signal<boolean> {
    return this._canLoadMore.asReadonly();
  }

  get courses$(): Observable<Course[]> {
    if (this.isInitialLoading) {
      this.isInitialLoading = false;

      return this.getAll().pipe(
        switchMap((courses: Course[]) => {
          this._courses$.next(courses);
          return this._courses$.asObservable();
        })
      );
    }

    return this._courses$.asObservable();
  }

  private http: HttpClient = inject(HttpClient);

  resetInitialLoadingStatus(): void {
    this.isInitialLoading = true;
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
      map((courseFromServer: CourseFromServer) => this.toCourse(courseFromServer)),
      tap((course: Course) => {
        const courses: Course[] = [course, ...this._courses$.value];
        this._courses$.next(courses);
      })
    );
  }

  update(id: string, newCourse: Partial<Course>): Observable<Course> {
    const updatedCourse: CourseFromServer = this.fromCourse(newCourse as Course);

    return this.http.patch<CourseFromServer>(`${coursesServerUrl.courses}/${id}`, updatedCourse).pipe(
      map((courseFromServer: CourseFromServer) => this.toCourse(courseFromServer)),
      tap((course: Course) => {
        const courses: Course[] = this._courses$.value;
        const index: number = courses.findIndex(current => current.id === course.id);

        if (index !== -1) {
          courses[index] = course;
        }

        this._courses$.next([...courses]);
      })
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${coursesServerUrl.courses}/${id}`).pipe(
      tap(() => {
        const courses: Course[] = this._courses$.value.filter(course => course.id !== id);
        this._courses$.next(courses);
      })
    );
  }

  loadMore(): Observable<Course[]> {
    this.start += this.count;

    return this.getAll().pipe(
      tap((newCourses: Course[]) => {
        const courses: Course[] = [...this._courses$.value, ...newCourses];
        this._courses$.next(courses);
      }),
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
      tap((courses: Course[]) => {
        this._courses$.next([...courses]);
      }),
      catchError((err) => {
        this.textFragment = '';
        this._courses$.error(err);
        return EMPTY;
      })
    );
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
      title: courseFromServer.name
    };
  }

  private fromCourse(course: Course): CourseFromServer {

    return {
      id: Number(course.id),
      name: course.title,
      isTopRated: course.topRated,
      description: course.description,
      date: course.creationDate.toString(),
      length: course.duration
    };
  }
}
