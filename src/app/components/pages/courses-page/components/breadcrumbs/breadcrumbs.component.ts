import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import {
  Data,
  EventType,
  Event,
  Router,
  NavigationEnd,
  ChildrenOutletContexts,
  OutletContext,
  PRIMARY_OUTLET,
} from '@angular/router';
import { EMPTY, filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Course } from '@models/course.model';
import { editCourseRouteResolverKey, routePath } from '@data/constants';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {
  readonly divider = '/';
  segments: WritableSignal<string[]> = signal<string[]>([]);

  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private outlets: ChildrenOutletContexts = inject(ChildrenOutletContexts);

  ngOnInit(): void {
    this.createSegments();
  }

  navigate(segmentIndex: number): void {
    const path: string = this.segments().slice(0, segmentIndex + 1).join('/');
    this.router.navigate([path]);
  }

  private createSegments(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event.type === EventType.NavigationEnd),
      switchMap((event: NavigationEnd) => {
        const segments: string[] = event.urlAfterRedirects.slice(1).split('/');
        const primaryOutlet: OutletContext | null = this.outlets.getContext(PRIMARY_OUTLET);

        this.segments.set(segments);

        if (primaryOutlet?.route?.routeConfig?.path === routePath.editCourse) {
          return primaryOutlet.route.data;
        }

        return EMPTY;
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data: Data) => {
      const course: Course = data[editCourseRouteResolverKey];
      let segments: string[] = this.segments().slice(0, -1);

      if (course) {
        segments.push(course.title);
      } else {
        segments = routePath.newCourse.split('/');
      }

      this.segments.set(segments);
    });
  }
}
