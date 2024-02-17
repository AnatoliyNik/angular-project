import { Routes } from '@angular/router';
import { CoursesPageComponent } from '@component/pages/courses-page/courses-page.component';
import { LoginPageComponent } from '@component/pages/login-page/login-page.component';
import { NotFoundPageComponent } from '@component/pages/not-found-page/not-found-page.component';
import { editCourseRouteResolverKey, routePath } from '@data/constants';
import { courseResolver } from '@resolvers/course.resolver';
import { courseGuard } from '@guards/course.guard';
import { loginPageGuard } from '@guards/login-page.guard';

export const routes: Routes = [
  {path: '', redirectTo: routePath.courses, pathMatch: 'full'},
  {
    path: routePath.login,
    component: LoginPageComponent,
    canActivate: [loginPageGuard]
  },
  {
    path: '',
    canActivateChild: [courseGuard],
    children: [
      {
        path: routePath.courses,
        component: CoursesPageComponent,
      },
      {
        path: routePath.newCourse,
        loadComponent: () => import('@component/pages/handle-course-page/handle-course-page.component')
          .then(m => m.HandleCoursePageComponent)
      },
      {
        path: routePath.editCourse,
        loadComponent: () => import('@component/pages/handle-course-page/handle-course-page.component')
          .then(m => m.HandleCoursePageComponent),
        resolve: {
          [editCourseRouteResolverKey]: courseResolver
        }
      },
    ]
  },
  {path: routePath.notFound, component: NotFoundPageComponent},
  {path: '**', redirectTo: routePath.notFound},
];
