import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { TeachersService } from '../../teachers-service';
import { ExamManagerService } from 'src/app/services/exam-manager.service';

@Component({
  selector: 'app-view-question-paper',
  templateUrl: './view-question-paper.component.html',
  styleUrls: ['./view-question-paper.component.scss']
})
export class ViewQuestionPaperComponent implements OnInit {

  quiz_id: any;
  selectedQuiz;

  question_number = 1
  subject_id: any;
  class_name: any;
  section: any;
  subject_name: any;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private examService: ExamManagerService,) { 
      this.quiz_id = this.route.snapshot.params.quiz_id
      this.subject_id = this.route.snapshot.params.subject_id
      this.class_name = this.route.snapshot.params.class_name
      this.section = this.route.snapshot.params.section
      this.subject_name = this.route.snapshot.params.subject_name
    }

  ngOnInit(): void {
    
    if(this.examService.selectedQuiz?.quiz_summary.quiz_id == this.quiz_id){
      console.log('No need to fetch quiz data')
      this.selectedQuiz = this.examService.selectedQuiz
    }else{
      //fetch this quiz id quiz
      //this.selectedQuiz = this.examService.loadQuiz
      this.examService.read_quiz_teacher({quiz_id:this.quiz_id}).subscribe((data)=>{
        if(data['status']=='success'){
          console.log(data)
          this.selectedQuiz = data['message']
          for(let i =0;i<this.selectedQuiz['question_list'].length;i++){
            if(this.selectedQuiz['question_list'][i]['question_type']=='mcq'){
              let temp_=  []
              for(let j=0;j<4;j++){
                if(this.selectedQuiz['question_list'][i]['answer_list'][j]!=''){
                  temp_.push(this.selectedQuiz['question_list'][i]['answer_list'][j])
                }
              }
              this.selectedQuiz['question_list'][i]['answer_list'] = temp_
              
            }
          }
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }
  }

  goback(){
    this.router.navigate(['../../../../../../manage-exam',this.subject_id,this.class_name,this.section,this.subject_name],{relativeTo:this.route})
  }


  editPaper(){
    this.examService.selectedQuiz = this.selectedQuiz
    this.router.navigate(['../../../../../../question-paper',this.quiz_id,this.class_name,this.section,this.subject_id,this.subject_name],{relativeTo:this.route})
  }

}
