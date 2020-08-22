import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '../../authority-service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-create-update-slot',
  templateUrl: './create-update-slot.component.html',
  styleUrls: ['./create-update-slot.component.scss']
})
export class CreateUpdateSlotComponent implements OnInit {

  staticAlert;
  error;

  periods = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','Ninth','Tenth','Eleventh','Twelfth']
  numPeriods;
  
  
  startTiming = ['','','','','','','','','','','',''];
  endTiming = ['','','','','','','','','','','',''];

  slot_data_list = [];

  constructor(private service: AuthorityService,
    private sweetAlert: SwalAlertService,) {
   
  }

  ngOnInit(): void {
    if(this.service.slotList == null){
      this.service.getSlots().subscribe((data)=>{
        if(data['status']=='success'){
          let temp = data['message']
          this.service.slotList = temp
          this.numPeriods = temp.length/7
          for(let i=0;i<temp.length;i++){
            if(temp[i]['day']=='Mon'){
              this.startTiming[temp[i]['period_number']-1] = temp[i]['start_time']
              this.endTiming[temp[i]['period_number']-1] = temp[i]['end_time']
            }
          }
        }else{
          console.log(data['message'])
        }
         
      },(err)=>{
        console.log(err)
      })
    }else{
      let temp = this.service.slotList
        this.numPeriods = temp.length/7
        for(let i=0;i<temp.length;i++){
          if(temp[i]['day']=='Mon'){
            this.startTiming[temp[i]['period_number']-1] = temp[i]['start_time']
            this.endTiming[temp[i]['period_number']-1] = temp[i]['end_time']
          }
        }
    }
    
  }

  refresh(){
    this.service.slotList = null;
    this.ngOnInit();
  }

  saveData(){
    //{"slot_data_list":[ ["Mon","1","7:00","8:00"], ["Mon","2","8:00","9:00"]]}
    let days = ['Mon','Tue','Wed','Thr','Fri','Sat','Sun']
    if(this.numPeriods==null){
      this.error = "Periods missing"
      this.staticAlert = true
    }else if(this.numPeriods > 12){
      this.error = "Number of periods should be less than 12"
      this.staticAlert = true
    }
    
    for(let i=0;i<days.length;i++){
      for(let j=0;j<this.numPeriods;j++){
        if((this.startTiming[j]!='') && (this.endTiming[j]!='')){
          if((+(this.startTiming[j].replace(':','')))>(+(this.endTiming[j].replace(':','')))){
            this.error = "start timing is less than end time for period "+(+j+1)
            this.staticAlert = true
            break
          }else{
            this.slot_data_list.push([days[i],j+1,this.startTiming[j],this.endTiming[j]])
          }
        }else{
          this.error = 'Missing timing for Period '+(+j+1);
          this.staticAlert = true
          break;
        }
      }
    }
    
    if(this.error ==''){
      this.sweetAlert.warning('Please wait while be process your request!!')
      this.service.updateSlots({slot_data_list:this.slot_data_list}).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_2(data['message'])
          this.service.slotList = null;
          this.ngOnInit()
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      })
    }
    
  }
  changeError(){
    this.error = ''
    this.staticAlert =false
  }

}
