import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../teachers-service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subject-teacher-mapping',
  templateUrl: './subject-teacher-mapping.component.html',
  styleUrls: ['./subject-teacher-mapping.component.scss']
})
export class SubjectTeacherMappingComponent implements OnInit {

  staticAlert;
  error;

  teacherList;
  subjectList;
  subject_name;
  teacher_id;
  subject_id;

  update_subject = null;

  constructor(private service: TeachersService,
    private sweetAlert: SwalAlertService,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    if(this.service.teacherListClass ==null){
      this.service.getTeachersList().subscribe((data)=>{
        if(data['status']=='success'){
          this.teacherList = data['message']
          this.service.teacherListClass = this.teacherList
        }else{
          console.log('error',data)
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.teacherList = this.service.teacherListClass
    }

    if(this.service.subjectList ==null){
      this.service.getClassSubjectList().subscribe((data)=>{
        if(data['status']=='success'){
          this.subjectList = data['message']
          this.service.subjectList = this.subjectList
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.subjectList = this.service.subjectList
    }
    
  }

  changeTeacher(e) {
    
  }

  registerNewSubject(){
    if((!this.teacher_id) || (!this.subject_name)){
      this.error = 'Missing Teacher Name'
      this.staticAlert = true;
    }else{
      this.service.registerSubject({create_or_update:'create',
      subject_name:this.subject_name,
      teacher_id:this.teacher_id}).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_2(data['message'])
          this.subject_name = ''
          this.teacher_id = ''
          this.subject_id = ''
          this.service.subjectList = null;
          this.ngOnInit()
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })
    }
  }

  updateSubject(content,sub){
    this.update_subject = sub;
    this.modalService.open(content, { centered: true ,backdrop:'static',keyboard:false}); 
  }

  changeError(){
    this.error = ''
    this.staticAlert =false
  }


  updateTeacher(modal){
    if((!this.teacher_id)){
      this.error = 'Missing Teacher Name'
      this.staticAlert = true;
    }else{
      this.service.registerSubject({create_or_update:'update',
      subject_name:this.update_subject.subject_name,
      subject_id:this.update_subject.subject_id,
      teacher_id:this.teacher_id}).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_2(data['message'])
          this.subject_name = ''
          this.teacher_id = ''
          this.subject_id = ''
          this.update_subject = null
          this.ngOnInit()
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })
    }
    modal.close('Ok click')
  }

  cancelModal(modal){
    //console.log('cancelled')
    this.teacher_id = ''
    this.update_subject = null
    modal.dismiss('cancel click')
  }

  

  

}
