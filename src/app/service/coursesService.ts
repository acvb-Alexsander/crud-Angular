import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';
import { CoursesInter } from '../interface/courses_Inter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly Api = '/assets/cursos.json';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<CoursesInter[]> {
    return this.httpClient.get<CoursesInter[]>(this.Api).pipe(
      first(),
      delay(1000),
      tap((courses: CoursesInter[]) => console.log(courses)),
    );
  }
}
