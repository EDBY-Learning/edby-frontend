import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarToggleService {
  public sideBar:boolean = false;
  constructor() { }

  public toggleSideBar(){
    this.sideBar = !this.sideBar;
  }


}
