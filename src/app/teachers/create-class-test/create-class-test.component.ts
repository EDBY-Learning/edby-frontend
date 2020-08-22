import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { TeachersService } from '../teachers-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-class-test',
  templateUrl: './create-class-test.component.html',
  styleUrls: ['./create-class-test.component.scss']
})
export class CreateClassTestComponent implements OnInit {
  class_name: any;
  section: any;
  subject_id: any;

  classTestForm: FormGroup = new FormGroup({
    class_test_name : new FormControl('',[Validators.required]),
    file : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required]),
    start_time : new FormControl('',[Validators.required]),
    duration : new FormControl('',[Validators.required]),
    buffer_time : new FormControl('',[Validators.required]),
    activated : new FormControl('no',[Validators.required]),
    maximum_marks : new FormControl('',[Validators.required]),	
    is_graded: new FormControl('True',[Validators.required])
  })
  sub2: any;
  fileSelected: any;
  fileToUpload: any;
  hasFileSelected: boolean;

  constructor(private route: ActivatedRoute,
    private sweetAlert: SwalAlertService,
    private service: TeachersService) { 
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.subject_id = this.route.snapshot.params.subject_id

    const control1 = this.classTestForm.get('file')
    this.sub2 = control1.valueChanges.subscribe(value=>{
      if(value!=null){
        let temp2 = value.split('\\')
      this.fileSelected = temp2[temp2.length-1]
      }
    })
  }

  ngOnInit(): void {

  }

  OnSubmit(){
    let form_data = this.classTestForm.value
    form_data['start_time'] =  new Date(form_data['start_time']).toISOString()
    //console.log(this.fileToUpload)
    form_data['file'] = this.fileToUpload 
    form_data['subject_id'] = this.subject_id
    form_data['duration'] = 60* form_data['duration']
    form_data['buffer_time'] = 60* form_data['buffer_time']
    this.service.create_update_classtest(form_data).subscribe((data)=>{
      console.log(data)
      if(data['status']=='success'){
        this.sweetAlert.success_2(data['message'])
        this.classTestForm.reset()
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
    
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.hasFileSelected = true  
  }

}
