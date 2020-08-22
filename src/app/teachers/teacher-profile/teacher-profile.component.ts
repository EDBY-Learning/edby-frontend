import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { TeachersService } from '../teachers-service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  profileData;

  profileForm:FormGroup = new FormGroup({
    teacher_id : new FormControl('',[]),
    school_id : new FormControl('',[]),
    school_name : new FormControl('',[]),

    name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    mob_no : new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    class_name:new FormControl('',[Validators.required]),
    section : new FormControl('',[Validators.required]),
    addr : new FormControl('',[]),
    city : new FormControl('',[]),
    state : new FormControl('',[]),
    nation : new FormControl('',[]),
    pincode : new FormControl('',[]),
    is_class_teacher: new FormControl('',[Validators.required])
  })
  sub1: any;

  constructor(private router:Router,
    private route: ActivatedRoute,
    private sweetAlert: SwalAlertService,
    private service:TeachersService) {

      if(this.service.teacherSelfInfo ==null){
        this.service.getSelfData().subscribe((data)=>{
          if(data['status']=='success'){
            this.profileData = data['message']
            this.service.teacherSelfInfo = this.profileData
            this.profileForm.patchValue({
              teacher_id : this.profileData.teacher_id,
              school_id : this.profileData.school_id,
              school_name : this.profileData.school_name,
  
              name:this.profileData.teacher_name,
              email:this.profileData.email,
              mob_no:this.profileData.mob_no,
              class_name:this.profileData.class_name,
              section:this.profileData.section,
              addr:this.profileData.addr,
              city:this.profileData.city,
              state:this.profileData.state,
              nation:this.profileData.nation,
              pincode:this.profileData.pincode,
              is_class_teacher:this.profileData.is_class_teacher
            })
            this.profileForm.controls['class_name'].disable();
            this.profileForm.controls['section'].disable();
            this.profileForm.controls['is_class_teacher'].disable();
            //console.log(this.studentForm.value)
          }else{
            console.log('could not fetch profile info')
          }
        })  
      }else{
        this.profileData = this.service.teacherSelfInfo
        this.profileForm.patchValue({
          teacher_id : this.profileData.teacher_id,
          school_id : this.profileData.school_id,
          school_name : this.profileData.school_name,

          name:this.profileData.teacher_name,
          email:this.profileData.email,
          mob_no:this.profileData.mob_no,
          class_name:this.profileData.class_name,
          section:this.profileData.section,
          addr:this.profileData.addr,
          city:this.profileData.city,
          state:this.profileData.state,
          nation:this.profileData.nation,
          pincode:this.profileData.pincode,
          is_class_teacher:this.profileData.is_class_teacher
        })
        this.profileForm.controls['class_name'].disable();
        this.profileForm.controls['section'].disable();
        this.profileForm.controls['is_class_teacher'].disable();
      }
    
  }

  ngOnInit(): void {
    
  }

  OnSubmit(){
    this.service.updateSelfData(this.profileForm.value).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_3('Profile Updated ',3)
      }else{
        this.sweetAlert.failure(data['message'])
        this.service.teacherSelfInfo = null;
        this.ngOnInit()
      }
    },(err)=>{
      console.log(err)
    })
  }

  ngOnDestroy(){
    
  }

}
