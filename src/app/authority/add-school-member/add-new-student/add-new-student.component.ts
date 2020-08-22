import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { AuthorityService } from '../../authority-service';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit {

  classList:any=[];
  staticAlert;

  private sub1;

  studentForm : FormGroup= new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.email]),
    mob_no: new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_mob_no_1: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_mob_no_2: new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    parent_email: new FormControl('',[Validators.email]),
    class_name: new FormControl('',[Validators.required]),
    section: new FormControl('',[Validators.required]),
    roll: new FormControl('',[]),
    addr: new FormControl('',[]),
    city: new FormControl('',[]),
    state: new FormControl('',[]),
    nation: new FormControl('',[]),
    pincode: new FormControl('',[]),
    
  });
  teacherInfo: any;

  constructor(private router:Router,
    private route: ActivatedRoute,
    private sweetAlert: SwalAlertService,
    private service:AuthorityService,) {
      this.service.getClassList().subscribe((data)=>{
        if(data['status']=='success'){
          let temp = data['message'];
          for(let i =0;i<temp.length;i++){
            if(temp[i]['class_teacher']!=''){
              this.classList.push(temp[i])
            }
          }
          console.log(this.classList)
        }
      })
    }

  ngOnInit() {
    
  }

  OnSubmit(){
    let warning = true; 
    for(let i=0; i<this.classList.length;i++){
      if((this.classList[i]['class_name']==this.studentForm.value['class_name'])&&
      (this.classList[i]['section']==this.studentForm.value['section'])){
        warning= false;
        break
      }
    }
    if(warning){
      this.staticAlert = true;
    }else{
      this.service.registerNewStudent(this.studentForm.value).subscribe((data)=>{
        console.log(this.studentForm.value)
        this.sweetAlert.success_3('data saved for '+this.studentForm.value.name,3)
        this.studentForm.reset()
      },(err)=>{
        this.sweetAlert.failure(err)
      })
    }
    
    
    
  }

  resetForm(){
    console.log('reset')
    this.studentForm.reset()
  }

  ngOnDestroy(){
    
  }

}
