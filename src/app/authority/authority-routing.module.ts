import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorityComponent } from './authority.component';
import { AddClassTeacherComponent } from './add-school-member/add-class-teacher/add-class-teacher.component';
//import { AddAuthorityComponent } from './add-authority/add-authority.component';
//import { ListClassesDetailsComponent } from './list-classes-details/list-classes-details.component';
//import { StudentListComponent } from './student-list/student-list.component';
//import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { AuthorityDashboardComponent } from './authority-dashboard/authority-dashboard.component';
import { AuthorityProfileComponent } from './authority-profile/authority-profile.component';
//import { AuthorityListComponent } from './authority-list/authority-list.component';
import { AddNewStudentComponent } from './add-school-member/add-new-student/add-new-student.component';
//import { CreateUpdateSlotComponent } from './create-update-slot/create-update-slot.component';
import { NoticeBoardComponent } from '../shared/notice-board/notice-board.component';
import { AddSchoolMemberComponent } from './add-school-member/add-school-member.component';
import { ViewSchoolMemberComponent } from './view-school-member/view-school-member.component';
import { ClassManagementComponent } from './class-management/class-management.component';

const routes: Routes = [
  { 
    path: '', 
    //redirectTo: "dashboard",
    component: AuthorityComponent,
    children:[
      {
        path:'',
        component:AuthorityDashboardComponent
      },
      { 
        path:'notice-board',
        component:NoticeBoardComponent
      },
      /*{
        path:'add-update-slots',
        component:CreateUpdateSlotComponent
      },
      {
        path:'class-details',
        component:ListClassesDetailsComponent
      },*/
      {
        path:'add-school-member',
        component:AddSchoolMemberComponent
      },
      {
        path:'view-school-member',
        component:ViewSchoolMemberComponent
      },
      {
        path:'manage-class',
        component:ClassManagementComponent
      },
      {
        path:'add-teacher',
        component:AddClassTeacherComponent
      },
      /*{
        path:'add-authority',
        component:AddAuthorityComponent
      },*/
      
      /*{
        path:'student-list',
        component:StudentListComponent
      },
      {
        path:'teacher-list',
        component:TeacherListComponent
      },*/
      {
        path:'edit-student-info',
        component: AddNewStudentComponent
      },
      /*{
        path:'authority-list',
        component:AuthorityListComponent
      },*/
      {
        path:'profile',
        component:AuthorityProfileComponent
      }
    ]
   }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorityRoutingModule { }
