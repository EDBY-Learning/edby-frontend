import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ExamManagerService {

  serverUrl = environment.baseUrl;

  selectedQuiz =null;
  unpublishedQuiz = null;
  publishedQuiz = null;
  studentSubmissionList = null;

  
  constructor(private httpClient: HttpClient) { }

  createQuiz(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/create_quiz/'}`,body_,options)
  }

  read_quiz_teacher(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/read_quiz_teacher/'}`,body_,options)
  }

  get_quiz_list_teacher(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/get_quiz_list_teacher/'}`,body_,options)
  }

  publish_quiz(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/publish_quiz/'}`,body_,options)
  }

  create_question(data,file_){

    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    if(file_){
      formData.append('file',file_,'filename')
    }
    formData.append('token',localStorage.getItem('authTokenSchool'))
    formData.append('data',JSON.stringify({'data': data}))
    
    return this.httpClient.post(`${this.serverUrl+'quiz/create_question/'}`,formData,options)
  }

  update_question(data,file_){

    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    
    if(file_){
      formData.append('file',file_,'filename')
    }
    formData.append('token',localStorage.getItem('authTokenSchool'))
    formData.append('data',JSON.stringify({'data': data}))
    
    return this.httpClient.post(`${this.serverUrl+'quiz/update_question/'}`,formData,options)
  }

  delete_quiz(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/delete_quiz/'}`,body_,options)
  }

  delete_question(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/delete_question/'}`,body_,options)
  }

  get_quiz_list_student(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/get_quiz_list_student/'}`,body_,options)
  }

  get_quiz_list_student_unpublished(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/get_quiz_list_student_unpublished/'}`,body_,options)
  }

  read_quiz_student(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/read_quiz_student/'}`,body_,options)
  }


  save_question_response(data,file_){

    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    
    if(file_){
      formData.append('file',file_,'filename')
    }
    formData.append('token',localStorage.getItem('authTokenSchool'))
    formData.append('data',JSON.stringify({'data': data}))
    
    return this.httpClient.post(`${this.serverUrl+'quiz/save_question_response/'}`,formData,options)
  }

  submit_quiz(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/submit_quiz/'}`,body_,options)
  }

  get_quiz_submission_list(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/get_quiz_submission_list/'}`,body_,options)
  }

  grade_quiz_all(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/grade_quiz_all/'}`,body_,options)
  }

  get_quiz_submission(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/get_quiz_submission/'}`,body_,options)
  }

  grade_subjective_question(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/grade_subjective_question/'}`,body_,options)
  }

  read_quiz_student_correct_answer(data){
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
    return this.httpClient.post(`${this.serverUrl+'quiz/read_quiz_student_correct_answer/'}`,body_,options)
  }


}
