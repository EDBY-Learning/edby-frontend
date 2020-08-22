import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardService {

  serverUrl = environment.baseUrl;

  noticeIssued = null;
  noticeList = null;

  constructor(private httpClient: HttpClient) { }


  createNotice(data){
    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    if(data['file']!=null){
      formData.append('file',data['file'],'filename')
    }
    formData.append('token',localStorage.getItem('authTokenSchool'))
    //console.log(formData)
    for(let key in data){
      if(data[key]){
          if(key!='file'){
            //console.log(key,data[key])
            formData.append(key,data[key])
            //body_ = body_+'&'+key+'='+data[key]
          }
      }
    }
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'notice/create_notice/'}`,formData,options)
  }

  deleteNotice(data){
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
    return this.httpClient.post(`${this.serverUrl+'notice/delete_notice/'}`,body_,options)
  }

  publishNotice(data){
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
    return this.httpClient.post(`${this.serverUrl+'notice/publish_notice/'}`,body_,options)
  }

  updateNotice(data){
    let headers = new HttpHeaders();
    let options = {
        headers: headers,
        withCredentials:true
      }
    let formData:FormData = new FormData();
    if(data['file']!=null){
      formData.append('file',data['file'],'filename')
    }
    formData.append('token',localStorage.getItem('authTokenSchool'))
    //console.log(formData)
    for(let key in data){
      if(data[key]){
          if(key!='file'){
            //console.log(key,data[key])
            formData.append(key,data[key])
            //body_ = body_+'&'+key+'='+data[key]
          }
      }
    }
    //console.log(body_)
    return this.httpClient.post(`${this.serverUrl+'notice/update_notice/'}`,formData,options)
 
  }

  getCreatedNoticeList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'notice/get_issued_notice_list/'}`,body_,options)
  }

  getNoticeList(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers: headers,
        withCredentials:true
      }
    let body_ = 'token='+localStorage.getItem('authTokenSchool')
    
    return this.httpClient.post(`${this.serverUrl+'notice/get_notice_list/'}`,body_,options)
  }

}
