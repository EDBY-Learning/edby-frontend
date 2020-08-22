import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedComponent } from './shared.component';
import { LoginComponent } from './login/login.component';
//import { WelcomeComponent } from '../home/welcome/welcome.component';
import { AuthGuardLoginGuard } from '../guards/auth-guard-login.guard';
import { ApplyForDemoComponent } from './apply-for-demo/apply-for-demo.component';

const routes: Routes = [
  { 
    path: '', 
    component: SharedComponent,
    children:[
      /*{
        path:'home',
        component:WelcomeComponent,
        canActivate:[AuthGuardLoginGuard]
      },*/
      {
        path:'login',
        component:LoginComponent,
        canActivate:[AuthGuardLoginGuard]
      },
      {
        path:'home',
        component:ApplyForDemoComponent,
        canActivate:[AuthGuardLoginGuard]
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
