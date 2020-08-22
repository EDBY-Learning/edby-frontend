import { Component, OnInit, Input } from '@angular/core';
import { SideBarToggleService } from 'src/app/services/side-bar-toggle.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  //[[content,route],[],..]
  @Input() sideBarContent:string[][]=[];
  

  constructor(public toggle:SideBarToggleService,
              private route: ActivatedRoute,
              private router:Router) { 
    //console.log(this.route)
    
  }

  ngOnInit(): void {
    //console.log(this.sideBarContent)
  }

  showHide(){
    return this.toggle.sideBar;
  }

  naviagteTo(link){
    this.toggle.toggleSideBar();
    //console.log('/'+link,this.router.routerState.snapshot.url)
    this.router.navigate(['./'+link],{relativeTo:this.route});
    //this.router.navigateByUrl(this.router.routerState.snapshot.url+'/'+link);

  }

}
