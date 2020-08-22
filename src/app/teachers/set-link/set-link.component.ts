import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../teachers-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-set-link',
  templateUrl: './set-link.component.html',
  styleUrls: ['./set-link.component.scss']
})
export class SetLinkComponent implements OnInit {
  subjectLinksList: any;

  alternate_link = null
  alternate_password = null
  alternate_description = null

  subject_id=null;

  constructor(private service: TeachersService,
    private modalService: NgbModal,
    private sweetAlert: SwalAlertService) { }

  ngOnInit(): void {
    if(this.service.subjectLinksList==null){
      this.service.getSubjectList().subscribe((data)=>{
        if(data['status']=='success'){
          //console.log(data)
          this.service.subjectLinksList = data['message']
          this.subjectLinksList = data['message']
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.subjectLinksList = this.service.subjectLinksList
    }
  }

  openModal(content,class_){
    this.subject_id = class_.subject_id
    this.modalService.open(content, { centered: true, backdrop:'static', keyboard:false, size: 'lg' }); 
  }

  cancelModal(modal){
    modal.dismiss('cancel click')
    //this.alternate_link = null
    //this.alternate_password = null
    //this.alternate_description = null
    this.subject_id = null
  }

  saveData(modal){

    this.service.set_alternate_link({alternate_link:this.alternate_link,
      alternate_description:this.alternate_description,
      alternate_password:this.alternate_password,
      subject_id:this.subject_id
      }).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Update Link')
        this.service.subjectLinksList=null
        this.ngOnInit()
        this.alternate_link = null
        this.alternate_password = null
        this.alternate_description = null
        this.subject_id = null
        modal.close('ok')
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
  }

  resetLinkData(class_){
    this.service.set_alternate_link({alternate_link:'',
      alternate_description:'',
      alternate_password:'',
      subject_id:class_.subject_id
      }).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Update Link')
        this.service.subjectLinksList=null
        this.ngOnInit()
        this.alternate_link = null
        this.alternate_password = null
        this.alternate_description = null
        this.subject_id = null
      }else{
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    })
  }

}
