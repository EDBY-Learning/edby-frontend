import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamManagerService } from 'src/app/services/exam-manager.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ongoing-exam',
  templateUrl: './ongoing-exam.component.html',
  styleUrls: ['./ongoing-exam.component.scss']
})
export class OngoingExamComponent implements OnInit {


  

  quiz_id: any;
  selectedQuiz;

  question_number = 1
  fileToUpload: File[];
  fileSelected: any[];
  @ViewChild('myFileInput') myFileInput;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sweetAlert: SwalAlertService,
    private examService:ExamManagerService) { }

  ngOnInit(): void {
    this.quiz_id = this.route.snapshot.params.quiz_id
    this.examService.read_quiz_student({quiz_id:this.quiz_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.selectedQuiz = data['message']
        this.fileToUpload = Array(this.selectedQuiz['question_list'].length).fill(null)
          this.fileSelected = Array(this.selectedQuiz['question_list'].length).fill(null)
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
  }

  endExam(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.value) {
        
        this.examService.submit_quiz({quiz_id:this.quiz_id}).subscribe((data)=>{
          if(data['status']=='success'){
            this.sweetAlert.success_2('Submission Done!!')     
            this.router.navigate(['../../../../../subjects'],{relativeTo:this.route});     
          }else{
            this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          this.sweetAlert.failure(err)
        })
      }
    })
    
  }

  handleFileInput(files: FileList,num_) {
    this.fileToUpload[num_-1] = files[0];
    this.fileSelected[num_ - 1] = this.fileToUpload[num_-1]['name'];
    //console.log(this.fileToUpload)
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload[num_-1]);
    reader.onload = () => {
      this.selectedQuiz.question_list[num_-1].response_file_link = '';
      this.selectedQuiz.question_list[num_-1].response_file = reader.result;
    };
  }

  removeQuestionImage(num_){
    this.myFileInput.nativeElement.value = '';
    this.fileToUpload[num_-1] = null
    this.selectedQuiz.question_list[num_-1].response_file = '';
    this.selectedQuiz.question_list[num_-1].response_file_link = '';
    this.fileSelected[num_-1] = null;
  }

  submitAnswer(num_){
    if(this.selectedQuiz.question_list[num_-1].question_type == 'mcq'){
      let temp_ = []
      for(let i=0;i<4;i++){
        if(this.selectedQuiz.question_list[num_-1].answer_list[i]){
          if(i==0){
            temp_.push('A')
          }else if(i==1){
            temp_.push('B')
          }else if(i==2){
            temp_.push('C')
          }else if(i==3){
            temp_.push('D')
          }
        }else{
          temp_.push('')
        }
      }
      this.selectedQuiz.question_list[num_-1].answer_list = temp_
      //console.log(temp_)
    }
    this.examService.save_question_response({question_id:this.selectedQuiz.question_list[num_-1].question_id,
      response_answer_list:this.selectedQuiz.question_list[num_-1].answer_list},
      this.fileToUpload[num_-1]).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Submitted !!')
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
  }

  goToSubject(){
    this.router.navigate(['../../../../../subjects'],{relativeTo:this.route})
  }

}
