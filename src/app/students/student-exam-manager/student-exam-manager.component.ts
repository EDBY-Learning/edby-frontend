import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-exam-manager',
  templateUrl: './student-exam-manager.component.html',
  styleUrls: ['./student-exam-manager.component.scss']
})
export class StudentExamManagerComponent implements OnInit {

  selectedBarExam = 0;
  subject_id: any;
  class_name: any;
  section: any;

  constructor(private service: StudentsService,
    private route: ActivatedRoute,
    private router: Router) {
      this.subject_id = this.route.snapshot.params.subject_id
      this.class_name = this.route.snapshot.params.class_name
      this.section = this.route.snapshot.params.section
     }

  ngOnInit(): void {
    this.selectedBarExam = this.service.selectedBarExam
  }

  setSelection(i){
    this.selectedBarExam = i
    this.service.selectedBarExam = i
  }

  goTosubjects(){
    this.router.navigate(['../../../../subjects'],{relativeTo:this.route})
  }

}
