import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersComponent } from './teachers.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
//import { AddClassTimetableComponent } from './manage-class-by-teacher/add-class-timetable/add-class-timetable.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
//import { StudentAddRemoveEditComponent } from './student-add-remove-edit/student-add-remove-edit.component';
import { AddEditStudentInfoComponent } from '../shared/add-edit-student-info/add-edit-student-info.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { AuthGuardTeacherGuard } from '../guards/auth-guard-teacher.guard';
import { HomeworkComponent } from './homework-management/homework/homework.component';
import { SubjectClassessComponent } from './subject-classess/subject-classess.component';
import { CheckHomeworkComponent } from './homework-management/check-homework/check-homework.component';
import { ClassTestComponent } from './class-test/class-test.component';
//import { GetClassStudentsComponent } from './manage-class-by-teacher/get-class-students/get-class-students.component';
//import { SubjectTeacherMappingComponent } from './manage-class-by-teacher/subject-teacher-mapping/subject-teacher-mapping.component';
import { CreateClassTestComponent } from './create-class-test/create-class-test.component';
import { SubjectsNotesComponent } from './subjects-notes/subjects-notes.component';
import { WhiteBoardComponent } from './white-board/white-board.component';
import { SetLinkComponent } from './set-link/set-link.component';
import { NoticeBoardComponent } from '../shared/notice-board/notice-board.component';
import { ManageClassByTeacherComponent } from './manage-class-by-teacher/manage-class-by-teacher.component';
import { ExamManagerComponent } from './exam-manager/exam-manager.component';
import { QuestionPaperComponent } from './exam-manager/question-paper/question-paper.component';
import { ViewQuestionPaperComponent } from './exam-manager/view-question-paper/view-question-paper.component';
import { ViewAnswerSheetComponent } from './exam-manager/view-answer-sheet/view-answer-sheet.component';
import { HomeworkManagementComponent } from './homework-management/homework-management.component';

const routes: Routes = [
  { 
    path: '', 
    component: TeachersComponent ,
    children:[
      {
        path:'',
        component:TeacherDashboardComponent
      },
      { 
        path:'notice-board',
        component:NoticeBoardComponent
      },
      {
        path:'manage-class',
        component:ManageClassByTeacherComponent
      },
      {
        path:'manage-exam/:subject_id/:class_name/:section/:subject_name',
        component:ExamManagerComponent
      },
      {
        path:'question-paper/:quiz_id/:class_name/:section/:subject_id/:subject_name',
        component:QuestionPaperComponent
      },
      {
        path:'view-question-paper/:quiz_id/:class_name/:section/:subject_id/:subject_name',
        component:ViewQuestionPaperComponent
      },
      {
        path:'view-answer-sheet/:quiz_id/:class_name/:section/:subject_id/:subject_name/:student_id',
        component:ViewAnswerSheetComponent
      },
      /*{
        path:'subject-teacher-map',
        component:SubjectTeacherMappingComponent,
        canActivate:[AuthGuardTeacherGuard]
      },
      {
        path:'add-class-timetable',
        component:AddClassTimetableComponent,
        canActivate:[AuthGuardTeacherGuard]
      },
      {
        path:'students-list',
        component:GetClassStudentsComponent,
        canActivate:[AuthGuardTeacherGuard]
      },*/
      {
        path:'custom-link-set',
        component:SetLinkComponent
      },
      /**/
      {
        path:'white-board',
        component:WhiteBoardComponent
      },
      {
        path:'edit-student-info',
        component:AddEditStudentInfoComponent,//StudentAddRemoveEditComponent,
        canActivate:[AuthGuardTeacherGuard]
      },
      /**/
      {
        path:'view-schedule',
        component:TeacherScheduleComponent
      },
      {
        path:'notes-for-subject/:subject_id/:class_name/:section',
        component:SubjectsNotesComponent
      },
      {
        path:'create-class-test/:subject_id/:class_name/:section',
        component:CreateClassTestComponent
      },
      {
        path:'class-test/:subject_id/:class_name/:section',
        component:ClassTestComponent
      },
      {
        path:'homework-mamagement/:subject_id/:class_name/:section',
        component:HomeworkManagementComponent,
        children:[
          {
            path:'give-homework/:subject_id/:class_name/:section',
            component:HomeworkComponent
          },
          {
            path:'check-homework/:subject_id/:class_name/:section',
            component:CheckHomeworkComponent
          }
        ]
      },
      {
        path:'your-subject-classes',
        component: SubjectClassessComponent
      },
      {
        path:'profile',
        component:TeacherProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
