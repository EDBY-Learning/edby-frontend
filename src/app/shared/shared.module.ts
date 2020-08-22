import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditStudentInfoComponent } from './add-edit-student-info/add-edit-student-info.component';
import { StudentListComponent } from '../authority/view-school-member/student-list/student-list.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from '../home/welcome/welcome.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ApplyForDemoComponent } from './apply-for-demo/apply-for-demo.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { ChartsModule } from 'ng2-charts';
import { ChangeOtherPasswordComponent } from './change-other-password/change-other-password.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SharedComponent,
    SideBarComponent,
    NavBarComponent,
    AddEditStudentInfoComponent,
    StudentListComponent,
    LoginComponent,
    WelcomeComponent,
    ChangePasswordComponent,
    ApplyForDemoComponent,
    FormatTimePipe,
    ChangeOtherPasswordComponent,
    NoticeBoardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgbModule,
    CanvasWhiteboardModule,
    ChartsModule,
    FontAwesomeModule
  ],
  exports:[
    SideBarComponent,
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgbModule,
    AddEditStudentInfoComponent,
    StudentListComponent,
    LoginComponent,
    WelcomeComponent,
    ChangePasswordComponent,
    ApplyForDemoComponent,
    FormatTimePipe,
    CanvasWhiteboardModule,
    ChartsModule,
    ChangeOtherPasswordComponent,
    NoticeBoardComponent,
    FontAwesomeModule
    
    
  ]
})
export class SharedModule { }
