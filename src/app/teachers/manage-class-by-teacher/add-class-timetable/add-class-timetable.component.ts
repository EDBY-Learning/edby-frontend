import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { TeachersService } from '../../teachers-service';
@Component({
  selector: 'app-add-class-timetable',
  templateUrl: './add-class-timetable.component.html',
  styleUrls: ['./add-class-timetable.component.scss']
})
export class AddClassTimetableComponent implements OnInit {

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
  periods = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','Ninth','Tenth','Eleventh','Twelfth']
  numPeriod=0;
  tipContent;

  subjectList = null;
  slotList =null;
  schedule_data_list=null;
  
  day;
  period;
  subject_id;

  constructor(private modalService: NgbModal,
              private service:TeachersService,
              private swalAlert:SwalAlertService) { }

  ngOnInit(): void {

    if(this.service.subjectList ==null){
      this.service.getClassSubjectList().subscribe((data)=>{
        if(data['status']=='success'){
          this.subjectList = data['message']
          this.service.subjectList = this.subjectList;
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.subjectList = this.service.subjectList;
    }

    if(this.service.slotList ==null){
      this.service.getSlots().subscribe((data)=>{
        if(data['status']=='success'){
          this.slotList = data['message']
          this.service.slotList = this.slotList
          this.numPeriod = this.slotList.length/7
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.slotList = this.service.slotList
      this.numPeriod = this.slotList.length/7
    }

    if(this.service.classTimetable== null){
      this.service.get_schedule_list().subscribe((data)=>{
        //console.log(data)
        if(data['status']=='success'){
          this.schedule_data_list = data['message']
          this.service.classTimetable =this.schedule_data_list
          for(let i=0;i<this.schedule_data_list.length;i++){
            this.timetable[this.schedule_data_list[i].day][this.schedule_data_list[i].period_number - 1] = {
              subject:this.schedule_data_list[i].subject_name[0],
              teacher:this.schedule_data_list[i].teacher_name[0],
              link:this.schedule_data_list[i].links[0]
            }
          }
          //console.log(this.timetable)
        }else{
          console.log(data)
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.schedule_data_list = this.service.classTimetable
      for(let i=0;i<this.schedule_data_list.length;i++){
        this.timetable[this.schedule_data_list[i].day][this.schedule_data_list[i].period_number - 1] = {
          subject:this.schedule_data_list[i].subject_name[0],
          teacher:this.schedule_data_list[i].teacher_name[0],
          link:this.schedule_data_list[i].links[0]
        }
      }
    }
    
    
    
  }

  generateLink(){
    this.swalAlert.warning('Please wait while we process')
    this.service.generate_subject_links().subscribe((data)=>{
      if(data['status']=='success'){
        this.swalAlert.success_2('Link Generated succesfully')
        this.service.classTimetable = null;
        this.ngOnInit()
      }else{
        this.swalAlert.failure(data['message'])
      }
    },(err)=>{
      this.swalAlert.failure(err)
    })
  }

  setToolTip(data){
    this.tipContent = 'Subject : '+data.subject+', Teacher : '+data.teacher
  }

  
  openVerticallyCentered(content,day,period) {
    
    //console.log(day,period)
    this.day = day;
    this.period = period;
    this.modalService.open(content, { centered: true ,backdrop:'static',keyboard:false });
  }

  saveData(modal){
    let slot_id = null;
    for(let i=0;i<this.slotList.length;i++){
      if((this.slotList[i]['day']==this.day) && 
      (+this.slotList[i]['period_number']==(+this.period+1)) &&
      (this.subject_id!=null)&&
      (this.subject_id!='')){
        slot_id = this.slotList[i].id
        //console.log('found slot')
        break;
      }
    }
    if(slot_id!=null){
      //console.log(slot_id,this.subject_id)
      this.service.updateTimeTable({schedule_data_list:[[slot_id.toString() ,[this.subject_id]]]}).subscribe((data)=>{
        if(data['status']=='success'){
          this.swalAlert.success_2(data['message'])
          modal.close('Ok click')
          this.subject_id=null
          this.service.classTimetable = null;
          this.ngOnInit()
        }else{
          this.swalAlert.failure(data['message'])
        }
      },(err)=>{
        this.swalAlert.failure(err)
      })
      
      
    }
    // {"schedule_data_list":[ ["1",["1","2"]],["2",["2"]]]}
    //#[["slot_id",["subject_id"]],[], ,...]
    
  }

  cancelModal(modal){
    //console.log('cancelled')
   
    modal.dismiss('cancel click')
  }

  saveTimetable(){
    //this.swalAlert.success()
    
  }

}
