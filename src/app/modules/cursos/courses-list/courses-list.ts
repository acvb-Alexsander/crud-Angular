import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoursesInter } from '../../../interface/courses_Inter';
import { CategoryPipe } from '../../../shared/pipes/category-pipe';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, CategoryPipe],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'category', 'actions'];

  @Input() courses: CoursesInter[] = [];
  @Output() add = new EventEmitter<boolean>(false);
  constructor() {}

  ngOnInit(): void {}

  onAddCourse() {
    this.add.emit(true);
  }
}
