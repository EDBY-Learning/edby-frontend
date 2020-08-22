import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import { SwalAlertService } from '../services/swal-alert.service';


@Injectable({
  providedIn: 'root'
})

export class SharedService {
  
    serverUrl = environment.baseUrl;
  
    constructor(private httpClient: HttpClient,
                private router:Router,
                private sweetAlert: SwalAlertService) { }
    
    changePassword(data){
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
        return this.httpClient.post(`${this.serverUrl+'core/change_password/'}`,body_,options)
    }

    apply(data){
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
        return this.httpClient.post(`${this.serverUrl+'applicant/apply_for_demo/'}`,body_,options)
        
    }

    changeStudentPassword(data){
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
        return this.httpClient.post(`${this.serverUrl+'teacher/reset_student_password/'}`,body_,options)
    }

    changeTeacherPassword(data){
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
        return this.httpClient.post(`${this.serverUrl+'authority/reset_teacher_password/'}`,body_,options)
    }
    

}