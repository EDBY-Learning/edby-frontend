import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from './students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectsTabComponent } from './subjects-tab/subjects-tab.component';
import { ViewSubmitHomeworkComponent } from './view-submit-homework/view-submit-homework.component';
import { ViewSubmitClasstestComponent } from './view-submit-classtest/view-submit-classtest.component';
import { StudentSubjectsNotesComponent } from './subjects-notes/subjects-notes.component';
import { NoticeBoardComponent } from '../shared/notice-board/notice-board.component';
import { ViewStudentTimetableComponent } from './view-student-timetable/view-student-timetable.component';
import { StudentExamManagerComponent } from './student-exam-manager/student-exam-manager.component';
import { OngoingExamComponent } from './student-exam-manager/ongoing-exam/ongoing-exam.component';
import { ViewAnswerPaperComponent } from './student-exam-manager/view-answer-paper/view-answer-paper.component';

const routes: Routes = [
  { 
    path: '', 
    component: StudentsComponent,
    children:[
      {
        path:'',
        component:DashboardComponent
      },
      { 
        path:'notice-board',
        component:NoticeBoardComponent
      },
      {
        path:'view-answer-paper/:quiz_id/:subject_id/:class_name/:section',
        component:ViewAnswerPaperComponent
      },
      { 
        path:'student-timetable',
        component:ViewStudentTimetableComponent
      },
      { 
        path:'exam-center/:subject_id/:class_name/:section',
        component:StudentExamManagerComponent
      },
      {
        path:'subjects',
        component:SubjectsTabComponent
      },
      {
        path:'ongoing-exam/:quiz_id/:subject_id/:class_name/:section',
        component:OngoingExamComponent
      },
      {
        path:'notes/:subject_id/:class_name/:section',
        component:StudentSubjectsNotesComponent
      },
      {
        path:'homework/:subject_id/:class_name/:section',
        component:ViewSubmitHomeworkComponent
      },
      {
        path:'class-test/:subject_id/:class_name/:section',
        component:ViewSubmitClasstestComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
