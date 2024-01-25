import { Routes } from '@angular/router';
import { CoursesPageComponent } from "./components/pages/courses-page/courses-page.component";
import { LoginPageComponent } from "./components/pages/login-page/login-page.component";
import { NotFoundPageComponent } from "./components/pages/not-found-page/not-found-page.component";

export const routes: Routes = [
    {path: '', component: CoursesPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'not-found', component: NotFoundPageComponent},
    {path: '**', redirectTo: 'not-found'},
];
