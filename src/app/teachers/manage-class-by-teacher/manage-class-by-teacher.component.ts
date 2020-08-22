import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../teachers-service';

@Component({
  selector: 'app-manage-class-by-teacher',
  templateUrl: './manage-class-by-teacher.component.html',
  styleUrls: ['./manage-class-by-teacher.component.scss']
})
export class ManageClassByTeacherComponent implements OnInit {

  selectedbar = 0;

  constructor(private service: TeachersService) { }

  ngOnInit(): void {
    this.selectedbar = this.service.selectedBar
  }

  setSelection(i){
    this.selectedbar = i
    this.service.selectedBar = i
  }

}
