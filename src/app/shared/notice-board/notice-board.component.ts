import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticeBoardService } from 'src/app/services/notice-board.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']
})
export class NoticeBoardComponent implements OnInit {

  type_;
  noticeIssued;
  noticeList;
  selectedbar = 2;

  fileSelected;
  fileToUpload: File = null;

  @ViewChild('myFileInput') myFileInput;
  //category_description, notice_heading, notice_text, notice_file
  noticeForm:FormGroup = new FormGroup({
    notice_id: new FormControl('',[]),
    
    category_description : new FormControl('',[Validators.required]),
    notice_heading : new FormControl('',[Validators.required]),
    notice_text:new FormControl('',[Validators.required]),
    notice_file : new FormControl('',[]),
   
  })

  targetAudience;


  sub2: any;

  constructor(private noticeService:NoticeBoardService,
    private sweetalert:SwalAlertService) {
    let data = localStorage.getItem('userInfoOnlineSchool')
    data = JSON.parse(data)
    if(data){
      this.type_ = data['user_type']
      if(this.type_=='authority'){
        this.targetAudience = [{
          value:'teacher',
          show:'Teachers'},
          {
            value:'student',
            show:'School'
          }]
      }else if(this.type_ == 'class_teacher'){
        this.targetAudience = [
          {
            value:'student',
            show:'Class'}
        ]
      }
    }else{
      //this.router.navigate(['home'])
    }


    const control3 = this.noticeForm.get('notice_file');
    this.sub2 = control3.valueChanges.subscribe(value=>{
      //console.log(value)
      if((value!='') && (value!=null)){
        let temp2 = value.split('\\')
        this.fileSelected = temp2[temp2.length-1]
      }
    })


  }

  ngOnInit(): void {
    
    if(this.noticeService.noticeList == null){
      this.noticeService.getNoticeList().subscribe((data)=>{
        if(data['status']=='success'){
          this.noticeList = data['message']
          this.noticeService.noticeList = this.noticeList
        }else{
          console.log('Failed to fetch',data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.noticeList = this.noticeService.noticeList;
    }
    if((this.type_ == 'authority') || (this.type_ =='class_teacher')){
      if(this.noticeService.noticeIssued==null){
        this.noticeService.getCreatedNoticeList().subscribe((data)=>{
          if(data['status']=='success'){
            this.noticeIssued = data['message']
            this.noticeService.noticeIssued = this.noticeIssued
          }else{
            console.log('Failed to fetch',data['message'])
          }
        },(err)=>{
          console.log(err)
        })
      }else{
        this.noticeIssued = this.noticeService.noticeIssued
      }
    }
    
    

  }

  setSelection(i){
    this.selectedbar = i
  }

  renderClass(i){
    if((+this.selectedbar) ==(+i)){
      return 'active';
    }else{
      return '';
    }
  }

  

  downloadFile(notice){
    window.open(notice.notice_file, '_blank')
  }

  

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    
  }

  publishNotice(notice,index){
    this.noticeService.publishNotice({notice_id:notice.notice_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetalert.success_2('Published')
        this.noticeIssued[index]['is_published']=true
        this.noticeList.push(this.noticeIssued[index])
      }else{
        this.sweetalert.failure(data['message'])
      }
    },(err)=>{
      this.sweetalert.failure(err)
    })
  }


  editNotice(notice,index){
    this.selectedbar = 0
    console.log(notice)
    this.noticeForm.patchValue({
      notice_id: notice.notice_id,
      category_description : notice.category_description[0],
      notice_heading : notice.notice_heading,
      notice_text: notice.notice_text
    })
    this.noticeForm.controls['category_description'].disable()
  }

  deleteNotice(notice,index){
    this.noticeService.deleteNotice({notice_id:notice.notice_id}).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetalert.success_2('Deleted!!!')
        this.noticeIssued.splice(index,1)
      }else{
        this.sweetalert.failure(data['message'])
      }
    },(err)=>{
      this.sweetalert.failure(err)
    })
    
  }

  createNotice(){
    let temp_ = this.noticeForm.value
    temp_['file'] = this.fileToUpload
    this.sweetalert.warning('Please wait while we process')
    this.noticeService.createNotice(temp_).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetalert.success_2('Notice Created')
        temp_['notice_id'] = data['notice_id']
        temp_['issue_dt'] = new Date().toISOString()
        temp_['category_description'] = [temp_['category_description']]
        this.noticeIssued.push(temp_)
        this.noticeForm.reset()
        this.removeFile();
      }else{
        this.sweetalert.failure(data['message'])
      }
    },(err)=>{
      this.sweetalert.failure(err)
    })
  }

  updateNotice(){
    let temp_ = this.noticeForm.value
    temp_['file'] = this.fileToUpload
    this.sweetalert.warning('Please wait while we process')
    this.noticeService.updateNotice(temp_).subscribe((data)=>{
      if(data['status']=='success'){
        this.sweetalert.success_2('Notice Created')
        this.noticeForm.reset()
        this.removeFile();
        this.noticeService.noticeIssued=null;
        this.ngOnInit()
      }else{
        this.sweetalert.failure(data['message'])
      }
    },(err)=>{
      this.sweetalert.failure(err)
    })
  }

  removeFile(){
    this.myFileInput.nativeElement.value = '';
    this.fileToUpload = null;
    this.fileSelected = '';
  }

  resetForm(){
    this.noticeForm.reset();
    this.removeFile();
    this.noticeForm.controls['category_description'].enable()
  }

  ngOnDestroy(){
    console.log('unsubscribed subjects')
    if(this.sub2){
      this.sub2.unsubscribe()
    }
    
  }

}
