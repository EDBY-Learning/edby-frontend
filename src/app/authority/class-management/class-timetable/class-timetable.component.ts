import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthorityService } from '../../authority-service';

@Component({
  selector: 'app-class-timetable',
  templateUrl: './class-timetable.component.html',
  styleUrls: ['./class-timetable.component.scss']
})
export class ClassTimetableComponent implements OnInit {
  
  Object = Object;

  timetable={
    'Mon':[{},{},{},{},{},{},{},{},{},{},{},{}],
    'Tue':[{},{},{},{},{},{},{},{},{},{},{},{}],
    'Wed':[{},{},{},{},{},{},{},{},{},{},{},{}],
    'Thr':[{},{},{},{},{},{},{},{},{},{},{},{}],
    'Fri':[{},{},{},{},{},{},{},{},{},{},{},{}],
    'Sat':[{},{},{},{},{},{},{},{},{},{},{},{}],
    'Sun':[{},{},{},{},{},{},{},{},{},{},{},{}]
  }

  sub1;
  periods = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eigth','Ninth','Tenth','Eleventh','Twelfth']
  
  tipContent: string;

  //SlotList =null;
  schedule_data_list=null;

  selected_data;

  @Input() class;
  @Input() section;
  @Input() numPeriod;


  constructor(public activeModal: NgbActiveModal,
    private service:AuthorityService) { 
      
    }

  ngOnInit(): void {

    

    this.service.getClassTimetable({'class_name':this.class,'section':this.section}).subscribe((data)=>{
      //console.log(data)
      if(data['status']=='success'){
        this.schedule_data_list = data['message']
        for(let i=0;i<this.schedule_data_list.length;i++){
          this.timetable[this.schedule_data_list[i]['slot'].day][this.schedule_data_list[i]['slot'].period_number - 1] = {
            subject:this.schedule_data_list[i].subject[0]['subject_name'],
            teacher:this.schedule_data_list[i].teacher_name[0],
            link:this.schedule_data_list[i].subject[0]['link'],
            password:this.schedule_data_list[i].subject[0]['password'],
            description:this.schedule_data_list[i].subject[0]['description']
          }
        }
        //console.log(this.timetable)
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
  }

  openLink(data){
    this.selected_data = data;
    window.open(data.link, '_blank')
  }

  setToolTip(data){
    if(data.password!=''){
      this.tipContent = this.tipContent = 'Subject : '+data.subject+', Teacher : '+data.teacher+' Password : '+data.password
    }else{
      this.tipContent = 'Subject : '+data.subject+', Teacher : '+data.teacher
    }
    //this.tipContent = 'Subject : '+data.subject+', Teacher : '+data.teacher
  }

  ngOnDestroy(){
    console.log('unsubscribed timetable')
    //this.sub1.unsubscribe()
  }

  

}
