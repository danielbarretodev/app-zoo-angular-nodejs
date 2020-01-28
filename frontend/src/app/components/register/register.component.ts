import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public message: string;
  private password_aux: string;
  private registro_complete: boolean;
  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    private _userService: UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.registro_complete = false;
    }

  ngOnInit() {

  }

  onSubmit(){
    console.log(this.user);
    this.user.password= this.password_aux;
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        if(response.user._id)
        //datos actualizados
        this.user = response.user;
        this.registro_complete = true;
        console.log(this.user.password);

      },
      error => {
          console.log('holi');
          console.log(<any>error);
      }
    );
  }

}
