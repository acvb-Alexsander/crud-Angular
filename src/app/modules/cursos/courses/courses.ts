import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { CoursesInter } from '../../../interface/courses_Inter';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesService } from '../../../service/coursesService';
import { catchError, Observable, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialog } from '../../../shared/components/error-dialog/error-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CoursesList } from '../courses-list/courses-list';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatListModule,

    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatDialogModule,
    MatIconModule,

    MatButtonModule,
    CoursesList,
  ],

  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'category', 'actions'];

  courses$: Observable<CoursesInter[]>;

  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private readonly router: Router,
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos. Por favor, tente novamente mais tarde.');
        return of([]); // Return an empty array in case of error
      }),
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialog, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAddCourse() {
    this.router.navigate(['course-form']);
  }

  onEdit(course: CoursesInter) {
    this.router.navigate(['course-edit', course._id]);
  }
}
