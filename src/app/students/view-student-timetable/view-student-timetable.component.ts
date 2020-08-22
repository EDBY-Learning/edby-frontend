import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../students.service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-view-student-timetable',
  templateUrl: './view-student-timetable.component.html',
  styleUrls: ['./view-student-timetable.component.scss']
})
export class ViewStudentTimetableComponent implements OnInit {

  
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
  sub2=null;
  periods = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eigth','Ninth','Tenth','Eleventh','Twelfth']
  numPeriod;
  tipContent: string;
  tipContent2 ="please leave ongoing class to join new"
  isModalOpen = false

  linkData=null;
  schedule_data_list=null;
  

  
  answer='';
  sub3: any;
  link_: any;

  constructor(private modalService: NgbModal,
    public service: StudentsService,
    private sweetAlert: SwalAlertService) {
      

      if(this.service.slotList == null){
        this.service.getSlots().subscribe((data)=>{
          //console.log(data)
          if(data['status']=='success'){
            this.service.slotList = data['message']
            this.numPeriod = this.service.slotList.length/7
            //console.log(this.service.slotList,'success')
          }else{
            console.log(data['message'])
          }
        },(err)=>{
          console.log(err)
        })
      }else{
        this.numPeriod = this.service.slotList.length/7
      }

      if(this.service.studentTimetable ==null){
        this.service.get_schedule_list().subscribe((data)=>{
          if(data['status']=='success'){
            this.schedule_data_list = data['message']
            this.service.studentTimetable = this.schedule_data_list
            for(let i=0;i<this.schedule_data_list.length;i++){
              this.timetable[this.schedule_data_list[i].day][this.schedule_data_list[i].period_number - 1] = {
                subject:this.schedule_data_list[i].subject_name[0],
                teacher:this.schedule_data_list[i].teacher_name[0],
                link:this.schedule_data_list[i].links[0],
                password:this.schedule_data_list[i].passwords[0],
              description:this.schedule_data_list[i].descriptions[0]
              }
            }
            //console.log(this.timetable)
          }else{
            console.log(data['message'])
          }
        })
      }else{
        this.schedule_data_list = this.service.studentTimetable
        for(let i=0;i<this.schedule_data_list.length;i++){
          this.timetable[this.schedule_data_list[i].day][this.schedule_data_list[i].period_number - 1] = {
            subject:this.schedule_data_list[i].subject_name[0],
            teacher:this.schedule_data_list[i].teacher_name[0],
            link:this.schedule_data_list[i].links[0],
            password:this.schedule_data_list[i].passwords[0],
          description:this.schedule_data_list[i].descriptions[0]
          }
        }
      }



      

   }

  ngOnInit(): void {
  }

  setLink(content,data){
    //console.log(data)
    this.link_ = data;
    this.linkData = data.link;
    this.modalService.open(content, { centered: true });
    
  }

  setToolTip(data){
    //console.log(data)
    if(data.password!=''){
      this.tipContent = this.tipContent = 'Subject : '+data.subject+', Teacher : '+data.teacher+' Password : '+data.password
    }else{
      this.tipContent = 'Subject : '+data.subject+', Teacher : '+data.teacher
    }
    
  }

  openLink(modal,content2){
   
    modal.close('Ok click')
    this.service.question.option1 = Math.floor(Math.random() * 50) + 1
    this.service.question.option2 = Math.floor(Math.random() * 50) + 1 
    this.modalService.open(content2, { centered: true ,backdrop:'static',keyboard:false});
    this.isModalOpen = true;
  }

  cancelModal(modal){
    //console.log('cancelled')
    this.linkData=null;
    this.link_ = null;
    modal.dismiss('cancel click')
    
  }

  attendenceMark(content2,modal2){
    
    if(!this.service.ongoingClass){
      this.sub2 = this.service.startAttendence().subscribe((data)=>{
        //content2.close()
        this.service.updateAttendence({answered:'False'}).subscribe((data)=>{
          if(data['status']=='success'){
           // console.log('missed one question')
          }else{
            //this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          //this.sweetAlert.failure(err)
        })
        if(!this.isModalOpen){
          //console.log('opening new modal')
          this.isModalOpen =true
          this.service.question.option1 = Math.floor(Math.random() * 50) + 1
          this.service.question.option2 = Math.floor(Math.random() * 50) + 1 
          //this.attendence.attendenceScore.total+=1;
          this.modalService.open(content2, { centered: true ,backdrop:'static',keyboard:false});
        }
      })
      
    }
    

    if(this.service.question.option1+this.service.question.option2 == +this.answer){
      //this.attendence.updateAttendence();
      //this.attendence.attendenceScore.marked+=1 
      if(!this.service.ongoingClass){
        //console.log(this.linkData)
        window.open(this.linkData, '_blank')
      }
      this.service.ongoingClass = true
      this.isModalOpen = false;
    }
    this.service.updateAttendence({answered:'True'}).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2(data['message'])
        modal2.close('Ok click') 
        this.answer = ''
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
    
    //console.log(this.attendence.attendenceScore)   
  }

  leaveClass(){
    if(confirm('Sure want to leave class')){
      this.service.ongoingClass = false;
      this.isModalOpen = false;
      this.link_ =null;
      if(this.sub2){
        console.log('unsubcribed class attendence')
        this.sub2.unsubscribe()
        this.sub2=undefined;
      }
      //console.log(this.attendence.attendenceScore)
    }
    
  }

  ngOnDestroy(){
    console.log('unsubscribed timetable')
    
    if(this.sub2){
      this.sub2.unsubscribe()
    }
  }

}
