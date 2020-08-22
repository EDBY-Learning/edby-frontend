import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassTimetableComponent } from '../class-timetable/class-timetable.component';
import { AuthorityService } from '../../authority-service';

@Component({
  selector: 'list-classes-details',
  templateUrl: './list-classes-details.component.html',
  styleUrls: ['./list-classes-details.component.scss']
})
export class ListClassesDetailsComponent implements OnInit {


  classList:any=[];

  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  columnTypes;
  rowData: [];
  sub1: any;
  slotList=null;
  numPeriod;
  
  constructor(private modal: NgbModal,
    private service: AuthorityService) {
    this.columnDefs = [
      {
        headerName: 'Class Name',
        field: 'class_name',
      },
      {
        headerName: 'Section',
        field: 'section',
      },
      {
        headerName: 'Class Teacher',
        field: 'class_teacher_name'
      }
    ];
    this.defaultColDef = {
      flex: 1,
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      resizable: true,
    };
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter',
      },
    };
  }

  ngOnInit(): void {
    if(this.service.slotList == null){
      this.service.getSlots().subscribe((data)=>{
        if(data['status']=='success'){
          this.slotList = data['message']
          this.numPeriod = this.slotList.length/7
          //console.log(this.SlotList,'success')
        }else{
          console.log(data['message'])
        }
      },(err)=>{
        console.log(err)
      })
    }else{
      this.slotList = this.service.slotList
      this.numPeriod = this.slotList.length/7
    }

    if(this.service.classList == null){
      this.service.getClassList().subscribe((data)=>{
        //console.log(data)
        if(data['status']=='success'){
          let temp = data['message'];
          this.service.classList = temp;
          for(let i=0; i<temp.length;i++){
            if((temp[i]['class_teacher_name']!='')){
              this.classList.push(temp[i])
            }
          }
          this.rowData = this.classList
        }
      })
    }else{
      let temp = this.service.classList;
        for(let i=0; i<temp.length;i++){
          if((temp[i]['class_teacher_name']!='')){
            this.classList.push(temp[i])
          }
        }
        this.rowData = this.classList
    }

    
  }

  refresh(){
    this.service.classList = null;
    this.service.slotList = null;
    this.ngOnInit()
  }

  onGridReady(params) {
    this.gridApi = params.api;
    //this.gridApi.setDomLayout('autoHeight');
    this.gridColumnApi = params.columnApi;
    //this.rowData = this.classList;
  }

  onRowClicked(event){
    //console.log('Clicked Row',event.data.class_name)
    const modalRef =this.modal.open(ClassTimetableComponent,{ size: 'lg' });
    modalRef.componentInstance.class = event.data.class_name
    modalRef.componentInstance.section = event.data.section
    modalRef.componentInstance.numPeriod = this.numPeriod
    //console.log(event.data.class_name,event.data.section)
  }

  ngOnDestroy(){
    //this.sub1.unsubscribe()
  }

}
