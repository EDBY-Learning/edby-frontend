import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homework-management',
  templateUrl: './homework-management.component.html',
  styleUrls: ['./homework-management.component.scss']
})
export class HomeworkManagementComponent implements OnInit {
  class: any;
  section: any;
  subject_id: any;
  selectedBarHomework = 0
  
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.class = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.subject_id = this.route.snapshot.params.subject_id
    this.routeToPage(0)
  }

  routeToPage(i){
    this.selectedBarHomework = i
    if(this.selectedBarHomework==0){
      this.router.navigate(['give-homework',this.subject_id,this.class,this.section],{relativeTo:this.route});
    }else{
      this.router.navigate(['check-homework',this.subject_id,this.class,this.section],{relativeTo:this.route});
    }
  }

  goback(){
    this.router.navigate(['../../../../your-subject-classes'],{relativeTo:this.route})
  }


}
