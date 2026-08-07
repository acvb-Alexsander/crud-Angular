import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { CoursesList } from '../../courses-list/courses-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';

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

  courses$: Observable<CoursesInter[]> | null = null;

  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private readonly router: Router,
    private matSnackBar: MatSnackBar,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos. Por favor, tente novamente mais tarde.');
        return of([]); // Return an empty array in case of error
      }),
    );
    this.cdr.markForCheck();
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

  onDelete(course: CoursesInter) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: 'Tem certeza wue deseja remover este curso ? ',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe({
          next: () => {
            console.log(this.refresh());

            this.matSnackBar.open('Curso removido com sucesso', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          error: () => this.onError('Erro ao remover curso'),
        });
      }
    });
  }
}
