import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { TeachersService } from 'src/app/teachers/teachers-service';

@Component({
  selector: 'app-add-edit-student-info',
  templateUrl: './add-edit-student-info.component.html',
  styleUrls: ['./add-edit-student-info.component.scss']
})
export class AddEditStudentInfoComponent implements OnInit {

  studentData = null;

  private sub1;

  studentForm : FormGroup= new FormGroup({
    student_id: new FormControl('',[]),
    school_id: new FormControl('',[]),
    school_name: new FormControl('',[]),

    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.email]),
    mob_no: new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_mob_no_1: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_mob_no_2: new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_email: new FormControl('',[Validators.email]),
    class_name: new FormControl('',[Validators.required]),
    section: new FormControl('',[Validators.required]),
    class_teacher: new FormControl('',[Validators.required]),
    roll: new FormControl('',[Validators.required]),
    addr: new FormControl('',[]),
    city: new FormControl('',[]),
    state: new FormControl('',[]),
    nation: new FormControl('',[]),
    pincode: new FormControl('',[]),
    
  });
  teacherInfo: any;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private sweetAlert: SwalAlertService,
    private service:TeachersService) {

      if(this.service.teacherSelfInfo ==null){
        this.service.getSelfData().subscribe((data)=>{
          if(data['status']=='success'){
            this.teacherInfo = data['message']
            this.service.teacherSelfInfo = this.teacherInfo
            this.studentForm.patchValue({
              class_teacher:this.teacherInfo.teacher_name,
              class_name:this.teacherInfo.class_name,
              section:this.teacherInfo.section
            })
            this.studentForm.controls['class_teacher'].disable();
            this.studentForm.controls['class_name'].disable();
            this.studentForm.controls['section'].disable();
            //console.log(this.studentForm.value)
          }else{
            console.log('could not fetch profile info')
          }
        }) 
      }else{
        this.teacherInfo = this.service.teacherSelfInfo
        this.studentForm.patchValue({
          class_teacher:this.teacherInfo.teacher_name,
          class_name:this.teacherInfo.class_name,
          section:this.teacherInfo.section
        })
        this.studentForm.controls['class_teacher'].disable();
        this.studentForm.controls['class_name'].disable();
        this.studentForm.controls['section'].disable();
      }

       
    }

  ngOnInit() {
    this.studentData = this.service.getStudentData();
    if(this.studentData){
      this.studentForm.patchValue({
        student_id: this.studentData.student_id,
        school_id: this.studentData.school_id,
        school_name: this.studentData.school_name,

        name:this.studentData.student_name,
        email:this.studentData.email,
        mob_no:this.studentData.mob_no,
        parent_mob_no_1:this.studentData.parent_mob_no_1,
        parent_mob_no_2:this.studentData.parent_mob_no_2,
        parent_email:this.studentData.parent_email,
        class_name:this.studentData.class_name,
        section:this.studentData.section,
        class_teacher:this.studentData.class_teacher,
        roll:this.studentData.roll,
        addr:this.studentData.addr,
        city:this.studentData.city,
        state:this.studentData.state,
        nation:this.studentData.nation,
        pincode:this.studentData.pincode,
      })
    }
    

   
  }

  OnSubmit(){
    if(this.studentData==null){
      this.service.addStudent(this.studentForm.value).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_3('data saved for '+this.studentForm.value.name,3)
          this.resetForm()
          this.service.setSelectedStudent(null);
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })
    }else{
      this.service.updateStudent(this.studentForm.value).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_3('data updated for '+this.studentForm.value.name,3)
          this.resetForm()
          this.service.setSelectedStudent(null);
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })
    }
    

    
  }

  resetForm(){
    console.log('reset')
    this.service.setSelectedStudent(null);
    this.studentForm.reset()
    this.studentForm.controls['class_teacher'].enable();
    this.studentForm.controls['class_name'].enable();
    this.studentForm.controls['section'].enable();
    this.studentForm.patchValue({
      class_teacher:this.teacherInfo.teacher_name,
      class_name:this.teacherInfo.class_name,
      section:this.teacherInfo.section
    })
    this.studentForm.controls['class_teacher'].disable();
    this.studentForm.controls['class_name'].disable();
    this.studentForm.controls['section'].disable();
  }

  ngOnDestroy(){
    this.service.setSelectedStudent(null);
    //this.sub1.unsubscribe()
  }

}
