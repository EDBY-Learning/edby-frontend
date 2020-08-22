import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { AuthorityService } from '../../authority-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-class-teacher',
  templateUrl: './add-class-teacher.component.html',
  styleUrls: ['./add-class-teacher.component.scss']
})
export class AddClassTeacherComponent implements OnInit {
  
  teacherData;
  classList=[];
  private sub1;
  private sub2;

  teacherForm : FormGroup= new FormGroup({
    teacher_id: new FormControl('',[]),
    school_id: new FormControl('',[]),
    school_name: new FormControl('',[]),

    name: new FormControl('',[Validators.required]),
    mob_no: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    email: new FormControl('',[Validators.required,Validators.email]),
    addr: new FormControl('',[]),
    city: new FormControl('',[]),
    state: new FormControl('',[]),
    nation:new FormControl('',[]),
    pincode:new FormControl('',[]),
    is_class_teacher:new FormControl('True',[Validators.required]),
    class_name:new FormControl('',[Validators.required]),
    section:new FormControl('',[Validators.required])
  });

  constructor(private formBuilder: FormBuilder,
              private service:AuthorityService,
              private router:Router,
              private route: ActivatedRoute,
              private sweetAlert: SwalAlertService) {
    this.service.getClassList().subscribe((data)=>{
      console.log(data)
      if(data['status']=='success'){
        this.classList = data['message'];
        console.log(this.classList)
      }
    })
    const control1 = this.teacherForm.get('is_class_teacher');
    const control2 = this.teacherForm.get('class_name');
    const control3 = this.teacherForm.get('section');

    this.sub1 = control1.valueChanges.subscribe(value=>{
      //console.log('Checking',control1,control2)
      if (value=='True'){
        //console.log('True')
        control2.setValidators([Validators.required])
        control3.setValidators([Validators.required])
      }else{
        control2.setValidators(null);
        control3.setValidators(null);
      }
      control2.updateValueAndValidity();
      control3.updateValueAndValidity();
    })

   
   }

  ngOnInit(): void {
    this.teacherData = this.service.getTeacherData()
    if(this.teacherData){
      this.teacherForm.patchValue({
        name:this.teacherData.teacher_name,
        mob_no:this.teacherData.mob_no,
        email:this.teacherData.email,
        addr:this.teacherData.addr,
        city:this.teacherData.city,
        state:this.teacherData.state,
        nation:this.teacherData.nation,
        pincode:this.teacherData.pincode,
        is_class_teacher:this.teacherData.is_class_teacher,
        class_name:this.teacherData.class_name,
        section:this.teacherData.section,
        teacher_id: this.teacherData.teacher_id,
        school_id: this.teacherData.school_id,
        school_name: this.teacherData.school_name,
      })

    }
  }

  OnSubmit(){
    let warning = false;
    let teacher_name = null;
    
    if((this.teacherForm.value['is_class_teacher']=='True')){
      for(let i=0; i<this.classList.length;i++){
        if((this.classList[i]['class_teacher_name']!='')&&
        (this.classList[i]['class_name']==this.teacherForm.value['class_name'])&&
        (this.classList[i]['section'].toUpperCase()==this.teacherForm.value['section'].toUpperCase())){
          warning = true
          teacher_name = this.classList[i]['class_teacher_name']
          break
        }
      }
    }


    if(warning){
      Swal.fire({
        title: 'Are you sure?',
        text: 'Class '+this.teacherForm.value.class_name+'-'+this.teacherForm.value.section+' has '+teacher_name+' as class teacher!! Click OK to update class teacher !!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Submit it!'
      }).then((result) => {
        if (result.value) {
          this.sweetAlert.warning('Please wait while we process your request')
          this.submission()
        }
      })
    }else{
      this.sweetAlert.warning('Please wait while we process your request')
      this.submission()
    }
  }

  submission(){
    if(this.teacherData){
      
      let temp_ = this.teacherForm.value
      if((this.teacherForm.value['is_class_teacher']=='True')){
        temp_['section'] = temp_['section'].toUpperCase()
      }
      this.service.updateTeacher(temp_).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_3('data saved for '+this.teacherForm.value.name,3)
          this.service.setSelectedTeacher(null)
          this.teacherForm.reset()
          this.teacherForm.patchValue({
            is_class_teacher:'True'
          })
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })
    }else{
      let temp_ = this.teacherForm.value
      if((this.teacherForm.value['is_class_teacher']=='True')){
        temp_['section'] = temp_['section'].toUpperCase()
      }
      this.service.registerTeacher(temp_).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_3('data saved for '+this.teacherForm.value.name,3)
          this.service.setSelectedTeacher(null)
          this.teacherForm.reset()
          this.teacherForm.patchValue({
            is_class_teacher:'True'
          })
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
    this.teacherForm.reset()
  }

  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }
    
    //this.sub2.unsubscribe();
    this.service.setSelectedTeacher(null);
  }


}
