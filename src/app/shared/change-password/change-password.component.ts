import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { SharedService } from '../shared-service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  match = false;

  passwordForm:FormGroup = new FormGroup({
    current_password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    new : new FormControl('',[Validators.required,Validators.minLength(8)]),
    new_password : new FormControl('',[Validators.required,Validators.minLength(8)]),
  })
  sub1: any;
  sub2: any;

  constructor(private modalService: NgbModal,
              private sweetAlert: SwalAlertService,
              private sharedService:SharedService) {
    const control1 = this.passwordForm.get('new');
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
      if ((value!='')&&(value==this.passwordForm.controls['new'].value)){
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
    let pass = group.get('new').value;
    let confirmPass = group.get('new_password').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  OnSubmit(modal){
    //console.log(this.passwordForm.value)
    this.sharedService.changePassword(this.passwordForm.value).subscribe((data)=>{
      if(data['status']=='success'){
        console.log(data)
        modal.close('Ok click')
        this.sweetAlert.success_2('Password Changed Succesfully')
      }else{
        modal.close('Ok click')
        this.sweetAlert.failure(data['message'])
      }
      
    })  
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
