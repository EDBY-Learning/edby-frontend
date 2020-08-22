import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { SharedService } from '../shared-service';
import { LoginSessionService } from 'src/app/services/login-session.service';

@Component({
  selector: 'change-other-password',
  templateUrl: './change-other-password.component.html',
  styleUrls: ['./change-other-password.component.scss']
})
export class ChangeOtherPasswordComponent implements OnInit {

  match = false;
  type_;

  passwordForm:FormGroup = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    new_password : new FormControl('',[Validators.required,Validators.minLength(8)]),
  })
  sub1: any;
  sub2: any;

  constructor(private modalService: NgbModal,
  private sweetAlert: SwalAlertService,
  private sharedService:SharedService,
  private loginService: LoginSessionService) {
    
    let data = localStorage.getItem('userInfoOnlineSchool')
    data = JSON.parse(data)
    this.type_ = data['user_type']
    const control1 = this.passwordForm.get('password');
    const control2 = this.passwordForm.get('new_password');
    this.sub1 = control1.valueChanges.subscribe(value=>{
      if ((value!='')&&(value==this.passwordForm.controls['new_password'].value)){
        //console.log('Checking 1',value,this.passwordForm.controls['new_password'].value)
        this.match=true;
      }else{
        this.match = false;
      }
    })

    this.sub2 = control2.valueChanges.subscribe(value=>{
      if ((value!='')&&(value==this.passwordForm.controls['password'].value)){
        //console.log('Checking 2',this.passwordForm.controls['new'].value,value)
        this.match=true;
      }else{
        this.match = false;
      }
    })

   }

  ngOnInit(): void {
    
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('new_password').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  OnSubmit(modal){
    //console.log(this.passwordForm.value)
    if(this.type_=='class_teacher'){
      this.sharedService.changeStudentPassword(this.passwordForm.value).subscribe((data)=>{
        if(data['status']=='success'){
          console.log(data)
          modal.close('Ok click')
          this.sweetAlert.success_2('Password Changed Succesfully')
        }else{
          modal.close('Ok click')
          this.sweetAlert.failure(data['message'])
        }
        
      })
    }else if(this.type_ == 'authority'){
      this.sharedService.changeTeacherPassword(this.passwordForm.value).subscribe((data)=>{
        if(data['status']=='success'){
          console.log(data)
          modal.close('Ok click')
          this.sweetAlert.success_2('Password Changed Succesfully')
        }else{
          modal.close('Ok click')
          this.sweetAlert.failure(data['message'])
        }
        
      })
    }else{
      this.sweetAlert.failure('Not Authorized')
    }
      
  }

  openModal(content){
    this.modalService.open(content, { centered: true,backdrop:'static',keyboard:false });
  }

  changePassword(modal){
   
    modal.close('Ok click')
    //this.modalService.open(content2, { centered: true ,backdrop:'static',keyboard:false});
  }

  cancelModal(modal){
    //console.log('cancelled')
    modal.dismiss('cancel click')
    
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
