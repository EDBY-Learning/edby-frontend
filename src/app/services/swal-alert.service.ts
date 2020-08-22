import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {

  constructor() { }

  success(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  failure(err){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: err,
      showConfirmButton: false,
      timer: 1500
    })
  }

  warning(err){
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: err,
      showConfirmButton: false,
      timer: 1500
    })
  }

  warning_2(err,time){
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: err,
      showConfirmButton: false,
      timer: time*1000
    })
  }

  login(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'You are logged in, Please wait while we prepare your dashboard',
      showConfirmButton: false,
      timer: 1500
    })
  }

  success_2(text){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  success_3(text,time){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: time*1000
    })
  }

}
