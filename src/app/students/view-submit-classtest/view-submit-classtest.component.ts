import { Component, OnInit } from '@angular/core';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-view-submit-classtest',
  templateUrl: './view-submit-classtest.component.html',
  styleUrls: ['./view-submit-classtest.component.scss']
})
export class ViewSubmitClasstestComponent implements OnInit {
  classTestList;
  selectedClassTest;
  //selectedClassTestIndex;
  fileToUpload: File;
  hasFileSelected = false;
  subject_id: any;
  class_name: any;
  section: any;

  constructor(private sweetAlert: SwalAlertService,
    private route: ActivatedRoute,
    private service: StudentsService,) { }

  ngOnInit(): void {
    this.subject_id = this.route.snapshot.params.subject_id
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.service.getClasstest({subject_id:this.subject_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.classTestList = data['message']
      }else{
        console.log(data['message'])
      } 
    },(err)=>{
      console.log(err)
    })

  }

  downloadFile(test){
    if(confirm("Your start time is recorded and can't be changed so please upload submission on time")){
      window.open(test.class_test_file,'_blank')
      this.service.startClasstest({class_test_id:test.class_test_id}).subscribe((data)=>{
        if(data['status']=='succces'){
          this.sweetAlert.success_2('Class Test Started')
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }
    
  }

  classTestSelection(val){
    this.selectedClassTest = val;
    //this.selectedClassTestIndex = i;
    //this.fileToUpload = null;
    //this.hasFileSelected = false
    //console.log(this.selectedClassTest)
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.hasFileSelected = true  
  }

  classTestSubmission(){
    let new_date = new Date().toISOString()
      this.service.classTest_submission({
        'file':this.fileToUpload,
        'class_test_id':this.selectedClassTest.class_test_id,
        'submission_time':new_date
      }).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_2(data['message'])
          //this.classTestList[this.selectedClassTestIndex]['submitted'] = 1
          //this.classTestList[this.selectedClassTestIndex]['solution'] = this.fileToUpload
          this.selectedClassTest = null;
          //this.selectedClassTestIndex = null;
          this.fileToUpload = null;
          this.hasFileSelected = false
          this.ngOnInit();
        }else{
          this.sweetAlert.failure(data['message'].split('.')[0])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })
            
      
  }

}
