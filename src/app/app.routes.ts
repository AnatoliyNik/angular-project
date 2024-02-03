import { Routes } from '@angular/router';
import { CoursesPageComponent } from '@component/pages/courses-page/courses-page.component';
import { LoginPageComponent } from '@component/pages/login-page/login-page.component';
import { NotFoundPageComponent } from '@component/pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'courses', component: CoursesPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'not-found', component: NotFoundPageComponent},
  {path: '**', redirectTo: 'not-found'},
];
