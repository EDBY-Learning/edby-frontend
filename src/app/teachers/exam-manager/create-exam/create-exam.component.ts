import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamManagerService } from 'src/app/services/exam-manager.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {

  @Input() class_name;
  @Input() section;
  @Input() subject_id;
  @Input() subject_name;


  quiz_form:FormGroup = new FormGroup({
    quiz_id : new FormControl('',[]),
    
    quiz_heading : new FormControl('',[Validators.required]),
    marks : new FormControl('',[Validators.required]),
    quiz_type : new FormControl('',[Validators.required]),
    duration : new FormControl('',[Validators.required]),
    start_dt: new FormControl('',[Validators.required]),
  })

  type_of_quiz =['Exam','Quiz','Class Test']

  minDate: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private examService: ExamManagerService,
    private sweetAlert: SwalAlertService) { 
      this.minDate = new Date()
      this.minDate.setDate(this.minDate.getDate()+1);
    }

  ngOnInit(): void {
    
    
  }


  OnSubmit(){
    let temp_ =this.quiz_form.value
    temp_['subject_id'] = this.subject_id
    temp_['duration'] = temp_['duration']*60
    temp_['start_dt'] = new Date(temp_['start_dt']).toISOString()
    this.examService.createQuiz(temp_).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Quiz Created')
        /*this.examService.selectedQuiz = {}
        this.examService.selectedQuiz['quiz_summary'] = temp_
        this.examService.selectedQuiz['question_list'] = []
        this.examService.selectedQuiz['quiz_summary']['quiz_id'] = data['quiz_id']
        this.examService.unpublishedQuiz = null;*/
        this.router.navigate(['../../../../../question-paper',data['quiz_id'],this.class_name,this.section,this.subject_id,this.subject_name],{relativeTo:this.route});    
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
    
    

    
    
  }

  ngOnDestroy(){
    //this.service.selectedQuiz = null;
  }

}
