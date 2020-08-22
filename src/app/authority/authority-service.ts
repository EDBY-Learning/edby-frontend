import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import { SwalAlertService } from '../services/swal-alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  
  serverUrl = environment.baseUrl;

  authorityList = null;
  teacherList = null;
  studentList = null;
  slotList = null;
  classList = null;
  profileData = null;
  private SelectedAuthorityData = null;
  private SelectedTeacherData = null;
  dashBoardData = null;

  
  constructor(private httpClient: HttpClient,
              private router:Router,
              private sweetAlert: SwalAlertService) { }

  getAuthorityData(){
    return this.SelectedAuthorityData;
  }

  setSelectedAuthority(data){
    this.SelectedAuthorityData = data;
  }

  getTeacherData(){
    return this.SelectedTeacherData;
  }

  setSelectedTeacher(data){
    this.SelectedTeacherData = data;
  }

  registerAuthority(data){
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
    return this.httpClient.post(`${this.serverUrl+'authority/create_new_authority/'}`,body_,options)
  }

  updateAuthority(data){
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
    return this.httpClient.post(`${this.serverUrl+'authority/update_authority_info/'}`,body_,options)
  }

  getSelfData(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'authority/get_authority_summary_self/'}`,body_,options)
  }

  getAuthorityList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'authority/get_authority_list/'}`,body_,options)
  }

  registerTeacher(data){
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
    return this.httpClient.post(`${this.serverUrl+'teacher/create_new_teacher/'}`,body_,options)
  }
  updateTeacher(data){
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

  getTeacherList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'authority/get_teacher_list/'}`,body_,options)
  }


  getClassList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    return this.httpClient.post(`${this.serverUrl+'authority/get_class_list/'}`,body_,options)
  }

  getAllStudent(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    return this.httpClient.post(`${this.serverUrl+'authority/get_entire_student_list/'}`,body_,options)
  }

  registerNewStudent(data){
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

  updateSlots(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let options = {
        headers: headers,
        withCredentials:true
      }
    //let body_ = 'token='+localStorage.getItem('authTokenSchool')
    data['token'] = localStorage.getItem('authTokenSchool')
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'authority/create_or_update_slot/'}`,data,options)
  }

  getSlots(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    return this.httpClient.post(`${this.serverUrl+'authority/get_slot_list/'}`,body_,options)
  }
  
  getClassTimetable(data){
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
    return this.httpClient.post(`${this.serverUrl+'authority/get_schedule_list/'}`,body_,options)
  }

  getDashboardData(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'authority/get_authority_dashboard/'}`,body_,options)
  }

  get_dashboard_summary(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'authority/get_dashboard_summary/'}`,body_,options)
  }

  get_dashboard_class_details(data){
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
    return this.httpClient.post(`${this.serverUrl+'authority/get_dashboard_class_details/'}`,body_,options)
  }

  get_dashboard_student_details(data){
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
    return this.httpClient.post(`${this.serverUrl+'authority/get_dashboard_student_details/'}`,body_,options)
  }


  

}
