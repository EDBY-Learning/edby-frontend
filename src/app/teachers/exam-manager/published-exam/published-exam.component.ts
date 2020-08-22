import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { TeachersService } from '../../teachers-service';
import { ExamManagerService } from 'src/app/services/exam-manager.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-published-exam',
  templateUrl: './published-exam.component.html',
  styleUrls: ['./published-exam.component.scss']
})
export class PublishedExamComponent implements OnInit {

  @Input() class_name;
  @Input() section;
  @Input() subject_id;
  @Input() subject_name;

  subjectList: any;
  unpublishedQuiz = [];
  publishedQuiz = [];

  selectedQuiz = null;

  studentList = []

  constructor(private router: Router,
    private route: ActivatedRoute,
    private examService: ExamManagerService,
    private sweetAlert: SwalAlertService) {
      
    }

  ngOnInit(): void {
    if(this.examService.publishedQuiz !=null){
      this.publishedQuiz = this.examService.publishedQuiz
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

  getStudentList(quiz){
    if((this.selectedQuiz==null) || (this.selectedQuiz?.quiz_id!=quiz.quiz_id)){
      this.selectedQuiz = quiz
      this.examService.get_quiz_submission_list({quiz_id:quiz.quiz_id}).subscribe((data)=>{
        if(data['status']=='success'){
          this.studentList = data['quiz_submission_list']
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{

    }
    

  }

  gradeQuiz(){
    this.sweetAlert.warning_2('Please wait while we grade quiz for you',5)
    this.examService.grade_quiz_all({quiz_id:this.selectedQuiz.quiz_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Graded quiz!!')
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
  }


  openPaperStudent(stud){
    this.router.navigate(['../../../../../view-answer-sheet',this.selectedQuiz.quiz_id,this.class_name,this.section,this.subject_id,this.subject_name,stud.student_id],{relativeTo:this.route})
  }

  viewQuiz(quiz){
    this.router.navigate(['../../../../../view-question-paper',quiz.quiz_id,this.class_name,this.section,this.subject_id,this.subject_name],{relativeTo:this.route})
  }

}
