import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../teachers-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  colorList =['red','orange','green','blue','coral','black','pink','Purple','violet','Yellow','cyan','olive']

  barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio:1.3,
    scales:{
      yAxes:[
        {
          id:'A',
          position:'left',
          ticks:{
            min:0,
            max:100
          }
        }
      ]
    }
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [],yAxisID:'A', label: 'Subject Wise Performance' }
  ];
  /////////////////////////////////////////////////////////////////////////////////////////
  mixedBarChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio:1.3,
    scales:{
      yAxes:[
        {
          id:'A',
          position:'left',
          ticks:{
            min:0
          }
        },{
          id:'B',
          type:'linear',
          position:'right',
          ticks:{
            max:100,
            min:0
          }
        }
      ]
    }
  };
  mixedBarChartLabels: Label[];
  mixedBarChartType: ChartType = 'bar';
  mixedBarChartLegend = true;
  mixedBarChartPlugins = [];

  mixedBarChartData: ChartDataSets[] = [
    { data: [],yAxisID:'A', backgroundColor:[],label: 'Attendence' ,order:2},
    { data: [],yAxisID:'B', label: 'Attentiveness',type:'line' ,order:1}
  ];
  ///////////////////////////////////////////////////////////////////////////////////////

  radarChartOptions: RadialChartOptions = {
    responsive: true,
    aspectRatio:1.3,
    scales:{
      ticks:{
        min:0,
        max:100
      }
    }
  };
  radarChartLabels: Label[];

  radarChartData: ChartDataSets[] = [
    { data: [], label: 'Student Performance',order:1},
    { data: [], label: 'Class Performance',order:2}
  ];
  radarChartType: ChartType = 'radar';
  ///////////////////////////////////////////////////////////////////////
  mixedBarChartOptions2: ChartOptions = {
    responsive: true,
    aspectRatio:1.3,
    scales:{
      yAxes:[
        {
          id:'A',
          type:'linear',
          position:'left',
          ticks:{
            min:0,
            max:100
          }
        },{
          id:'B',
          type:'linear',
          position:'right',
          ticks:{
            max:100,
            min:0
          }
        }
      ]
    }
  };
  mixedBarChartLabels2: Label[];
  mixedBarChartType2: ChartType = 'line';
  mixedBarChartLegend2 = true;
  mixedBarChartPlugins2 = [];

  mixedBarChartData2: ChartDataSets[] = [
    { data: [],yAxisID:'A', label: 'Class Attentiveness' ,order:2},
    { data: [],yAxisID:'B', label: 'Student Attentiveness',type:'line' ,order:1}
  ];

  ///////////////////////////////////////////////////////////////////////
  type_ ;

  classDetail;
  studentDetail;

  selected_student;
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  subjectsSummary;
  subjectDetail;
  subject_id;

  barChartOptions2: ChartOptions = {
    responsive: true,
    aspectRatio:1.3,
    scales:{
      yAxes:[
        {
          id:'A',
          position:'left',
          ticks:{
            min:0,
            max:100
          }
        }
      ]
    }
  };
  barChartLabels2: Label[];
  barChartType2: ChartType = 'bar';
  barChartLegend2 = true;
  barChartPlugins2 = [];

  barChartData2: ChartDataSets[] = [
    { data: [],yAxisID:'A', label: 'Class Test Performance' }
  ];


  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  constructor(private service:TeachersService,
    private modalService: NgbModal) { 
      let data = localStorage.getItem('userInfoOnlineSchool')
      data = JSON.parse(data)
      this.type_ = data['user_type']
    }
  
  
  ngOnInit(): void {
    
    if(this.type_ =='class_teacher'){
      //make first class list request
      this.service.get_dashboard_class_details_for_ct().subscribe((data)=>{
        if(data['status']=='success'){
          this.classDetail = data;
          this.getClassDetail()
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
      
    }else if(this.type_ == 'teacher'){
      //make request to get summary and select a default subject
      this.service.get_dashboard_subject_list().subscribe((data)=>{
        if(data['status']=='success'){
          this.subjectsSummary = data
          this.getSubjectSummary()
          this.subject_id = this.subjectsSummary['performance_list'][0]['subject_id']
          this.getSubjectDetail()
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
            
      
    }else{
      //do logout
    }
  }

  getSubjectSummary(){
    
    this.barChartLabels = this.subjectsSummary.performance_list.map(a => a.subject_name+' ('+a.class_name+'-'+a.section+')');
    this.barChartData[0].data = this.subjectsSummary.performance_list.map(a => a.average_performance);
    this.barChartData[0].backgroundColor = this.colorList
  }

  getSubjectDetail(){
    //console.log(this.subject_id)
    this.service.get_dashboard_subject_details({subject_id:this.subject_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.subjectDetail = data
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
    
  }

  show_detail_for_student(stud,content2){
    this.selected_student = stud
    this.modalService.open(content2, {size:'lg', centered: true ,backdrop:'static',keyboard:false});
    //make changes in graph
    this.barChartLabels2 = this.selected_student.performance_list.map(a => a.class_test_name+' ('+a.class_test_date+')');
    this.barChartData2[0].data = this.selected_student.performance_list.map(a => a.performance);
    this.barChartData2[0].backgroundColor = this.colorList

  }

 
  getClassDetail(){
    
    
    //set value in graph
    this.barChartLabels = this.classDetail.subject_performance_list.map(a => a.subject_name);
    this.barChartData[0].data = this.classDetail.subject_performance_list.map(a => a.average_performance);
    this.barChartData[0].backgroundColor = this.colorList

    this.mixedBarChartLabels = this.classDetail.recent_attendance_list.map(a => a.date);
    this.mixedBarChartData[0].data = this.classDetail.recent_attendance_list.map(a => a.attendance);
    //console.log(this.mixedBarChartData[0].data)
    this.mixedBarChartData[0].backgroundColor = this.colorList
    this.mixedBarChartData[1].data = this.classDetail.recent_attendance_list.map(a => a.attentiveness);


  }

  getStudentData(stud,content){
    this.selected_student = stud;
    this.modalService.open(content, {size:'lg', centered: true ,backdrop:'static',keyboard:false});
    this.service.get_dashboard_student_details_for_ct({student_id:stud.student_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.studentDetail = data
        this.radarChartLabels = this.classDetail.subject_performance_list.map(a => a.subject_name);
        this.radarChartData[0].data = this.studentDetail.subject_performance_list.map(a=>a.performance)
        this.radarChartData[1].data = this.classDetail.subject_performance_list.map(a=>a.average_performance)
        
        this.mixedBarChartLabels2 = this.classDetail.recent_attendance_list.map(a => a.date);
        this.mixedBarChartData2[0].data = this.classDetail.recent_attendance_list.map(a => a.attentiveness); 
        var list = this.mixedBarChartLabels2
        this.mixedBarChartData2[1].data = this.studentDetail.recent_attentiveness_list.map(function(val,index){

          if(list.includes(val.date)){
            //console.log(val)
            return val.attentiveness 
          }else{
            return 0
          }
        });
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
    
    
    
    
    //console.log(this.mixedBarChartData2[1].data)
  }

  cancelModal(modal){
    this.selected_student = null;
    modal.dismiss('cancel click')
  }



}