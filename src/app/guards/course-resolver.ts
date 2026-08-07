import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../service/coursesService';
import { Observable, of } from 'rxjs';
import { CoursesInter } from '../interface/courses_Inter';

export const courseResolver: ResolveFn<any> = (route, state): Observable<CoursesInter> => {
  const courseService = inject(CoursesService);

  if (route.params && route.params['id']) {
    return courseService.loadById(route.params['id']);
  }

  return of({ _id: '', name: '', category: '' });
};
