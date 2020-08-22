import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { AuthorityService } from '../../authority-service';

@Component({
  selector: 'app-add-authority',
  templateUrl: './add-authority.component.html',
  styleUrls: ['./add-authority.component.scss']
})
export class AddAuthorityComponent implements OnInit {
  
  authorityData;

  authorityForm: FormGroup  = new FormGroup({
    authority_id: new FormControl('',[]),
    school_id: new FormControl('',[]),
    school_name: new FormControl('',[]),

    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    mob_no: new FormControl('',[Validators.required, Validators.pattern("^[1-9][0-9]{9}$")]),
    designation: new FormControl('',[Validators.required]),
    power_level:new FormControl('',[]),
    addr: new FormControl('',[]),
    city: new FormControl('',[]),
    state: new FormControl('',[]),
    nation:new FormControl('',[]),
    pincode:new FormControl('',[])
  });
  sub1: any;
  sub2: any=null;


  constructor(private router:Router,
              private route: ActivatedRoute,
              private sweetAlert: SwalAlertService,
              private service:AuthorityService) { }

  ngOnInit(): void {
    this.sub1 = this.route.params.subscribe((params)=>{
      console.log('reload')
      this.authorityForm.reset()
    })
    this.authorityData = this.service.getAuthorityData()
    if(this.authorityData){
      this.authorityForm.patchValue({
        name:this.authorityData.authority_name,
        email:this.authorityData.email,
        mob_no:this.authorityData.mob_no,
        designation:this.authorityData.designation,
        //power_level:this.authorityData.power_level,
        addr:this.authorityData.addr,
        city:this.authorityData.city,
        state:this.authorityData.state,
        nation:this.authorityData.nation,
        pincode:this.authorityData.pincode,
        authority_id: this.authorityData.authority_id,
        school_id: this.authorityData.school_id,
        school_name: this.authorityData.school_name,
      })
    }
    console.log(this.authorityData)
    console.log(this.authorityForm.value)
  }

  OnSubmit(){
    //console.log(this.authorityForm.value)
    if(this.authorityData){
      this.service.updateAuthority(this.authorityForm.value).subscribe((data)=>{
        //console.log(data)
        if(data['status']=='success'){
          //console.log(data)
          this.sweetAlert.success_3('data saved for '+this.authorityForm.value.name,3)
          this.service.setSelectedAuthority(null)
          this.authorityForm.reset()
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.service.registerAuthority(this.authorityForm.value).subscribe((data)=>{
        //console.log(data)
        if(data['status']=='success'){
          //console.log(data)
          this.sweetAlert.success_3('data saved for '+this.authorityForm.value.name,3)
          this.service.setSelectedAuthority(null)
          this.authorityForm.reset()
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }
    
    
    //this.router.navigate(['authority'])//,{relativeTo:this.route});
  }

  resetForm(){
    console.log('reset')
    this.authorityForm.reset()
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
    this.service.setSelectedAuthority(null)
    
    
  }

}
