import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../../models/user';
import {UserService } from '../../services/user.service';


@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  providers: [UserService]

})

export class ControlPanelComponent implements OnInit, DoCheck {
  public identity;


  constructor(
      private userService: UserService
  ) {
   }

  ngOnInit(){
  }


  ngDoCheck(){
    this.identity = this.userService.getIdentity();
  }

}
