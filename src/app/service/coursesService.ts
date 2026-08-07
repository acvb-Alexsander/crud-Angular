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
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  loadById(id: string) {
    return this.httpClient.get<CoursesInter>(`${this.Api}/${id}`);
  }

  private create(record: Partial<CoursesInter>) {
    return this.httpClient.post<CoursesInter>(this.Api, record).pipe(first());
  }

  private update(record: Partial<CoursesInter>) {
    return this.httpClient.put<CoursesInter>(`${this.Api}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.Api}/${id}`).pipe(first());
  }
}
