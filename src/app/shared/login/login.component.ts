import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { Router } from '@angular/router';
import { LoginSessionService } from 'src/app/services/login-session.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup  = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  sub1: any;
  sub2: any;

  constructor(private sweetAlert: SwalAlertService,
              private router:Router,
              private login:LoginSessionService) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    
    //console.log(this.loginForm.value)
    this.login.loginUser(this.loginForm.value).subscribe((data)=>{
      
      //console.log(data)
      
      
      if(data['status']=='failure'){
        this.sweetAlert.failure(data['data']);
        this.loginForm.reset()
      }else if(data['status']=='success'){
        localStorage.setItem('authTokenSchool', data['token']);
        this.login.setData(data['data'])
        this.sweetAlert.login()
      }
    },(err)=>{
      this.sweetAlert.failure('ERROR!!!');
      console.log(err)
    })    
    //this.router.navigate(['authority'])//,{relativeTo:this.route});
  }

  ngOnDestroy(){
    //this.sub2.unsubcribe()
  }

}
