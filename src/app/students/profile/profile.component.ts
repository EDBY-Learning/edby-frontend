import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData;

  profileForm:FormGroup = new FormGroup({
    student_id: new FormControl('',[]),
    school_id: new FormControl('',[]),
    

    name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.email]),
    roll : new FormControl('',[Validators.required]),
    mob_no : new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    class_name : new FormControl('',[Validators.required]),
    section : new FormControl('',[Validators.required]),
    school : new FormControl('',[Validators.required]),
    class_teacher : new FormControl('',[Validators.required]),
    addr : new FormControl(''),
    city : new FormControl(''),
    state : new FormControl(''),
    nation : new FormControl(''),
    pincode : new FormControl(''),
    parent_mob_no_1 : new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_mob_no_2 : new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_email : new FormControl('',[Validators.email])
  })

  constructor(private router:Router,
              private route: ActivatedRoute,
              private service: StudentsService,
              private sweetAlert: SwalAlertService) { }

  ngOnInit(): void {

    if(this.service.profileData ==null){
      this.service.getSelfData().subscribe((data)=>{
        if(data['status']=='success'){
          this.profileData = data['message']
          this.service.profileData = this.profileData
          this.profileForm.patchValue({
            student_id: this.profileData.student_id,
            school_id: this.profileData.school_id,
  
            name: this.profileData.student_name,
            email: this.profileData.email,
            roll: this.profileData.roll,
            mob_no: this.profileData.mob_no,
            class_name: this.profileData.class_name,
            section: this.profileData.section,
            school: this.profileData.school_name,
            class_teacher: this.profileData.class_teacher,
            addr: this.profileData.addr,
            city: this.profileData.city,
            state: this.profileData.state,
            nation: this.profileData.nation,
            pincode: this.profileData.pincode,
            parent_mob_no_1: this.profileData.parent_mob_no_1,
            parent_mob_no_2: this.profileData.parent_mob_no_2,
            parent_email: this.profileData.parent_email
          })
        }else{
          this.sweetAlert.failure('Not Able to load data')
        }
      })
    }else{
      this.profileData = this.service.profileData 
      this.profileForm.patchValue({
        student_id: this.profileData.student_id,
        school_id: this.profileData.school_id,

        name: this.profileData.student_name,
        email: this.profileData.email,
        roll: this.profileData.roll,
        mob_no: this.profileData.mob_no,
        class_name: this.profileData.class_name,
        section: this.profileData.section,
        school: this.profileData.school_name,
        class_teacher: this.profileData.class_teacher,
        addr: this.profileData.addr,
        city: this.profileData.city,
        state: this.profileData.state,
        nation: this.profileData.nation,
        pincode: this.profileData.pincode,
        parent_mob_no_1: this.profileData.parent_mob_no_1,
        parent_mob_no_2: this.profileData.parent_mob_no_2,
        parent_email: this.profileData.parent_email
      })     
    }


    
    
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['roll'].disable();
    this.profileForm.controls['class_name'].disable();
    this.profileForm.controls['section'].disable();
    this.profileForm.controls['school'].disable();
    this.profileForm.controls['class_teacher'].disable();
    this.profileForm.controls['parent_mob_no_1'].disable();
  }

  OnSubmit(){
    this.service.updateStudent(this.profileForm.value).subscribe((data)=>{
      console.log(data)
      if(data['status']=='success'){
        console.log(data)
        this.sweetAlert.success_3('Profile Updated ',3)
      }else{
        this.sweetAlert.failure(data['message'])
        this.service.profileData = null;
        this.ngOnInit()        
      }
    },(err)=>{
      console.log(err)
    })
  }

}
