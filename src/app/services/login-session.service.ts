import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginSessionService {
  
  serverUrl = environment.baseUrl;

  name;
  school;
  user_id;
  user_type;
  username;

  constructor(private httpClient: HttpClient,
    private router:Router) { }

  loginUser(data){
    /*let csrf = this.getCookie('XSRF-TOKEN')
    let head_ = this.getCookie('X-XSRF-TOKEN')
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('csrftoken', csrf);
    let body_ = 'username='+data.username+'&password='+data.password
    //const request = new HttpRequest('POST',`${this.serverUrl+'core/login/'}`,body_,{headers:headers})
    
    //return this.httpClient.post(`${this.serverUrl+'core/login/'}`,data,requestOptions)
    return this.httpClient.request('POST',`${this.serverUrl+'core/login/'}`,{responseType:'json',body:body_,withCredentials:true,headers:headers})
    //return this.httpClient.request(request)*/
    let body_ = 'username='+data.username+'&password='+data.password
    

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    //headers = headers.set('Access-Control-Allow-Origin', this.serverUrl.toString());
    //headers = headers.set("Access-Control-Allow-Methods", "OPTIONS, POST")
    //headers = headers.set('Cookies', temp_1);

    let options = {
      headers: headers,
      withCredentials:true
    }
    return this.httpClient.post(`${this.serverUrl+'core/login_new/'}`,body_,options)
  }

  logoutUser(){
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    
    let options = {
      headers: headers,
      withCredentials:true
    }
    return this.httpClient.post(`${this.serverUrl+'core/logout_new/'}`,body_,options)
    //return this.httpClient.request('GET',`${this.serverUrl+'core/logout/'}`,{responseType:'json',withCredentials:true})
  }


  setData(data){
    localStorage.setItem('userInfoOnlineSchool', JSON.stringify(data));
    this.name = data.name
    this.school = data.school
    this.user_id = data.user_id
    this.user_type = data.user_type
    this.username = data.username
    localStorage.setItem('user_typeOnlineSchool',this.user_type)
    this.routeToCorrectUrl()
  }

  onlySetData(data){
    localStorage.setItem('userInfoOnlineSchool', JSON.stringify(data));
    this.name = data.name
    this.school = data.school
    this.user_id = data.user_id
    this.user_type = data.user_type
    this.username = data.username
    localStorage.setItem('user_typeOnlineSchool',this.user_type)
  }

  routeToCorrectUrl(){
    if(this.user_type=='authority'){
      this.router.navigate(['authority'])
    }else if(this.user_type == 'student'){
      this.router.navigate(['student'])
    }else if((this.user_type == 'teacher')|| (this.user_type == 'class_teacher')){
      this.router.navigate(['teacher'])
    }else{
      this.router.navigate(['login'])
    }
  }

  getCookie(temp){
    /*let csrf = this.cookieService.get(temp);
    if (typeof(csrf) === 'undefined') {
      csrf = '';
    }
    return csrf*/
  }

  pingServer(){
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    
    let options = {
      headers: headers,
      withCredentials:true
    }
    return this.httpClient.post(`${this.serverUrl+'core/check_login_with_token/'}`,body_,options)
  }

  

}
