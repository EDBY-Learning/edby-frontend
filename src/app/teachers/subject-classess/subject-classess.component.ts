import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeachersService } from '../teachers-service';

@Component({
  selector: 'app-subject-classess',
  templateUrl: './subject-classess.component.html',
  styleUrls: ['./subject-classess.component.scss']
})
export class SubjectClassessComponent implements OnInit {

  classSubjectList;
  sub1;
  constructor(private service: TeachersService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.service.classSubjectList==null){
      this.service.getSubjectList().subscribe((data)=>{
        if(data['status']=='success'){
          //console.log(data)
          this.service.classSubjectList = data['message']
          this.classSubjectList = data['message']
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.classSubjectList = this.service.classSubjectList
    }
  }

  /*checkHomework(class_){
    this.router.navigate(['../check-homework',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
  }*/

  goToHomework(class_){
    //console.log('homework',class_)
    
    this.router.navigate(['../homework-mamagement',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
    //this.router.navigate(['homework',{class:class_.class_name,section:class_.section}])
  }

  goToExam(class_){
    this.router.navigate(['../manage-exam',class_.subject_id,class_.class_name,class_.section,class_.subject_name],{relativeTo:this.route});
  }


  manageClassTest(class_){
    this.router.navigate(['../class-test',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
  }

  createClassTest(class_){
    this.router.navigate(['../create-class-test',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
  }

  classNotes(class_){
    this.router.navigate(['../notes-for-subject',class_.subject_id,class_.class_name,class_.section],{relativeTo:this.route});
  }

  

  ngOnDestroy(){
    console.log('unsubscribed 12')
    //this.sub1.unsubscribe()
  }

}
