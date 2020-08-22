import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student-subjects-notes',
  templateUrl: './subjects-notes.component.html',
  styleUrls: ['./subjects-notes.component.scss']
})
export class StudentSubjectsNotesComponent implements OnInit {
  class_name: any;
  section: any;
  subject_id: any;
  notesList: any;

  constructor(private service: StudentsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.subject_id = this.route.snapshot.params.subject_id

    //make request 
    this.service.getNotesList({subject_id:this.subject_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.notesList = data['message']
      }else{
        console.log(data)
      }
    },(err)=>{
      console.log(err)
    })
    
  }

  downloadFile(test){
    window.open(test.notes_file,'_blank')
  }

}
