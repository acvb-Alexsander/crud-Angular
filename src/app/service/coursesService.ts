import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';
import { CoursesInter } from '../interface/courses_Inter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly Api = 'api/courses';

  constructor(private readonly httpClient: HttpClient) {}

  list(): Observable<CoursesInter[]> {
    return this.httpClient.get<CoursesInter[]>(this.Api).pipe(
      first(),
      delay(1000),
      tap((courses: CoursesInter[]) => console.log(courses)),
    );
  }

  save(record: Partial<CoursesInter>) {
    return this.httpClient.post<CoursesInter>(this.Api, record).pipe(first());
  }
}
