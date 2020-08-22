import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-school-member',
  templateUrl: './add-school-member.component.html',
  styleUrls: ['./add-school-member.component.scss']
})
export class AddSchoolMemberComponent implements OnInit {

  selectedbar = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setSelection(i){
    this.selectedbar = i
  }

}
