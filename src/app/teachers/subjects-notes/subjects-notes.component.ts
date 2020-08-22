import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../teachers-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-subjects-notes',
  templateUrl: './subjects-notes.component.html',
  styleUrls: ['./subjects-notes.component.scss']
})
export class SubjectsNotesComponent implements OnInit {

  staticAlert=false;
  staticAlertError= ''

  //loading = true;

  notesList;
  class_name: any;
  section: any;
  subject_id: any;
  
  notes_name = null;
  description = null;
  fileToUpload: File;
  hasFileSelected: boolean;

  constructor(private service: TeachersService,
    private route: ActivatedRoute,
    private sweetAlert: SwalAlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.class_name = this.route.snapshot.params.class_name
    this.section = this.route.snapshot.params.section
    this.subject_id = this.route.snapshot.params.subject_id
    
    //make request
    //this.loading = true
    this.service.getNotesList({subject_id:this.subject_id}).subscribe((data)=>{
      if(data['status']=='success'){
        //console.log(data)
        this.notesList = data['message']
      }else{
        console.log(data)
      }
    },(err)=>{
      console.log(err)
    },()=>{
      //this.loading = false
    })
    
  }

  downloadFile(test){
    window.open(test.notes_file,'_blank')
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.hasFileSelected = true
    console.log(this.hasFileSelected)
  }

  submitNotes(){
    let error = false
    if((this.notes_name == null) || (this.description == null) || (this.fileToUpload==null)){
      this.staticAlertError= 'Missing Field'
      this.staticAlert = true 
      error = true      
    }
    if(error == false){
      if(confirm('Sure want to submit')){
        //this.loading = true
        this.service.uploadNotes({
          subject_id:this.subject_id,
          notes_name:this.notes_name,
          description:this.description,
          file:this.fileToUpload
        }).subscribe((data)=>{
          if(data['status']=='success'){
            this.fileToUpload = null
            this.hasFileSelected = false 
            this.notes_name = null
            this.description = null
            this.sweetAlert.success_2('Uploaded Notes')
            this.ngOnInit()
          }else{
            console.log(data)
            this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          this.sweetAlert.failure(err)
        },()=>{
          //this.loading = false
        })
        
      }
    }
    
  }

  goback(){
    this.router.navigate(['../../../../your-subject-classes'],{relativeTo:this.route})
  }

  ngOnDestroy(){
    
  }

}
