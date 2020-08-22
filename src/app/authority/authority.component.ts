import { Component, OnInit } from '@angular/core';
import { SideBarToggleService } from '../services/side-bar-toggle.service';
import { AuthorityService } from './authority-service';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {

  sub1;

  sideBarContent:string[][]=[['Dashboard',''],
                            ['Manage Class','manage-class'],
                            ['Notice Board','notice-board'],
                            ['Add School Member','add-school-member'],
                            ['View School Member','view-school-member'],
                            ['Profile and  Settings ','profile']];
                            
  constructor(public sideBarService:SideBarToggleService,
    private service: AuthorityService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    console.log('unsubscribed authority')
    this.service.dashBoardData =null;
    this.service.authorityList = null;
    this.service.teacherList = null;
    this.service.studentList = null;
    this.service.slotList = null;
    this.service.classList = null;
    this.service.profileData = null;
  }

}
