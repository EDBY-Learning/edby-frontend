import { Component } from '@angular/core';
import { LoginSessionService } from './services/login-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'online-school';

  constructor(private login:LoginSessionService,private router:Router){

    this.login.pingServer().subscribe((data)=>{
      if(data['status']=='success'){
        let data = localStorage.getItem('userInfoOnlineSchool')
        data = JSON.parse(data)
        console.log(data)
        if(data){
          console.log('Already Logged In')
          this.login.onlySetData(data)
        }else{
          localStorage.clear();
          this.router.navigate(['home'])
        }
      }else{
        localStorage.clear();
        this.router.navigate(['home'])
      }
    },(err)=>{
        localStorage.clear();
        this.router.navigate(['home'])
    })

    
    
  }

}
