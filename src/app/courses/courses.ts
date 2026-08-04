import { Component, OnInit } from '@angular/core';
import { MatListModule, MatList, MatListItem } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { CoursesInter } from './courses_Inter';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatListModule, MatList, MatListItem, MatTableModule, MatCardModule, MatToolbarModule],

  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit {
  courses: CoursesInter[] = [
    {
      _id: '1',
      name: 'Angular',
      category: 'Front-end',
    },
    {
      _id: '2',
      name: 'SpringBoot',
      category: 'Back-end',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  displayedColumns: string[] = ['name', 'category'];
}
