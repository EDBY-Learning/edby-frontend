import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-subjects-tab',
  templateUrl: './subjects-tab.component.html',
  styleUrls: ['./subjects-tab.component.scss']
})
export class SubjectsTabComponent implements OnInit {
  sub1: any;
  subject_list: any;
  
  constructor(private service: StudentsService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.service.subjectList==null){
      this.service.getSubjectList().subscribe((data)=>{
        if(data['status']=='success'){
          //console.log(data)
          this.service.subjectList = data['message']
          this.subject_list = data['message']
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.subject_list = this.service.subjectList
    }
  }

  goToHomework(class_){
    console.log('homework',class_)
    
    this.router.navigate(['../homework',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
    //this.router.navigate(['homework',{class:subject_.subject_name,section:subject_.section}])
  }

  goToClassTest(class_){
    this.router.navigate(['../class-test',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
  }

  classNotes(class_){
    this.router.navigate(['../notes',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
  }

  goToExam(class_){
    this.router.navigate(['../exam-center',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route})
  }

}
