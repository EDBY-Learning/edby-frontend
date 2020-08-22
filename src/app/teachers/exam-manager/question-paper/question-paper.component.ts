import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { TeachersService } from '../../teachers-service';
import { ExamManagerService } from 'src/app/services/exam-manager.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.scss']
})
export class QuestionPaperComponent implements OnInit {
  
  singleChoiceOption = ['A','B','C','D']
  multipleChoiceOption = [['A'],['B'],['C'],['D'],
  ['A','B'],['A','C'],['A','D'],['B','C'],['B','D'],['C','D'],
  ['A','B','C'],['A','B','D'],['A','C','D'],
  ['B','C','D'],
  ['A','B','C','D']]

  quiz_id: any;
  selectedQuiz;
  delete =true

  question_number = 1
  fileToUpload: File[];
  fileSelected: any[];

  //class_quiz;

  @ViewChild('myFileInput') myFileInput;
  subject_id: any;
  class_name: any;
  section: any;
  subject_name: any;
  
  constructor(private route: ActivatedRoute,
    //private service: TeachersService,
    private router:Router,
    private examService: ExamManagerService,
    private sweetAlert: SwalAlertService) {}

  ngOnInit(): void {
    this.quiz_id = this.route.snapshot.params.quiz_id
    this.subject_id = this.route.snapshot.params.subject_id
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.subject_name = this.route.snapshot.params.subject_name
    if(this.examService.selectedQuiz?.quiz_summary.quiz_id == this.quiz_id){
      console.log('No need to fetch quiz data')
      this.selectedQuiz = this.examService.selectedQuiz
    }else{
      //fetch this quiz id quiz
      this.examService.read_quiz_teacher({quiz_id:this.quiz_id}).subscribe((data)=>{
        if(data['status']=='success'){
          console.log(data)
          this.selectedQuiz = data['message']
          this.fileToUpload = Array(this.selectedQuiz['question_list'].length).fill(null)
          this.fileSelected = Array(this.selectedQuiz['question_list'].length).fill(null)
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

  addQuestion(type_){
    let len = this.selectedQuiz.question_list.length
    this.question_number = len+1
    let temp;
    this.fileToUpload.push(null)
    this.fileSelected.push(null)
    
    if((type_ == 'scq') || (type_ == 'mcq')){
      temp = {
        "question_type":type_, 
        "question_text":'Type Your Question Here', "question_file":'', 'question_file_link':'',
        "marks":'5',
        'number':len+1,
        "option_list": [
        {"option_code": 'A', "option_text": 'Option A', "option_file":'' }, 
        {"option_code": 'B', "option_text": 'Option B', "option_file":'' },
        {"option_code": 'C', "option_text": 'Option C', "option_file":'' },
        {"option_code": 'D', "option_text": 'Option D', "option_file":'' }],
        "answer_list": ['A']
        }
    }else if((type_ == 'T/F') || (type_ == 'Fill')){
      temp = {
        "question_type":type_, 
        "question_text":'Type Your Question Here', "question_file":'', 'question_file_link':'',
        "marks":'5',
        'number':len+1,
        "option_list": [],
        "answer_list": ['True']
      }
    }else if(type_ == 'Detail'){
      temp = {
        "question_type":type_, 
        "question_text":'Type Your Question Here', 
        "question_file":'', 
        'question_file_link':'',
        "marks":'5',
        'number':len+1,
        "option_list": [],
        "answer_list": ['Fill Up']
      }
    }
    
    this.selectedQuiz.question_list.push(temp)
  }

  handleFileInput(files: FileList,num_) {
    this.fileToUpload[num_-1] = files[0];
    this.fileSelected[num_ - 1] = this.fileToUpload[num_-1]['name'];
    //console.log(this.fileToUpload)
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload[num_-1]);
    reader.onload = () => {
      this.selectedQuiz.question_list[num_-1].question_file_link = '';
      this.selectedQuiz.question_list[num_-1].question_file = reader.result;
    };
  }

  removeQuestionImage(num_){
    this.myFileInput.nativeElement.value = '';
    this.fileToUpload[num_-1] = null
    this.selectedQuiz.question_list[num_-1].question_file = '';
    this.selectedQuiz.question_list[num_-1].question_file_link = '';
    this.fileSelected[num_-1] = null;
  }

  getQuestionType(p){
    return this.selectedQuiz.question_list[p-1].question_type
  }

  createQuestion(num_){
    if(Array.isArray(this.selectedQuiz.question_list[num_-1].answer_list)){
      //pass
    }else{
      this.selectedQuiz.question_list[num_-1].answer_list = this.selectedQuiz.question_list[num_-1].answer_list.split(',')
    }
    console.log(this.selectedQuiz.question_list[num_-1])
    this.selectedQuiz.question_list[num_-1]['quiz_id'] = this.quiz_id
    this.examService.create_question(this.selectedQuiz.question_list[num_-1],this.fileToUpload[num_-1]).subscribe((data)=>{
      if(data['status']=='success'){
        this.selectedQuiz.question_list[num_-1]['question_id'] = data['id_list']['question_id']
        this.sweetAlert.success_2('Created Question!!')
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })

  }

  updateQuestion(num_){
    if(Array.isArray(this.selectedQuiz.question_list[num_-1].answer_list)){
      //pass
    }else{
      this.selectedQuiz.question_list[num_-1].answer_list = this.selectedQuiz.question_list[num_-1].answer_list.split(',')
    }
    console.log('save ',this.selectedQuiz.question_list[num_-1])
    this.selectedQuiz.question_list[num_-1]['quiz_id'] = this.quiz_id
    this.examService.update_question(this.selectedQuiz.question_list[num_-1],this.fileToUpload[num_-1]).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Updated Question!!')
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
  }

  deleteQuestion(num_,toDo){
    if(toDo=='remove'){
      this.question_number = num_- 1
      this.selectedQuiz.question_list.splice(num_-1,1)
      this.fileSelected.splice(num_-1,1)
      this.fileToUpload.splice(num_-1,1)
    }else{
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
          console.log(this.selectedQuiz.question_list[num_-1])
          this.examService.delete_question({question_id:this.selectedQuiz.question_list[num_-1].question_id}).subscribe((data)=>{
            if(data['status']=='success'){
              this.sweetAlert.success_2('Question Deleted!!')     
              this.question_number = num_- 1
              this.selectedQuiz.question_list.splice(num_-1,1)  
              this.fileSelected.splice(num_-1,1)
              this.fileToUpload.splice(num_-1,1)                
            }else{
              this.sweetAlert.failure(data['message'])
            }
          },(err)=>{
            this.sweetAlert.failure(err)
          })
        }
      })
    }

    
  
    
    //console.log('delete ',this.selectedQuiz.question_list[num_])
  }

  isIdPresent(num_){
    console.log(this.selectedQuiz.question_list[num_-1])
    return 'question_id' in this.selectedQuiz.question_list[num_-1]
  }

  goback(){
    this.router.navigate(['../../../../../../manage-exam',this.subject_id,this.class_name,this.section,this.subject_name],{relativeTo:this.route})
  }


  previewPaper(){
    this.delete = false
    this.examService.selectedQuiz = this.selectedQuiz
    this.router.navigate(['../../../../../../view-question-paper',this.quiz_id,this.class_name,this.section,this.subject_id,this.subject_name],{relativeTo:this.route})
  }

  ngOnDestroy(){
    if(this.delete){
      this.examService.selectedQuiz = null;
    }
  }

}
