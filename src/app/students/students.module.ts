import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectsTabComponent } from './subjects-tab/subjects-tab.component';
import { ViewSubmitHomeworkComponent } from './view-submit-homework/view-submit-homework.component';
import { ViewSubmitClasstestComponent } from './view-submit-classtest/view-submit-classtest.component';
import { StudentSubjectsNotesComponent } from './subjects-notes/subjects-notes.component';
import { StudentExamManagerComponent } from './student-exam-manager/student-exam-manager.component';
import { ViewUncomingQuizComponent } from './student-exam-manager/view-uncoming-quiz/view-uncoming-quiz.component';
import { ViewPublishedQuizComponent } from './student-exam-manager/view-published-quiz/view-published-quiz.component';
import { ViewStudentTimetableComponent } from './view-student-timetable/view-student-timetable.component';
import { OngoingExamComponent } from './student-exam-manager/ongoing-exam/ongoing-exam.component';
import { ViewAnswerPaperComponent } from './student-exam-manager/view-answer-paper/view-answer-paper.component';


@NgModule({
  declarations: [
    StudentsComponent,
    DashboardComponent,
    ProfileComponent,
    SubjectsTabComponent,
    ViewSubmitHomeworkComponent,
    ViewSubmitClasstestComponent,
    StudentSubjectsNotesComponent,
    StudentExamManagerComponent,
    ViewUncomingQuizComponent,
    ViewPublishedQuizComponent,
    ViewStudentTimetableComponent,
    OngoingExamComponent,
    ViewAnswerPaperComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
