import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamManagerService } from 'src/app/services/exam-manager.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-view-answer-paper',
  templateUrl: './view-answer-paper.component.html',
  styleUrls: ['./view-answer-paper.component.scss']
})
export class ViewAnswerPaperComponent implements OnInit {
  quiz_id: any;
  subject_id: any;
  class_name: any;
  section: any;
  selectedQuiz: any;
  response: any;
  questionsResponse = {};
  question_number = 1;
  questionId_marks = {};
  fileLink = {}

  constructor(private route: ActivatedRoute,
    private router:Router,
    private examService: ExamManagerService,
    private sweetAlert: SwalAlertService) {
      this.quiz_id = this.route.snapshot.params.quiz_id
      this.subject_id = this.route.snapshot.params.subject_id
      this.class_name = this.route.snapshot.params.class_name
      this.section = this.route.snapshot.params.section
      
     }

  ngOnInit(): void {

    this.examService.read_quiz_student_correct_answer({quiz_id:this.quiz_id}).subscribe((data)=>{
      if(data['status']=='success'){
        //console.log(data)
        this.selectedQuiz = data['message']
        /*for(let i =0;i<this.selectedQuiz['question_list'].length;i++){
          if(this.selectedQuiz['question_list'][i]['question_type']=='mcq'){
            let temp_=  []
            for(let j=0;j<4;j++){
              if(this.selectedQuiz['question_list'][i]['answer_list'][j]!=''){
                temp_.push(this.selectedQuiz['question_list'][i]['answer_list'][j])
              }
            }
            this.selectedQuiz['question_list'][i]['answer_list'] = temp_
            
          }
        }*/
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    })

    this.examService.get_quiz_submission({quiz_id:this.quiz_id}).subscribe((data)=>{
        if(data['status']=='success'){
          this.response = data['message']
          //console.log(this.response['response_list'])
          for(let i=0;i<this.response['response_list'].length;i++){
            //console.log(this.response['response_list'][i]['question_id'])
            //console.log(this.response['response_list'][i]['response_answer'])
            this.questionsResponse[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['response_answer']
            this.questionId_marks[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['marks']
            this.fileLink[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['response_file_link']
          }
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
  }


  goback(){
    this.router.navigate(['../../../../../exam-center',this.subject_id,this.class_name,this.section],{relativeTo:this.route});
  }

}
