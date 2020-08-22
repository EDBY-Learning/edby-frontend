import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamManagerService } from 'src/app/services/exam-manager.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-view-answer-sheet',
  templateUrl: './view-answer-sheet.component.html',
  styleUrls: ['./view-answer-sheet.component.scss']
})
export class ViewAnswerSheetComponent implements OnInit {
  quiz_id: any;
  subject_id: any;
  class_name: any;
  section: any;
  subject_name: any;
  student_id: any;
  selectedQuiz: any;
  question_number = 1

  questionsResponse = {}
  questionId_responseId = {}
  questionId_marks = {}
  response;
  new_mark;
  studentList: any;
  fileLink={};

  constructor(private route: ActivatedRoute,
    private router:Router,
    private examService: ExamManagerService,
    private sweetAlert: SwalAlertService) {
      this.quiz_id = this.route.snapshot.params.quiz_id
      this.subject_id = this.route.snapshot.params.subject_id
      this.class_name = this.route.snapshot.params.class_name
      this.section = this.route.snapshot.params.section
      this.subject_name = this.route.snapshot.params.subject_name
      this.student_id = this.route.snapshot.params.student_id
     }
  //:quiz_id/:class_name/:section/:subject_id/:subject_name/:student_id
  ngOnInit(): void {
    this.examService.read_quiz_teacher({quiz_id:this.quiz_id}).subscribe((data)=>{
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

    this.examService.get_quiz_submission({quiz_id:this.quiz_id,
      student_id:this.student_id}).subscribe((data)=>{
        if(data['status']=='success'){
          this.response = data['message']
          //console.log(this.response['response_list'].length)
          for(let i=0;i<this.response['response_list'].length;i++){
            this.questionsResponse[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['response_answer']
            this.questionId_responseId[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['response_id']
            this.questionId_marks[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['marks']
            this.fileLink[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['response_file_link']
          }
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })

      if(this.examService.studentSubmissionList == null){
        this.examService.get_quiz_submission_list({quiz_id:this.quiz_id}).subscribe((data)=>{
          if(data['status']=='success'){
            this.studentList = data['quiz_submission_list']
          }else{
            console.log(data['message'])
          }
        },(err)=>{
          console.log(err)
        })
      }else{
        this.studentList = this.examService.studentSubmissionList
      }
      
  }

  goback(){
    this.router.navigate(['../../../../../../../manage-exam',this.subject_id,this.class_name,this.section,this.subject_name],{relativeTo:this.route})
  }

  giveMarks(question_id){
    this.examService.grade_subjective_question({response_id:this.questionId_responseId[question_id],marks:this.new_mark}).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Updated Marks')
        this.questionId_marks[question_id]=this.new_mark
        this.new_mark = null
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
  }

  getStudentAnswersheet(id_){
    if((id_=='') || (id_==this.student_id)){
      //passed
    }else{
      this.examService.get_quiz_submission({quiz_id:this.quiz_id,
        student_id:id_}).subscribe((data)=>{
          if(data['status']=='success'){
            this.response = data['message']
            this.question_number = 1
            //console.log(this.response['response_list'].length)
            for(let i=0;i<this.response['response_list'].length;i++){
              this.questionsResponse[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['response_answer']
              this.questionId_responseId[this.response['response_list'][i]['question_id']] = this.response['response_list'][i]['response_id']
            }
          }else{
            this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          console.log(err)
        })
    }
  }

  ngOnDestroy(){
    this.examService.studentSubmissionList = null;
  }

}
