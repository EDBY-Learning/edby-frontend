import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { GridCore } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

import { SwalAlertService } from 'src/app/services/swal-alert.service';
import { TeachersService } from '../../teachers-service';

@Component({
  selector: 'app-check-homework',
  templateUrl: './check-homework.component.html',
  styleUrls: ['./check-homework.component.scss']
})
export class CheckHomeworkComponent implements OnInit {

  staticAlert;
  staticAlertMarks;

  sub1;
  class;
  section;
  homeworkList;
  homeworkSelected=null;

  submissionList;
  
  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  columnTypes;
  rowSelection;
  rowData: [];
  selectedNodes: any;
  selectedStudent;
  marks;
  subject_id: any;




  constructor(private route: ActivatedRoute,
              private service: TeachersService,
              private sweetAlert: SwalAlertService,
              private modalService: NgbModal) { 
    this.columnDefs = [
          {headerName:'Name',field:'student_name'},
          /*{headerName:'Graded',field:'is_checked',
            valueGetter:function(params){
              if((params.data.is_checked == 'false')||(params.data.is_checked == false)){
                return 'Not Checked'
              }else{
                return 'Checked'
              }
            }  
        },*/
          {headerName:'Submission Date',field:'submission_time',
          cellRenderer: (data) => {
            return data.value ? (new Date(data.value)).toLocaleDateString() + ' '+(new Date(data.value)).toLocaleTimeString() : '';
        }},
          //{headerName:'File',field:'submission_file'},
          {headerName:'Marks',field:'marks'}
    ];

    
    this.defaultColDef = {
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      resizable: true,
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn,
    };
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter',
      }
    };
    this.rowSelection = 'single';
  }

  ngOnInit(): void {
    this.class = this.route.snapshot.params.class
    this.section = this.route.snapshot.params.section
    this.subject_id = this.route.snapshot.params.subject_id
    if(this.service.homeworkList !=null){
      this.homeworkList = this.service.homeworkList
    }else{
      this.service.getHomework({subject_id:this.subject_id}).subscribe((data)=>{
        if(data['status']=='success'){
          this.homeworkList = data['message']
          this.service.homeworkList = this.homeworkList
        }else{
          console.log(data)
        }
      },(err)=>{
        console.log(err)
      })
    }
    

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if(this.submissionList){
      this.rowData = this.submissionList;
    }
    
  }

  homeworkSubmission(val){
    if((this.homeworkSelected==null) || (this.homeworkSelected?.homework_id != val.homework_id)){
      this.homeworkSelected = val;
      this.service.getHomeworkSubmission({homework_id:val.homework_id}).subscribe((data)=>{
        console.log(data)
        if(data['status']=='success'){
          this.submissionList = data['message'];
          this.rowData = this.submissionList
          //this.gridApi.gridCore.gridOptions.api.setRowData(this.submissionList);
        }else{
          console.log(data)
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      //pass
    }
    
  }

  approveHome(val){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.value) {

        this.service.approveHomwork({homework_id:val.homework_id}).subscribe((data)=>{
          if(data['status']='success'){
            this.sweetAlert.success_2(data['message'])
            this.homeworkSelected = null;
            
            this.homeworkList.forEach((item,index) => {
              if(item['homework_id']==val.homework_id){
                this.homeworkList[index]['is_published'] = true;
                this.service.homeworkList = this.homeworkList;
              }
            }); 
            //this.service.homeworkList = null;
            //this.ngOnInit()
          }else{
            this.sweetAlert.failure(data['message'])
          }
        },(err)=>{
          this.sweetAlert.failure(err)
        })
      }
    })    
  }

  downloadFile(test){
    window.open(test.homework_file,'_blank')
  }

  downloadStudentSubmission(){
    this.selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = this.selectedNodes.map(node => node.data);
    if(this.selectedNodes.length!=1){
      this.staticAlert = true
    }else{
       
      window.open(this.selectedNodes[0].data.submission_file,'_blank')
    } 
  }
  //important
  selectHomework(val){
    
    console.log(val)

    //console.log(this.gridApi.gridCore.gridOptions.api)
    this.gridApi.gridCore.gridOptions.api.setRowData(val.studentList);
    //this.gridApi.gridOptions.api.refreshCells({force : true});
  }

  onRowClicked(event){
    //console.log('Clicked Row',event.data)
  
    //this.modal.open(ClassTimetableComponent,{ size: 'lg' });
  }

  
  isFirstColumn(params) {
    let displayedColumns = params.columnApi.getAllDisplayedColumns();
    let thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  updateMarks(content){
    this.selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = this.selectedNodes.map(node => node.data);
    if(this.selectedNodes.length!=1){
      this.staticAlert = true
    }else{
      //console.log(this.selectedNodes[0].data)   
      this.selectedStudent = this.selectedNodes[0].data
      this.marks = this.selectedStudent.marks
      this.modalService.open(content, { centered: true }); 
      
    } 
  }

  saveData(modal){
    if((+this.marks)> (+this.homeworkSelected.maximum_marks)){
      this.staticAlertMarks =true;
    }else{
      console.log(this.selectedStudent.submission_id)
      this.service.gradeHomework({
        submission_id:this.selectedStudent.submission_id,
        marks:this.marks
      }).subscribe((data)=>{
        if(data['status']=='success'){
          this.sweetAlert.success_2(data['message'])
          let temp = this.selectedNodes[0].data
          temp['marks'] = this.marks
          this.selectedNodes[0].setData(temp)
          this.marks = 0
        }else{
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        this.sweetAlert.failure(err)
      },()=>{
        modal.close('Ok click')
      })
    }
  }

  cancelModal(modal){
    //console.log('cancelled')
    this.marks = 0
    modal.dismiss('cancel click')
  }

  ngOnDestroy(){
    console.log('unsubscribed subjects')
    //this.sub1.unsubscribe()
  }

}
