import { Component, OnInit } from '@angular/core';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { StudentsService } from '../students.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-submit-homework',
  templateUrl: './view-submit-homework.component.html',
  styleUrls: ['./view-submit-homework.component.scss']
})
export class ViewSubmitHomeworkComponent implements OnInit {

  homeworkList;
  selectedHomework;
  sub1;
  fileToUpload: File;
  hasFileSelected = false;
  subject_id: any;
  class_name: any;
  section: any;

  constructor(private service: StudentsService,
    private sweetAlert: SwalAlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.subject_id = this.route.snapshot.params.subject_id
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.service.getHomework({subject_id:this.subject_id}).subscribe((data)=>{
      //console.log(data)
      if(data['status']=='success'){
        this.homeworkList = data['message']
      }else{
        console.log(data)
      }
    },(err)=>{
      console.log(err)
    })
  }

  selectHomework(val){
    this.selectedHomework = val;
    this.fileToUpload = null;
    this.hasFileSelected = false
    //console.log(this.selectedHomework)
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.hasFileSelected = true
    console.log(this.hasFileSelected)
  }

  submitHomework(){
    

    Swal.fire({
      title: 'Are you sure?',
      //text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.value) {
        this.sweetAlert.warning('Please wait while we process!!')
        let submission_time = new Date().toISOString()
        this.service.create_update_homework_submission({
          'file':this.fileToUpload,
          'homework_id':this.selectedHomework.homework_id,
          'submission_time':submission_time}).subscribe((data)=>{
            if(data['status']=='success'){
              this.ngOnInit()
              this.sweetAlert.success_2('Your work is saved')
              this.selectedHomework = null;
              this.fileToUpload = null;
              this.hasFileSelected = false
            }else{
              this.sweetAlert.failure(data['message'])
            }
          },(err)=>{
            this.sweetAlert.failure(err)
          })
      }
    })
      
  }

  downloadHomework(work){
    window.open(work.homework_file,'_blank')
  }

  goback(){
    this.router.navigate(['../../../../subjects'],{relativeTo:this.route})
  }

  ngOnDestroy(){
    console.log('unsubscribed Homework')
    //this.sub1.unsubscribe()
  }

}
