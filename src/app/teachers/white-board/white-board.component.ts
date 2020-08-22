import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardService } from "ng2-canvas-whiteboard"
import * as jsPDF from 'jspdf'; 
import { TeachersService } from '../teachers-service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-white-board',
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.scss']
})
export class WhiteBoardComponent implements OnInit {

  canvasOptions: CanvasWhiteboardOptions = {
    drawButtonEnabled: true,
    drawButtonClass: "fa fa-pencil-alt fa-2x",
    drawButtonText: "",
    
    clearButtonEnabled: true,
    clearButtonClass: "fa fa-eraser fa-2x",
    clearButtonText: "",

    undoButtonText: "",
    undoButtonEnabled: true,
    undoButtonClass:"fas fa-undo fa-2x",
    
    redoButtonText: "",
    redoButtonEnabled: true,
    redoButtonClass:"fas fa-redo fa-2x",
    
    saveDataButtonEnabled: true,
    saveDataButtonText: "",
    saveDataButtonClass:'fas fa-save fa-2x',

    colorPickerEnabled: true,
    lineWidth: 5,
    strokeColor: "rgb(0,0,0)",
    shouldDownloadDrawing: false
  };

  filesToUpload: any[] = [];
  pdfToUpload: File;
  subject_id ='';

  imageUrl;

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  subjectList: any;

  constructor(private service: TeachersService,
    private sweetAlert:SwalAlertService,
    private modalService: NgbModal,
    private _canvasWhiteboardService:CanvasWhiteboardService) { }

  ngOnInit(): void {
    this.filesToUpload = this.service.filesToUpload
    if(this.filesToUpload.length > 0){
      this.imageUrl = this.filesToUpload[this.filesToUpload.length - 1]
    }
    if(this.service.subjectList==null){
      this.service.getSubjectList().subscribe((data)=>{
        if(data['status']=='success'){
          //console.log(data)
          this.service.subjectList = data['message']
          this.subjectList = data['message']
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.subjectList = this.service.subjectList
    }
  }

  sendBatchUpdate(event){}
  onCanvasUndo(event){}
  onCanvasRedo(event){}
  onCanvasClear(){
    this.imageUrl = ''
  }

  selectImage(i){
    //console.log(this.filesToUpload[i])
    this.imageUrl = this.filesToUpload[i]
  }

  onCanvasSave(event){
    //console.log(event)
    this.filesToUpload[this.filesToUpload.length -1] = event
    this.filesToUpload.push(event)
    this._canvasWhiteboardService.clearCanvas()
    this.imageUrl = ''
    console.log('saved')
  }

  removeImage(i){
    this.filesToUpload.splice(i,1)
  }

  saveCurrentData(event){
    let temp = this.canvasWhiteboard.generateCanvasDataUrl("image/jpeg", 1);
    //console.log(temp)
    if(this.filesToUpload.length==0){
      this.filesToUpload.push(temp)
    }else{
      this.filesToUpload[this.filesToUpload.length -1] = temp
    }
  }

  uploadNotes(content){
    this.sweetAlert.warning('Please wait while we process')
    let notes = this.convertToPdf()
    this.pdfToUpload = notes.output('arraybuffer');
    this.modalService.open(content, { centered: true ,backdrop:'static',keyboard:false });
  }

  convertToPdf(){
    
    let temp = new jsPDF({compress: true});

    for(let i=0;i<this.filesToUpload.length;i++){
      if(i==0){
        
        temp.addImage(this.filesToUpload[i],5, 5, 200,110, )
      }
      else if(i%2==1){
        
        temp.addImage(this.filesToUpload[i],5, 140,200, 110)
      }
      else if(i%2==0){
        
        temp.addPage();
        temp.addImage(this.filesToUpload[i],5, 5, 200, 110)
      }
      
    }
    temp.save('notes.pdf')
    return temp;
  }

  cancelModal(modal){
    //console.log('cancelled')
   
    modal.dismiss('cancel click')
  }


  saveData(modal){
    this.sweetAlert.warning('Please wait while we process')
    if((this.subject_id=='') || (this.subject_id == null)){

    }

    //console.log(slot_id,this.subject_id)
    this.sweetAlert.warning('Please wait while we process')
    let date_ = new Date().toISOString()
    //console.log(this.pdfToUpload)
    //console.log(this.pdfToUpload[0])
    let file_ = new Blob([this.pdfToUpload],{type: "application/pdf" })
    //console.log(file_)
    this.service.uploadNotes({
      subject_id:this.subject_id,
      notes_name:'Notes '+date_+'.pdf',
      description:'Black Board Notes',
      file:file_
    }).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetAlert.success_2('Uploaded Notes')
        modal.close('Ok click')
      }else{
        console.log(data)
        this.sweetAlert.failure(data['message'])
      }
    },(err)=>{
      this.sweetAlert.failure(err)
    },()=>{
      //this.loading = false
    })
    //console.log(file_)
    
  }

  ngOnDestroy(){
    this.service.filesToUpload = this.filesToUpload
  }

  

}
