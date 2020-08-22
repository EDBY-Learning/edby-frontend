import { Component, OnInit, Input } from '@angular/core';
import { SideBarToggleService } from 'src/app/services/side-bar-toggle.service';
import { LoginSessionService } from 'src/app/services/login-session.service';
import { Router } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() showSideBarToggle:boolean = true;
  public isMenuCollapsed = true;

  isLogged = false;
  school;
  username;

  constructor(private toggle:SideBarToggleService,
              private sweetAlert: SwalAlertService,
              private login:LoginSessionService,
              private router:Router) {
    let data = localStorage.getItem('userInfoOnlineSchool')
    data = JSON.parse(data)
    //console.log(data)
    if(data){
      this.isLogged = true;
      this.school = data['school']
      this.username = data['username']
    }else{
      //this.router.navigate(['home'])
    }
    
  }

  ngOnInit(): void {
  }

  clickToggle(){
    this.toggle.toggleSideBar()
  }

  logout(){
    
    this.login.logoutUser().subscribe((data)=>{
      //console.log(data)
      this.removeLogin()
      this.sweetAlert.success_2(data['message'])
    },(err)=>{
      this.removeLogin()
    },()=>{
      
    })
  }
  
  removeLogin(){
    this.isLogged = false
    localStorage.clear();
    this.router.navigate(['login'])
  }

  goToLogin(){
    this.router.navigate(['login'])
  }

}
