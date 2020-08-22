import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AuthGuardAuthorityGuard } from './guards/auth-guard-authority.guard';
import { AuthGuardTeacherGuard } from './guards/auth-guard-teacher.guard';
import { AuthGuardStudentGuard } from './guards/auth-guard-student.guard';


const routes: Routes = [
 
  { 
    path: 'student', 
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canLoad:[AuthGuardStudentGuard]
  }, 
  { 
    path: 'teacher', 
    loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule),
    canLoad:[AuthGuardTeacherGuard]
  },
  { 
    path: 'authority', 
    loadChildren: () => import('./authority/authority.module').then(m => m.AuthorityModule),
    canLoad:[AuthGuardAuthorityGuard]
  },
  { 
    path: '', 
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) 
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
