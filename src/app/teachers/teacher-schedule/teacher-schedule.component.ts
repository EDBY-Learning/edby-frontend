import { Component, OnInit } from '@angular/core';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { TeachersService } from '../teachers-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.scss']
})
export class TeacherScheduleComponent implements OnInit {

  Object = Object;
  
  staticAlert = true;
  staticAlert2 = true;

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
  numPeriod=0;
  tipContent;

  slotList=null
  schedule_data_list=null;

  constructor(private swalAlert:SwalAlertService,
    private service: TeachersService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

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

    if(this.service.teacherTimetable == null){
      this.service.get_teacher_schedule_list().subscribe((data)=>{
        if(data['status']=='success'){
          this.schedule_data_list = data['message']
          //console.log(this.schedule_data_list)
          this.service.teacherTimetable = this.schedule_data_list
          for(let i=0;i<this.schedule_data_list.length;i++){
            this.timetable[this.schedule_data_list[i].day][this.schedule_data_list[i].period_number - 1] = {
              section:this.schedule_data_list[i].section,
              class_name:this.schedule_data_list[i].class_name,
              link:this.schedule_data_list[i].link,
              subject:this.schedule_data_list[i].subject_name,
              password:this.schedule_data_list[i].password,
              description:this.schedule_data_list[i].description
            }
          }
          //console.log(this.timetable)
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.schedule_data_list = this.service.teacherTimetable
      for(let i=0;i<this.schedule_data_list.length;i++){
        this.timetable[this.schedule_data_list[i].day][this.schedule_data_list[i].period_number - 1] = {
          section:this.schedule_data_list[i].section,
          class_name:this.schedule_data_list[i].class_name,
          link:this.schedule_data_list[i].link,
          subject:this.schedule_data_list[i].subject_name,
          password:this.schedule_data_list[i].password,
          description:this.schedule_data_list[i].description
        }
      }
    }
  }

  setToolTip(data){
    //console.log(data)
    if(data.password!=''){
      this.tipContent = 'Subject : '+data.subject+', Class : '+data.class_name+'-'+data.section+' Password : '+data.password
    }else{
      this.tipContent = 'Subject : '+data.subject+', Class : '+data.class_name+'-'+data.section
    }
  }

  refresh(){
    this.service.slotList =null;
    this.service.teacherTimetable = null;
    this.ngOnInit()
  }

  openLink(data){
    
    window.open(data, '_blank')
  }

  setCustomLink(){
    this.router.navigate(['../custom-link-set'],{relativeTo:this.route});
  }

}
