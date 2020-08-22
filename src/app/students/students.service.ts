import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import { interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class StudentsService{
  
  serverUrl = environment.baseUrl;
  
  slotList=null;
  studentTimetable = null;
  profileData = null;
  subjectList = null;

  ongoingClass = false;
  question={
    'option1': null,
    'option2':null
  }

  selectedBarExam = 0;
  //selectedQuiz;
  studentDashboardDetail = null;



  constructor(private httpClient: HttpClient,
    private router:Router) { }

  startAttendence(){
      return interval(20000)
  }

  get_schedule_list(){
      let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            headers: headers,
            withCredentials:true
          }
        let body_ = 'token='+localStorage.getItem('authTokenSchool')
        
        return this.httpClient.post(`${this.serverUrl+'student/get_schedule_list/'}`,body_,options)
  }

  getSlots(){
      let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            headers: headers,
            withCredentials:true
          }
        let body_ = 'token='+localStorage.getItem('authTokenSchool')
        
        return this.httpClient.post(`${this.serverUrl+'student/get_slot_list/'}`,body_,options)
  }
  
  updateAttendence(data){
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
        
        return this.httpClient.post(`${this.serverUrl+'student/update_attendance/'}`,body_,options)
    }

    getSelfData(){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            headers: headers,
            withCredentials:true
          }
        let body_ = 'token='+localStorage.getItem('authTokenSchool')
        
        return this.httpClient.post(`${this.serverUrl+'student/get_student_summary_self/'}`,body_,options)
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
        
        return this.httpClient.post(`${this.serverUrl+'student/update_student_info/'}`,body_,options)
    }

    getSubjectList(){
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
      let options = {
          headers: headers,
          withCredentials:true
        }
      let body_ = 'token='+localStorage.getItem('authTokenSchool')
      
      return this.httpClient.post(`${this.serverUrl+'student/get_subject_list/'}`,body_,options)
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

  create_update_homework_submission(data){
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
    return this.httpClient.post(`${this.serverUrl+'homework/create_or_update_homework_submission/'}`,formData,options)
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

  classTest_submission(data){
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
    return this.httpClient.post(`${this.serverUrl+'class_test/create_or_submit_class_test_submission/'}`,formData,options)
  }

  startClasstest(data){
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
    return this.httpClient.post(`${this.serverUrl+'class_test/create_or_submit_class_test_submission/'}`,body_,options)
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

  get_dashboard_student_details(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'student/get_dashboard_student_details/'}`,body_,options)
  }

  



}

