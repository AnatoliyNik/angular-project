import { inject, Injectable } from '@angular/core';
import { Course } from '@models/course.model';
import { COURSES } from '@tokens/courses.token';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = inject(COURSES);
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(this.courses);

  getAll(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  getById(id: string): Course | undefined {
    return this.courses$.value.find(course => course.id === id);
  }

  create(course: Course): void {
    this.courses$.next([...this.courses$.value, course]);
  }

  update(id: string, newCourse: Partial<Course>): Course | undefined {
    const index: number = this.courses$.value.findIndex(course => course.id === id);

    if (index < 0) {
      return;
    }

    let updatedCourse: Course = this.courses$.value[index];

    updatedCourse = {
      ...updatedCourse,
      ...newCourse
    };

    return updatedCourse;
  }

  remove(id: string): void {
    const courses: Course[] = this.courses$.value.filter(course => course.id !== id);
    this.courses$.next(courses);
  }
}
