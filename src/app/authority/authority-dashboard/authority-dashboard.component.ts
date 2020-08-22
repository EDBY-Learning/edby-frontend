import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '../authority-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-authority-dashboard',
  templateUrl: './authority-dashboard.component.html',
  styleUrls: ['./authority-dashboard.component.scss']
})
export class AuthorityDashboardComponent implements OnInit {


  colorList =['cyan','olive','red','orange','green','blue','coral','black','pink','Purple','violet','Yellow',]

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
    { data: [],yAxisID:'B', label: 'Attentiveness',type:'line' ,order:1,pointRadius:5,pointHoverRadius:8}
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

  basicDashboardData;
  classDetail;
  studentDetail;

  class_id;
  class_list = [];

  selected_student;

  constructor( private service: AuthorityService,
    private modalService: NgbModal) {
      
  } 

  ngOnInit(): void{
    //make first request to get basic dashboard data
    this.service.get_dashboard_summary().subscribe((data)=>{
      if(data['status']=='success'){
        this.basicDashboardData = data
        this.class_list = this.basicDashboardData.class_list.sort((a,b)=> (+a.class_name) < (+b.class_name) ? -1:1)
        this.class_id = this.class_list[0].class_id
        this.getClassDetail()
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    },()=>{
      
    })
    //inside that make first class list request
    
    
    
  }

  //demoFunc($event.target.value)
  demoFunc(val){
    console.log('clicked',val)
  }

  compare(a,b){
    if((a.class_name) > (b.class_name)){
      return -1;
    }else if((a.class_name) < (b.class_name)){
      return 1;
    }
    return 0;
  }

  getClassDetail(){
    this.service.get_dashboard_class_details({class_id:this.class_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.classDetail = data;
        //set value in graph
        this.barChartLabels = this.classDetail.subject_performance_list.map(a => a.subject_name);
        this.barChartData[0].data = this.classDetail.subject_performance_list.map(function(val,index){
          
          if(val.average_performance=='None'){
            return 0
          }else{
            return val.average_performance
          }
        });
        this.barChartData[0].backgroundColor = this.colorList
        if(this.classDetail.recent_attendance_list.length >0){
          this.mixedBarChartLabels = this.classDetail.recent_attendance_list.map(a => a.date);
          this.mixedBarChartData[0].data = this.classDetail.recent_attendance_list.map(a => a.attendance);
          //console.log(this.mixedBarChartData[0].data)
          this.mixedBarChartData[0].backgroundColor = this.colorList.slice(1,-1)
          this.mixedBarChartData[1].data = this.classDetail.recent_attendance_list.map(a => a.attentiveness);
          //console.log(this.mixedBarChartData[1].data)
        }
        
      }else{
        console.log(data['message'])
      }
    },(err)=>{
      console.log(err)
    })
    //console.log(this.class_id)
    
    


  }

  getStudentData(stud,content){
    this.modalService.open(content, {size:'lg', centered: true ,backdrop:'static',keyboard:false});
        
    this.service.get_dashboard_student_details({student_id:stud.student_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.selected_student = stud;
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









/*
    dashBoardData;
    classListFilter;
    classList;

    filter;
    ngOnInit(): void {
    if(this.service.dashBoardData ==null){
      this.service.getDashboardData().subscribe((data)=>{
        //console.log(data)
        if(data['status']=='success'){
          this.service.dashBoardData = data['message']
          this.dashBoardData = this.service.dashBoardData
          this.classList = this.dashBoardData['class_list']
          this.classListFilter = this.classList
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })

    }else{
      this.dashBoardData = this.service.dashBoardData
      this.classList = this.dashBoardData['class_list']
      this.classListFilter = this.classList
    }
  }

  showClass(class_){
    //console.log(class_)
    window.open('https://www.google.co.in/search?q='+class_.subject_link[0], '_blank')
  }

  filterClass(){
    if(this.filter==null){
      //console.log('empty')
      this.classListFilter = this.classList
    }else{
      this.classListFilter = []
      for(let i = 0;i<this.classList.length;i++){
        if(this.classList[i].class_name.toString().includes(this.filter.toString())){
          this.classListFilter.push(this.classList[i])
        }
      }
    }
    //console.log(this.filter)
  }*/
