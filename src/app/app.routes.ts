import { Routes } from '@angular/router';
import { courseResolver } from './guards/course-resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadComponent: () => import('./modules/cursos/courses/courses').then((c) => c.Courses),
  },
  {
    path: 'course-form',
    loadComponent: () =>
      import('./modules/cursos/course-form/course-form').then((c) => c.CourseForm),
    resolve: { course: courseResolver },
  },
  {
    path: 'course-edit/:id',
    loadComponent: () =>
      import('./modules/cursos/course-form/course-form').then((c) => c.CourseForm),
    resolve: { course: courseResolver },
  },
];
