import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from '../shared/shared.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AddClassTimetableComponent } from './manage-class-by-teacher/add-class-timetable/add-class-timetable.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { HomeworkComponent } from './homework-management/homework/homework.component';
import { SubjectClassessComponent } from './subject-classess/subject-classess.component';
import { CheckHomeworkComponent } from './homework-management/check-homework/check-homework.component';
import { ClassTestComponent } from './class-test/class-test.component';
import { GetClassStudentsComponent } from './manage-class-by-teacher/get-class-students/get-class-students.component';
import { SubjectTeacherMappingComponent } from './manage-class-by-teacher/subject-teacher-mapping/subject-teacher-mapping.component';
import { CreateClassTestComponent } from './create-class-test/create-class-test.component';
import { SubjectsNotesComponent } from './subjects-notes/subjects-notes.component';
import { WhiteBoardComponent } from './white-board/white-board.component';
import { SetLinkComponent } from './set-link/set-link.component';
import { ManageClassByTeacherComponent } from './manage-class-by-teacher/manage-class-by-teacher.component';
import { ExamManagerComponent } from './exam-manager/exam-manager.component';
import { CreateExamComponent } from './exam-manager/create-exam/create-exam.component';
import { PublishedExamComponent } from './exam-manager/published-exam/published-exam.component';
import { UnpublishedExamComponent } from './exam-manager/unpublished-exam/unpublished-exam.component';
import { QuestionPaperComponent } from './exam-manager/question-paper/question-paper.component';
import { ViewQuestionPaperComponent } from './exam-manager/view-question-paper/view-question-paper.component';
import { ViewAnswerSheetComponent } from './exam-manager/view-answer-sheet/view-answer-sheet.component';
import { HomeworkManagementComponent } from './homework-management/homework-management.component';
//import { StudentAddRemoveEditComponent } from './student-add-remove-edit/student-add-remove-edit.component';


@NgModule({
  declarations: [
    TeachersComponent,
    TeacherDashboardComponent,
    AddClassTimetableComponent,
    TeacherProfileComponent,
    TeacherScheduleComponent,
    
    SubjectClassessComponent,
    HomeworkComponent,
    CheckHomeworkComponent,
    ClassTestComponent,
    GetClassStudentsComponent,
    SubjectTeacherMappingComponent,
    CreateClassTestComponent,
    SubjectsNotesComponent,
    WhiteBoardComponent,
    SetLinkComponent,
    ManageClassByTeacherComponent,
    ExamManagerComponent,
    CreateExamComponent,
    PublishedExamComponent,
    UnpublishedExamComponent,
    QuestionPaperComponent,
    ViewQuestionPaperComponent,
    ViewAnswerSheetComponent,
    HomeworkManagementComponent,
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule

  ]
})
export class TeachersModule { }
