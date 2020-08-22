import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeachersService } from '../teachers-service';

@Component({
  selector: 'app-class-test',
  templateUrl: './class-test.component.html',
  styleUrls: ['./class-test.component.scss']
})
export class ClassTestComponent implements OnInit {

  sub1;
  class_name;
  section;
  classTestList;

  selectedClassTest;
  selectedClassTest_studentList
  
  selectedStudent;
  selectedStudentIndex;
  marks;

  //fileToUpload: File;
  //hasFileSelected = false;

  
  sub2: any;
  fileSelected: any;
  subject_id: any;

  constructor(private route: ActivatedRoute,
              private sweetAlert: SwalAlertService,
              private modalService: NgbModal,
              private service: TeachersService) { 

    
  }

  ngOnInit(): void {
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.subject_id = this.route.snapshot.params.subject_id
    
    this.service.getClasstest({subject_id:this.subject_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.classTestList = data['message']
        
      }else{
        console.log(data)
      }
    },(err)=>{
      console.log(err)
    })

  }

  downloadFile(test){
    window.open(test.class_test_file,'_blank')
  }

  downloadStudentFile(test){
    window.open(test.submission_file,'_blank')
  }

  

  classTestSelection(val){
    this.selectedClassTest = val
    this.service.get_classTest_submission({class_test_id:val.class_test_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.selectedClassTest_studentList = data['message']
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
    
    //console.log(this.selectedClassTest)
  }
  


  approveTest(val){
    if(confirm('Student will have access to Test Paper! Are you sure you want to start test')){
      this.service.approveClassTest({class_test_id:val.class_test_id}).subscribe((data)=>{
        if(data['status']='success'){
          this.sweetAlert.success_2(data['message'])
          this.selectedClassTest = null;
          this.ngOnInit()
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })      
    } 
  }

  openMarksModal(content,student,i){
    this.selectedStudent = student
    this.selectedStudentIndex = i
    this.modalService.open(content, { centered: true ,backdrop:'static',keyboard:false}); 
  }

  updateMarks(modal){
    //console.log(this.selectedClassTest)
    if((+this.marks) <= (+this.selectedClassTest.maximum_marks)){
      //console.log(this.classTestList,this.selectedStudent)
      this.service.gradeClassTest({
        submission_id:this.selectedStudent.submission_id,
        marks:this.marks
      }).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_2(data['message'])
          
          this.selectedClassTest_studentList[this.selectedStudentIndex]['marks'] = this.marks
          this.selectedStudent = null;  
          this.marks = null;
          this.selectedStudentIndex =null;

        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      },()=>{
        modal.close('Ok click')
      })
    }
  }

  cancelModal(modal){
    //console.log('cancelled')
    this.marks = 0
    modal.dismiss('cancel click')
  }

  


}
