import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  
  serverUrl = environment.baseUrl;

  private profileDetails;
  private SelectedStudentData;

  dashBoardData = null;

  selectedBar = 0;
  selectedBarExam = 0;

  teacherTimetable = null;  
  subjectList = null;
  homeworkList = null;
  classSubjectList = null;
  subjectLinksList = null;
  slotList = null;

  classTimetable = null;
  classStudentList = null;
  teacherListClass = null;

  teacherSelfInfo =null;



  loadQuiz = {
    "quiz_summary": {
    "quiz_id": 1, 
    "quiz_heading": 'Fetched 1', 
    "quiz_type": 'Exam',
    'subject_id':2, 
    "duration":60 , 
    "start_dt": 'Jun 15, 2015, 9:03:01 AM', 
    "last_edit_dt": ''}, 
    "question_list": [
        {
        "question_id":1,
        "question_type":'MCQ', 
        "question_text":'Temp1', "question_file":'', 
        "marks":'5',
        'number':1,
        "option_list": [
        {"option_id": 1,"option_code": 'A', "option_text": 'answer1', "option_file":'' }, 
        {"option_id": 2,"option_code": 'B', "option_text": 'answer2', "option_file":'' },
        {"option_id": 3,"option_code": 'C', "option_text": 'answer3', "option_file":'' },
        {"option_id": 4,"option_code": 'D', "option_text": '', "option_file":'' }],
        "answer_list": ["A","C"]
        }, 
        {
          "question_id":2,
        "question_type":'SCQ', 
        "question_text":'Temp2', "question_file":'', 
        "marks":'5',
        'number':2,
        "option_list": [
        {"option_id": 1,"option_code": 'A', "option_text": 'answer1', "option_file":'' }, 
        {"option_id": 2,"option_code": 'B', "option_text": 'answer2', "option_file":'' },
        {"option_id": 3,"option_code": 'C', "option_text": 'answer3', "option_file":'' },
        {"option_id": 4,"option_code": 'D', "option_text": '', "option_file":'' }],
        "answer_list": []
        }, 
        {
          "question_id":3,
        "question_type":'T/F', 
        "question_text":'Temp3', "question_file":'', 
        "marks":'5',
        'number':3,
        "option_list": [],
        "answer_list": ["True"]
        }, 
        {
          "question_id":4,
        "question_type":'Fill', 
        "question_text":'Temp4', "question_file":'', 
        "marks":'5',
        'number':4,
        "option_list": [],
        "answer_list": ["Fill up"]
        }, 
        {
          "question_id":5,
        "question_type":'MCQ', 
        "question_text":'Temp1', "question_file":'https://i.stack.imgur.com/hu4I6.jpg', 
        "marks":'5',
        'number':5,
        "option_list": [
        {"option_id": 1,"option_code": 'A', "option_text": 'answer1', "option_file":'https://i.stack.imgur.com/hu4I6.jpg' }, 
        {"option_id": 2,"option_code": 'B', "option_text": 'answer2', "option_file":'' },
        {"option_id": 3,"option_code": 'C', "option_text": 'answer3', "option_file":'https://i.stack.imgur.com/hu4I6.jpg' },
        {"option_id": 4,"option_code": 'D', "option_text": 'answer4', "option_file":'' }],
        "answer_list": ["A","C"]
        }, 
        {
          "question_id":6,
        "question_type":'SCQ', 
        "question_text":'Temp2', "question_file":'https://i.stack.imgur.com/hu4I6.jpg', 
        "marks":'5',
        'number':6,
        "option_list": [
        {"option_id": 1,"option_code": 'A', "option_text": 'answer1', "option_file":'https://i.stack.imgur.com/hu4I6.jpg' }, 
        {"option_id": 2,"option_code": 'B', "option_text": 'answer2', "option_file":'' },
        {"option_id": 3,"option_code": 'C', "option_text": 'answer3', "option_file":'https://i.stack.imgur.com/hu4I6.jpg' },
        {"option_id": 4,"option_code": 'D', "option_text": 'answer4', "option_file":'' }],
        "answer_list": ["A"]
        }, 
        {
          "question_id":7,
        "question_type":'T/F', 
        "question_text":'Temp3', "question_file":'https://i.stack.imgur.com/hu4I6.jpg', 
        "marks":'5',
        'number':7,
        "option_list": [],
        "answer_list": ["True"]
        }, 
        {
          "question_id":8,
        "question_type":'Fill', 
        "question_text":'Temp4', "question_file":'https://i.stack.imgur.com/hu4I6.jpg', 
        "marks":'5',
        'number':8,
        "option_list": [],
        "answer_list": ["Fill up"]
        }, 
        {
          "question_id":8,
        "question_type":'Detail', 
        "question_text":'answer in brief', "question_file":'https://i.stack.imgur.com/hu4I6.jpg', 
        "marks":'5',
        'number':9,
        "option_list": [],
        "answer_list": ['']
        }, 
    ]
    }



  filesToUpload:any[] = [];

  constructor(private httpClient: HttpClient,
              private router:Router) { }

  setProfileData(data){
    this.profileDetails = data;
  }
  
  getProfileData(){
    return this.profileDetails;
  }

  getStudentData(){
    return this.SelectedStudentData;
  }

  setSelectedStudent(data){
    this.SelectedStudentData = data;
  }
  
  getSelfData(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_teacher_summary_self/'}`,body_,options)
  }

  generate_subject_links(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/generate_subject_links/'}`,body_,options)
  }


  addStudent(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'student/create_new_student/'}`,body_,options)
  }

  updateStudent(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'student/update_student_info/'}`,body_,options)
  }

  getStudents(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_student_list/'}`,body_,options)
  }

  updateSelfData(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'teacher/update_teacher_info/'}`,body_,options)
  }

  getSlots(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_slot_list/'}`,body_,options)
  }

  get_schedule_list(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_schedule_list/'}`,body_,options)
  }

  getTeachersList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_teacher_list/'}`,body_,options)
  }

  getClassSubjectList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_class_subject_list/'}`,body_,options)
  }

  registerSubject(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'teacher/create_or_update_subject_by_teacher/'}`,body_,options)
  }

  updateTimeTable(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let options = {
        headers: headers,
        withCredentials:true
      }
    //let body_ = 'token='+localStorage.getItem('authTokenSchool')
    data['token'] = localStorage.getItem('authTokenSchool')
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'teacher/create_or_update_schedule/'}`,data,options)
  }

  get_teacher_schedule_list(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_schedule_list_for_teacher/'}`,body_,options)
  }

  getClassTeacherDashboardData(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_class_teacher_dashboard/'}`,body_,options)
  }

  getTeacherDashboardData(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_teacher_dashboard/'}`,body_,options)
  }

  getSubjectList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_subject_list/'}`,body_,options)
  }

  create_update_homework(data){
    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    formData.append('file',data['file'],'filename')
    formData.append('token',localStorage.getItem('authTokenSchool'))
    for(let key in data){
      if(data[key]){
          if(key!='file'){
            //console.log(key,data[key])
            formData.append(key,data[key])
            //body_ = body_+'&'+key+'='+data[key]
          }
      }
    }
    return this.httpClient.post(`${this.serverUrl+'homework/create_or_update_homework/'}`,formData,options)
  }

  

  getHomework(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'homework/get_homework_list/'}`,body_,options)
  }
  
  create_update_classtest(data){
    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    formData.append('file',data['file'],'filename')
    formData.append('token',localStorage.getItem('authTokenSchool'))
    for(let key in data){
      if(data[key]){
          if(key!='file'){
            //console.log(key,data[key])
            formData.append(key,data[key])
            //body_ = body_+'&'+key+'='+data[key]
          }
      }
    }
    return this.httpClient.post(`${this.serverUrl+'class_test/create_or_update_class_test/'}`,formData,options)
  }

  

  getClasstest(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'class_test/get_class_test_list/'}`,body_,options)
  }

  getHomeworkSubmission(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'homework/get_homework_submission_list_for_homework/'}`,body_,options)
  }

  approveClassTest(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'class_test/publish_class_test/'}`,body_,options)
  }

  approveHomwork(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'homework/publish_homework/'}`,body_,options)
  }

  gradeHomework(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'homework/grade_homework_submission/'}`,body_,options)
  }

  get_classTest_submission(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'class_test/get_class_test_submission_list_for_class_test/'}`,body_,options)
  }

  gradeClassTest(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    return this.httpClient.post(`${this.serverUrl+'class_test/grade_class_test_submission/'}`,body_,options)
  }


  getNotesList(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
      if(data[key]){
          body_ = body_+'&'+key+'='+data[key]
      }
    }
    return this.httpClient.post(`${this.serverUrl+'notes/get_notes_list/'}`,body_,options)
  }

  uploadNotes(data){
    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    formData.append('file',data['file'],'filename')
    formData.append('token',localStorage.getItem('authTokenSchool'))
    for(let key in data){
      if(data[key]){
          if(key!='file'){
            //console.log(key,data[key])
            formData.append(key,data[key])
            //body_ = body_+'&'+key+'='+data[key]
          }
      }
    }
    return this.httpClient.post(`${this.serverUrl+'notes/create_or_update_notes/'}`,formData,options)
  }

  get_dashboard_class_details_for_ct(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_dashboard_class_details_for_ct/'}`,body_,options)
  }

  get_dashboard_student_details_for_ct(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
      if(data[key]){
          body_ = body_+'&'+key+'='+data[key]
      }
    }
    return this.httpClient.post(`${this.serverUrl+'teacher/get_dashboard_student_details_for_ct/'}`,body_,options)
  }

  get_dashboard_subject_list(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'teacher/get_dashboard_subject_list/'}`,body_,options)
  
  }

  get_dashboard_subject_details(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
      if(data[key]){
          body_ = body_+'&'+key+'='+data[key]
      }
    }
    return this.httpClient.post(`${this.serverUrl+'teacher/get_dashboard_subject_details/'}`,body_,options)
  }

  set_alternate_link(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    for(let key in data){
        if(data[key]){
            body_ = body_+'&'+key+'='+data[key]
        }
    }
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'teacher/set_alternate_link/'}`,body_,options)
  }

}
