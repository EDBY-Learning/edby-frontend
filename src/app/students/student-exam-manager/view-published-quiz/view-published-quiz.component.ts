import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamManagerService } from 'src/app/services/exam-manager.service';

@Component({
  selector: 'app-view-published-quiz',
  templateUrl: './view-published-quiz.component.html',
  styleUrls: ['./view-published-quiz.component.scss']
})
export class ViewPublishedQuizComponent implements OnInit {

  publishedQuiz = [];
  subject_id: any;
  class_name: any;
  section: any;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private examService:ExamManagerService) {
      this.subject_id = this.route.snapshot.params.subject_id
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
      
    }

  ngOnInit(): void {
    if(this.examService.publishedQuiz !=null){
      this.publishedQuiz = this.examService.publishedQuiz
    }else{
      this.examService.get_quiz_list_student({subject_id:this.subject_id}).subscribe((data)=>{
        if(data['status']=='success'){
          this.publishedQuiz = data['quiz_list']
        }else{
          console.log(data['message'])
        } 
      },(err)=>{
        console.log(err)
      })
    }
  }

  startTest(quiz){
    this.router.navigate(['../../../../ongoing-exam',quiz.quiz_summary.quiz_id,this.subject_id,this.class_name,this.section],{relativeTo:this.route});
  }

  viewTest(quiz){
    //view-answer-paper/:quiz_id/:class_name/:section/:subject_id
    this.router.navigate(['../../../../view-answer-paper',quiz.quiz_summary.quiz_id,this.subject_id,this.class_name,this.section],{relativeTo:this.route});
  }

}
