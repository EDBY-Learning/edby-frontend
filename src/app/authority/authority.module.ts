import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorityRoutingModule } from './authority-routing.module';
import { AuthorityComponent } from './authority.component';
import { SharedModule } from '../shared/shared.module';
import { AddClassTeacherComponent } from './add-school-member/add-class-teacher/add-class-teacher.component';
import { AddAuthorityComponent } from './add-school-member/add-authority/add-authority.component';
import { ListClassesDetailsComponent } from './class-management/list-classes-details/list-classes-details.component';
import { ClassTimetableComponent } from './class-management/class-timetable/class-timetable.component';
//import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './view-school-member/teacher-list/teacher-list.component';
import { AuthorityProfileComponent } from './authority-profile/authority-profile.component';
import { AuthorityDashboardComponent } from './authority-dashboard/authority-dashboard.component';
import { AuthorityListComponent } from './view-school-member/authority-list/authority-list.component';
import { AddNewStudentComponent } from './add-school-member/add-new-student/add-new-student.component';
import { CreateUpdateSlotComponent } from './class-management/create-update-slot/create-update-slot.component';
import { AddSchoolMemberComponent } from './add-school-member/add-school-member.component';
import { ViewSchoolMemberComponent } from './view-school-member/view-school-member.component';
import { ClassManagementComponent } from './class-management/class-management.component';


@NgModule({
  declarations: [
    AuthorityComponent,
    AddClassTeacherComponent,
    AddAuthorityComponent,
    ListClassesDetailsComponent,
    ClassTimetableComponent,
    //StudentListComponent,
    TeacherListComponent,
    AuthorityProfileComponent,
    AuthorityDashboardComponent,
    AuthorityListComponent,
    AddNewStudentComponent,
    CreateUpdateSlotComponent,
    AddSchoolMemberComponent,
    ViewSchoolMemberComponent,
    ClassManagementComponent
  ],
  imports: [
    CommonModule,
    AuthorityRoutingModule,
    SharedModule
  ],
  entryComponents:[
    ClassTimetableComponent
  ]
})
export class AuthorityModule { }
