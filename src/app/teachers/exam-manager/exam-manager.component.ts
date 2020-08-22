import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../teachers-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-manager',
  templateUrl: './exam-manager.component.html',
  styleUrls: ['./exam-manager.component.scss']
})
export class ExamManagerComponent implements OnInit {

  selectedBarExam = 0;
  subject_id: any;
  class_name: any;
  subject_name:any;
  section: any;

  constructor(private service: TeachersService,
    private route: ActivatedRoute,
    private router: Router) {
    this.subject_id = this.route.snapshot.params.subject_id
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.subject_name = this.route.snapshot.params.subject_name
  }

  ngOnInit(): void {
    this.selectedBarExam = this.service.selectedBarExam
  }

  setSelection(i){
    this.selectedBarExam = i
    this.service.selectedBarExam = i
  }

  goback(){
    this.router.navigate(['../../../../../your-subject-classes'],{relativeTo:this.route})
  }

}
