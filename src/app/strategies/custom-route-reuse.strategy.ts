import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  Route,
  RouteReuseStrategy,
} from '@angular/router';
import { RoutePath } from '@data/constants';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlerStore: Map<Route, DetachedRouteHandle> = new Map<Route, DetachedRouteHandle>();

  private curr!: ActivatedRouteSnapshot;
  private future!: ActivatedRouteSnapshot;

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const isGoToEditPage: boolean = this.future.routeConfig?.path === RoutePath.EditCourse;
    const isItCoursesPage: boolean = route.routeConfig?.path === RoutePath.Courses;

    return isItCoursesPage && isGoToEditPage;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (route.routeConfig && handle) {
      this.handlerStore.set(route.routeConfig, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const isItEditPage: boolean = this.curr.routeConfig?.path === RoutePath.EditCourse;
    const isGoToCoursesPage: boolean = route.routeConfig?.path === RoutePath.Courses;
    const isThereRouteHandle: boolean = !!route.routeConfig && this.handlerStore.has(route.routeConfig);

    return isThereRouteHandle && isItEditPage && isGoToCoursesPage;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (route.routeConfig) {
      return this.handlerStore.get(route.routeConfig) || null;
    }

    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    this.curr = curr;
    this.future = future;

    return future.routeConfig === curr.routeConfig;
  }

}
