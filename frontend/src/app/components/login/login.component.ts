import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  private user: User;
  private identity;
  private token;
  private status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private userService: UserService
  ) {

    }

  ngOnInit() {
    console.log('login.component cargado !!');
      this.user = new User('','','','','','ROLE_USER','');
  }

  onSubmit(){
    //primero conseguimos el usuario
    this.userService.singup(this.user).subscribe(

        response => {
        //  this.token = response['token'];
          this.identity = response.user;

          if(!this.identity || !this.identity._id ){
            this.status='error';
            alert('El usuario no se ha logueado correctamente');
          }else
          {
              this.identity.password= '';

              localStorage.setItem('identity', JSON.stringify(this.identity));
                  //mostramos el token
                  /**
                  * Identity tiene la contraseña cifrada, si metemos identity
                  * el backend nos arrojaría un error, es user quien aun tiene la contraseña plana
                  **/
                  this.userService.singup(this.user,'true').subscribe(

                      response => {
                      //this.token = response['token'];
                      this.token = response.token;


                        if(this.token.length <= 0){
                          alert('El token no se ha generado');
                        }else {
                          //mostramos el token
                          localStorage.setItem('token', this.token);

                          this.status = 'success';
                        }

                      //  console.log(this.token);
                      },

                      error => {
                        this.status = 'error';
                        console.log(<any>error);
                      }
                  //  console.log(this.token);
                );
          }
        },

        error => {
          this.status = 'error';
          console.log(<any>error);
        }

      );
    }

    logout(){
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/']);
    }
}
