import { Component, OnInit } from '@angular/core';
import { SideBarToggleService } from '../services/side-bar-toggle.service';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  //sub1;

  sideBarContent:string[][]= [['Dashboard',''],
  ['Notice Board','notice-board'],
  ['Time Table','student-timetable'],
  ['Subjects','subjects'],
  ['Profile and setting','profile']];

  constructor(public sideBarService:SideBarToggleService,
    private service: StudentsService) { 
    //let data = localStorage.getItem('user_typeOnlineSchool')
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    console.log('unsubscribed Students')
    //this.sub1.unsubscribe()
    this.service.slotList=null;
    this.service.studentTimetable = null;
    this.service.profileData = null;
    this.service.subjectList = null;
  }

}
