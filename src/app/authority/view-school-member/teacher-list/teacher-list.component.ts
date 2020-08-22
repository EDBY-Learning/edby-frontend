import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorityService } from '../../authority-service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

  teacherList:any;
  //teacherList$: BehaviorSubject<any> = new BehaviorSubject(null);
  staticAlert;

  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  columnTypes;
  rowSelection;
  rowData:  BehaviorSubject<any> = new BehaviorSubject(null);
  sub1: any;
  sub2: any;
  
  constructor(private route: ActivatedRoute,
              private router:Router,
              private service: AuthorityService,
              private sweetAlert: SwalAlertService) {
    this.columnDefs = [
      {
        headerName:'Teacher Basic Detail',
        children:[
          {headerName:'teacher_id',field:'teacher_id',hide:true},
          {headerName:'school_id',field:'school_id',hide:true},
          {headerName:'School',field:'school_name',hide:true},
          {headerName:'first_password',field:'first_password',hide:true},
          {headerName:'username',field:'username',hide:true},
          {headerName:'Name',field:'teacher_name'},
          {headerName:'is_class_teacher',field:'is_class_teacher',hide:true}
        ]
      },
      {
        headerName:'Contact Information',
        children:[
          {headerName:'Email',field:'email'},
          {headerName:'Mobile',field:'mob_no'}
        ]
      },
      {
        headerName:'Class Information',
        children:[
          {headerName:'Class',field:'class_name'},
          {headerName:'Section',field:'section'},
        ]
      },
      {
        headerName:'Home Address',
        children:[
          {headerName:'Address',field:'addr'},
          {headerName:'City',field:'city'},
          {headerName:'State',field:'state'},
          {headerName:'Nation',field:'nation'},
          {headerName:'Pincode',field:'pincode'}
        ]
      }
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
    if(this.service.teacherList == null){
      this.service.getTeacherList().subscribe((data)=>{
        if(data['status']=='success'){
         this.teacherList = data['message']
         this.service.teacherList = this.teacherList
         this.rowData = this.teacherList
         //if(this.teacherList){
           //this.gridApi.gridCore.gridOptions.api.setRowData(this.teacherList);
         //}
        }else{
         console.log(data)
         this.sweetAlert.failure(data['message'])
        }
      })
    }else{
      this.teacherList = this.service.teacherList
      this.rowData = this.teacherList
    }
     
  }

  refresh(){
    this.service.teacherList = null;
    this.ngOnInit()
  }

  onGridReady(params) {
    
    this.gridApi = params.api;
    //console.log(this.gridApi)
    this.gridColumnApi = params.columnApi;
    //this.rowData = this.teacherList;
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

  updateData(){
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    if(selectedNodes.length!=1){
      this.staticAlert = true
    }else{
      //console.log('updating data for',selectedNodes[0].data)
      this.service.setSelectedTeacher(selectedNodes[0].data)    
      this.router.navigate(['../add-teacher'],{relativeTo:this.route});
    }
    
    
  }

  getParams() {
    return {
      //allColumns: true,
      columnGroups: false,
      columnKeys: ['teacher_name','email','mob_no','class_name','section','first_password','username'],
      skipHeader: false,
      };
  }

  onBtnExportDataAsCsv() {
    let params = this.getParams();
    this.gridApi.exportDataAsCsv(params);
  }

  ngOnDestroy(){
    //this.sub1.unsubscribe()
    //this.sub2.unsubcribe()
  }

}
