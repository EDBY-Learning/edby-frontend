import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.scss']
})
export class ClassManagementComponent implements OnInit {

  selectedbar = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setSelection(i){
    this.selectedbar = i
  }

}
