import { Component, OnInit } from '@angular/core';
import { SideBarToggleService } from 'src/app/services/side-bar-toggle.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  sideBarContent:string[][]=[['Home',''],['About','about'],['Blog','blog']];

  constructor(public sideBarService:SideBarToggleService) { }

  ngOnInit(): void {
  }

}
