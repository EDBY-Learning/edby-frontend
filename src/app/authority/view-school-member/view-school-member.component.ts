import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-school-member',
  templateUrl: './view-school-member.component.html',
  styleUrls: ['./view-school-member.component.scss']
})
export class ViewSchoolMemberComponent implements OnInit {

  selectedbar = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setSelection(i){
    this.selectedbar = i
  }

}
