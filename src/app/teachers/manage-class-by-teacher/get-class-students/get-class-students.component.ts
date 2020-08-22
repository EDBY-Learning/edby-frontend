import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeachersService } from '../../teachers-service';

@Component({
  selector: 'app-get-class-students',
  templateUrl: './get-class-students.component.html',
  styleUrls: ['./get-class-students.component.scss']
})
export class GetClassStudentsComponent implements OnInit {

  studentList:any;
  staticAlert;

  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  columnTypes;
  rowSelection;
  rowData: [];
  sub1: any;
  sub2: any;
  
  constructor(private router:Router,
    private route: ActivatedRoute,
    private service: TeachersService) {
    this.columnDefs = [
      {
        headerName:'Student Basic Detail',
        children:[
          {headerName:'Name',field:'student_name'},
          {headerName:'student_id',field:'student_id',hide:true},
          {headerName:'school_id',field:'school_id',hide:true},
          {headerName:'school_name',field:'school_name',hide:true},
          {headerName:'first_password',field:'first_password',hide:true},
          {headerName:'username',field:'username',hide:true},
        ]
      },
      {
        headerName:'Class Information',
        children:[
          {headerName:'Class',field:'class_name'},
          {headerName:'Section',field:'section'},
          {headerName:'Class Teacher',field:'class_teacher'},
          {headerName:'Roll',field:'roll'},

        ]
      },
      {
        headerName:'Student Contact Detail',
        children:[
          {headerName:'Student Email',field:'email'},
          {headerName:'Student Mobile',field:'mob_no'}
        ]
      },
      {
        headerName:'Parent Contact Info',
        children:[
          {headerName:'Parent Mobile 1',field:'parent_mob_no_1'},
          {headerName:'Parent Mobile 2',field:'parent_mob_no_2'},
          {headerName:'Parent Email',field:'parent_email'},
        ]
      },
      {
        headerName:'Student Home Address',
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
    if(this.service.classStudentList ==null){
      this.sub1 = this.service.getStudents().subscribe((data)=>{
        if(data['status']=='success'){
          this.studentList = data['message']
          this.rowData = this.studentList
          this.service.classStudentList = this.studentList
          //this.gridApi.gridCore.gridOptions.api.setRowData(data['message']);
        }
       })
    }else{
      this.studentList = this.service.classStudentList
        this.rowData = this.studentList
    }

     
  }

  refresh(){
    this.service.classStudentList = null;
    this.ngOnInit()
    //this.gridApi.gridCore.gridOptions.api.setRowData(this.studentList);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.rowData = this.studentList;
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
      this.service.setSelectedStudent(selectedNodes[0].data)    
      this.router.navigate(['../edit-student-info'],{relativeTo:this.route});
    }
    
    
  }

  getParams() {
    return {
      //allColumns: true,
      columnGroups: false,
      columnKeys: ['student_name','class_name','section','roll','parent_mob_no_1','first_password','username'],
      skipHeader: false,
      };
  }

  onBtnExportDataAsCsv() {
    let params = this.getParams();
    this.gridApi.exportDataAsCsv(params);
  }

  ngOnDestroy(){
    if(this.sub1!=null){
      this.sub1.unsubscribe()
    }
  }

}
