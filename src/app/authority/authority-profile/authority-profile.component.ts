import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { AuthorityService } from '../authority-service';

@Component({
  selector: 'app-authority-profile',
  templateUrl: './authority-profile.component.html',
  styleUrls: ['./authority-profile.component.scss']
})
export class AuthorityProfileComponent implements OnInit {

  profileData;

  profileForm:FormGroup = new FormGroup({
    authority_id: new FormControl('',[]),
    school_id: new FormControl('',[]),
    school_name: new FormControl('',[]),
    
    name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.email]),
    mob_no : new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[1-9][0-9]{9}$")]),
    designation:new FormControl('',[Validators.required]),
    power_level : new FormControl('',[]),
    addr : new FormControl('',[]),
    city : new FormControl('',[]),
    state : new FormControl('',[]),
    nation : new FormControl('',[]),
    pincode : new FormControl('',[])
  })

  constructor(private router:Router,
              private service:AuthorityService,
              private route: ActivatedRoute,
              private sweetAlert: SwalAlertService) { }

  ngOnInit(): void {
    
    if(this.service.profileData ==null){
      this.service.getSelfData().subscribe((data)=>{
        //console.log(data)
        if(data['status'] == 'success'){
          this.profileData = data['message']
          this.service.profileData = this.profileData
          this.profileForm.patchValue({
            name:this.profileData.authority_name,
            email:this.profileData.email,
            mob_no:this.profileData.mob_no,
            designation:this.profileData.designation,
            //power_level:this.profileData.power_level,
            addr:this.profileData.addr,
            city:this.profileData.city,
            state:this.profileData.state,
            nation:this.profileData.nation,
            pincode:this.profileData.pincode,
  
            authority_id: this.profileData.authority_id,
            school_id: this.profileData.school_id,
            school_name: this.profileData.school_name,
          })
        }else{
          this.sweetAlert.failure('Not Able to load data')
        }
      })
    }else{
      this.profileData = this.service.profileData
        this.profileForm.patchValue({
          name:this.profileData.authority_name,
          email:this.profileData.email,
          mob_no:this.profileData.mob_no,
          designation:this.profileData.designation,
          //power_level:this.profileData.power_level,
          addr:this.profileData.addr,
          city:this.profileData.city,
          state:this.profileData.state,
          nation:this.profileData.nation,
          pincode:this.profileData.pincode,

          authority_id: this.profileData.authority_id,
          school_id: this.profileData.school_id,
          school_name: this.profileData.school_name,
        })
    }


    
  }

  OnSubmit(){
    this.service.updateAuthority(this.profileForm.value).subscribe((data)=>{
      console.log(data)
      if(data['status']=='success'){
        this.sweetAlert.success_3('Profile Updated ',3)
        this.service.profileData = null;
        this.ngOnInit()
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
  }


}
