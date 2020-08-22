import { Component, OnInit } from '@angular/core';
import { SideBarToggleService } from '../services/side-bar-toggle.service';
import { TeachersService } from './teachers-service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  sub1;

  sideBarContent:string[][];

  constructor(public sideBarService:SideBarToggleService,
      private service: TeachersService) {
    let data = localStorage.getItem('user_typeOnlineSchool')
    if((data == 'class_teacher')){
      this.sideBarContent = [['Dashboard',''],
      ['White Board','white-board'],
      ['Notice Board','notice-board'],

      ['Class Management','manage-class'],
      ['Set Class Link','custom-link-set'],
      /*['Add Student','edit-student-info'],
      ['Create Subjects','subject-teacher-map'],
      ['Add/View Time Table','add-class-timetable'],
      ['Class Students','students-list'],*/

      ['View your Schedule','view-schedule'],
      ['Your Subject Class','your-subject-classes'],
      ['Profile and  Settings ','profile']];
    }else if((data == 'teacher')){
      this.sideBarContent = [['Dashboard','teachers'],
      ['White Board','white-board'],
      ['Notice Board','notice-board'],
      
      ['Set Class Link','custom-link-set'],
      
      ['View your Schedule','view-schedule'],
      ['Your Subject Class','your-subject-classes'],
      ['Profile and  Settings ','profile']];
    }else{
      console.log('Check for error')
    }
    
  }

  ngOnInit(): void {
    /*this.service.getSelfData().subscribe((data)=>{
      if(data['status']=='success'){
        //console.log(data['message'])
        this.service.setProfileData(data['message'])
      }else{
        console.log('could not fetch profile info')
      }
    })*/
  }

  ngOnDestroy(){
    console.log('unsubscribed Teacher')
    this.service.dashBoardData = null;
    this.service.selectedBar = null;
    this.service.teacherTimetable = null;  
    this.service.subjectList = null;
    this.service.subjectLinksList = null;
    this.service.slotList = null;
    this.service.classTimetable = null;
    this.service.classStudentList = null;
    this.service.teacherListClass = null;
    this.service.teacherSelfInfo =null;
    this.service.filesToUpload = [];
  }


}
