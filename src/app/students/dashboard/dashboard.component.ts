import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StudentsService } from '../students.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  colorList =['cyan','olive','red','orange','green','blue','coral','black','pink','Purple','violet','Yellow',]

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
  mixedBarChartOptions: ChartOptions = {
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
  mixedBarChartLabels: Label[];
  mixedBarChartType: ChartType = 'line';
  mixedBarChartLegend = true;
  mixedBarChartPlugins = [];

  mixedBarChartData: ChartDataSets[] = [
    { data: [],yAxisID:'A', label: 'Student Attentiveness' ,order:2},
    { data: [],yAxisID:'B', label: 'Class Attentiveness',type:'line' ,order:1}
  ];

  studentDetail;

  constructor(private service: StudentsService) { }

  ngOnInit(): void {
    if(this.service.studentDashboardDetail ==null){
      this.service.get_dashboard_student_details().subscribe((data)=>{
        if(data['status']=='success'){
          this.studentDetail = data
          this.service.studentDashboardDetail = this.studentDetail
          this.setData()
          
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })

    }else{
      this.studentDetail = this.service.studentDashboardDetail
      this.setData()
    }
    
  }


  setData(){
    this.radarChartLabels = this.studentDetail.subject_performance_list.map(a => a.subject_name);
        this.radarChartData[0].data = this.studentDetail.subject_performance_list.map(a=>a.performance)
        this.radarChartData[1].data = this.studentDetail.subject_performance_list.map(a=>a.average_performance)
        
        this.mixedBarChartLabels = this.studentDetail.recent_attentiveness_list.map(a => a.date);
        this.mixedBarChartData[0].data = this.studentDetail.recent_attentiveness_list.map(a => a.attentiveness); 
        var list = this.mixedBarChartLabels
        this.mixedBarChartData[1].data = this.studentDetail.recent_attentiveness_list.map(function(val,index){

      if(list.includes(val.date)){
        //console.log(val)
        return val.average_attentiveness 
      }else{
        return 0
      }
    });
  }

}
