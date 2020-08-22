import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { TeachersService } from '../../teachers-service';
import { ExamManagerService } from 'src/app/services/exam-manager.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-unpublished-exam',
  templateUrl: './unpublished-exam.component.html',
  styleUrls: ['./unpublished-exam.component.scss']
})
export class UnpublishedExamComponent implements OnInit {

  @Input() class_name;
  @Input() section;
  @Input() subject_id;
  @Input() subject_name;
  
  unpublishedQuiz = [];
  publishedQuiz = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private examService: ExamManagerService,
    private sweetAlert: SwalAlertService) {
      
    }

  ngOnInit(): void {
    if(this.examService.unpublishedQuiz !=null){
      this.unpublishedQuiz = this.examService.unpublishedQuiz
    }else{
      this.examService.get_quiz_list_teacher({subject_id:this.subject_id}).subscribe((data)=>{
        if(data['status']=='success'){
          for(let i=0;i<data['quiz_list'].length;i++){
            if(data['quiz_list'][i]['quiz_summary']['is_published']){
              this.publishedQuiz.push(data['quiz_list'][i]['quiz_summary'])
            }else{
              this.unpublishedQuiz.push(data['quiz_list'][i]['quiz_summary'])
            }
          }
          this.examService.unpublishedQuiz = this.unpublishedQuiz
          this.examService.publishedQuiz = this.publishedQuiz
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log()
      })
    }
  }

  formatDuration(value){
    let time = value.split('T')[1].split('H')[0]+':'
      time = time + value.split('H')[1].split('M')[0] + ':'
      time = time + value.split('M')[1].split('S')[0]
      return  time;
  }

  editQuiz(quiz){
    this.router.navigate(['../../../../../question-paper',quiz.quiz_id,this.class_name,this.section,this.subject_id,this.subject_name],{relativeTo:this.route})
  }

  viewQuiz(quiz){
    this.router.navigate(['../../../../../view-question-paper',quiz.quiz_id,this.class_name,this.section,this.subject_id,this.subject_name],{relativeTo:this.route})
  }

  publishQuiz(quiz,index_){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Publish it!'
    }).then((result) => {
      if (result.value) {
        this.examService.publish_quiz({quiz_id:quiz.quiz_id}).subscribe((data)=>{
          if(data['status']=='success'){
            this.sweetAlert.success_2('Quiz Published!!')
            //console.log(this.unpublishedQuiz);
            this.unpublishedQuiz[index_]['is_published'] =true
            this.unpublishedQuiz.splice(index_,1)
            //console.log(this.unpublishedQuiz);
            
            this.examService.publishedQuiz.push(quiz)
            this.examService.unpublishedQuiz = this.unpublishedQuiz         
          }else{
            this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          this.sweetAlert.failure(err)
        })
      }
    })

  }


  deleteQuiz(quiz,index_){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.value) {
        this.examService.delete_quiz({quiz_id:quiz.quiz_id}).subscribe((data)=>{
          if(data['status']=='success'){
            this.sweetAlert.success_2('Quiz Deleted!!')
            this.unpublishedQuiz.splice(index_,1)
            this.examService.unpublishedQuiz = this.unpublishedQuiz         
          }else{
            this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          this.sweetAlert.failure(err)
        })
      }
    })
  }


    

}
