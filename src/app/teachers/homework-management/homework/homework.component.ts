import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
//import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { async } from '@angular/core/testing';
import Swal from 'sweetalert2'
import { TeachersService } from '../../teachers-service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {

  sub1;
  subject_id;
  class_name;
  section;

  fileSelected;
  fileToUpload: File = null;

  homeworkForm: FormGroup  = new FormGroup({
    homework_name: new FormControl('',[Validators.required]),
    start_time: new FormControl('',[Validators.required]),
    end_time: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    is_graded: new FormControl('False',[Validators.required]),
    maximum_marks: new FormControl('',[]),
    file:new FormControl('',[Validators.required])
  });
  homeworkList: any;
  sub2: any;

  

  constructor(private route: ActivatedRoute,
    private router:Router,
    private service:TeachersService,
    private sweetAlert: SwalAlertService) {
    const control1 = this.homeworkForm.get('is_graded');
    const control2 = this.homeworkForm.get('maximum_marks');

    const control3 = this.homeworkForm.get('file');
    
    this.sub1 = control1.valueChanges.subscribe(value=>{
      //console.log('Checking',control1,control2)
      if (value=='True'){
        //console.log('yes')
        control2.setValidators([Validators.required])
      }else{
        control2.setValidators(null);
      }
      control2.updateValueAndValidity();
    })

    this.sub2 = control3.valueChanges.subscribe(value=>{
      let temp2 = value.split('\\')
      this.fileSelected = temp2[temp2.length-1]
    })

   }

  ngOnInit(): void {
    this.subject_id = this.route.snapshot.params.subject_id
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    console.log(this.subject_id)
    
    
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    
  }

  


  OnSubmit(){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.value) {

        let form_data = this.homeworkForm.value
        form_data['start_time'] =  new Date(form_data['start_time']).toISOString()
        form_data['end_time'] = new Date(form_data['end_time']).toISOString()
        form_data['file'] = this.fileToUpload 
        form_data['subject_id'] = this.subject_id
        
        this.sweetAlert.warning('Please wait while we process')
        this.service.create_update_homework(form_data).subscribe((data)=>{
          if(data['status']=='success'){
            this.sweetAlert.success_2(data['message'])
            this.service.homeworkList =null;
            this.homeworkForm.reset()
          }else{
            this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          this.sweetAlert.failure(err)
        })
      }
    })
  }

  ngOnDestroy(){
    console.log('unsubscribed subjects')
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

}
