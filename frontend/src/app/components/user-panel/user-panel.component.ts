import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component'
import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})

export class UserPanelComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){
  }

  ngOnInit(){
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/'])
  }

}
