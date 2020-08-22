import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorityService } from '../../authority-service';
import { SwalAlertService } from 'src/app/services/swal-alert.service';

@Component({
  selector: 'app-authority-list',
  templateUrl: './authority-list.component.html',
  styleUrls: ['./authority-list.component.scss']
})
export class AuthorityListComponent implements OnInit {

  authorityList:any;
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
              private service: AuthorityService,
              private sweetAlert: SwalAlertService) {
                this.columnDefs = [
                  {
                    headerName:'Authority Basic Detail',
                    children:[
                      {headerName:'authority_id',field:'authority_id',hide:true},
                      {headerName:'school_id',field:'school_id',hide:true},
                      {headerName:'School',field:'school_name',hide:true},
                      {headerName:'first_password',field:'first_password',hide:true},
                      {headerName:'username',field:'username',hide:true},
                      {headerName:'Name',field:'authority_name'},
                      {headerName:'Designation',field:'designation'},
                      //{headerName:'Power',field:'power_level',hide:true}
                    ]
                  },
                  {
                    headerName:'Contact Information',
                    children:[
                      {headerName:'Email',field:'email'},
                      {headerName:'Mobile',field:'mob_no'},
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
    if(this.service.authorityList==null){
      this.service.getAuthorityList().subscribe((data)=>{
        //console.log(data)
        if(data['status']=='success'){
          this.authorityList = data['message']
          this.service.authorityList = this.authorityList
          this.rowData = this.authorityList
          //this.gridApi.gridCore.gridOptions.api.setRowData(this.authorityList);
        }else{
          console.log(data)
          this.sweetAlert.failure(data['message'])
        }
      },(err)=>{
        console.log(err)
      },()=>{
        
      })
    }else{
      this.authorityList = this.service.authorityList
      this.rowData = this.authorityList
    }
    
  }

  refresh(){
    this.service.authorityList = null;
    this.ngOnInit()
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.rowData = this.authorityList;
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
      //when need to save data for update
      //this.service.setSelectedAuthority(selectedNodes[0].data)    
      this.router.navigate(['../add-authority'],{relativeTo:this.route});
    }
    
    
  }

  getParams() {
    return {
      //allColumns: true,
      columnGroups: false,
      columnKeys: ['authority_name','email','mob_no','first_password','username'],
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
