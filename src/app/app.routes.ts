import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadComponent: () => import('./modules/courses/courses').then((c) => c.Courses),
  },
  {
    path: 'course-form',
    loadComponent: () => import('./modules/course-form/course-form').then((c) => c.CourseForm),
  },
];
