import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { SharedService } from '../shared-service';

@Component({
  selector: 'app-apply-for-demo',
  templateUrl: './apply-for-demo.component.html',
  styleUrls: ['./apply-for-demo.component.scss']
})
export class ApplyForDemoComponent implements OnInit {


  applicationForm : FormGroup= new FormGroup({
    name : new FormControl('',[Validators.required]),
    institute_name : new FormControl('',[Validators.required]),
    mob_no : new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    institute_type : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    designation : new FormControl('',[Validators.required]),
    
  });


  constructor( private router:Router,
    private sweetAlert: SwalAlertService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    this.sharedService.apply(this.applicationForm.value).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_3('Thank You!! We will contact You!',4)
        this.applicationForm.reset()
        this.router.navigate(['login'])
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
    
  }

  goToLogin(){
    this.router.navigate(['login'])
  }

}
