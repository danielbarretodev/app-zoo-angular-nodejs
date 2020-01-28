import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {GLOBAL} from './global';

@Injectable()
export class UserService{
  public  url: string;
  public identity;
  public token;

  constructor(
    private http: HttpClient
  ){
    this.url = GLOBAL.url;
  }


  register(user): Observable<any>{


    let json = JSON.stringify(user);
    let params = json;
  //  console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url+'register', params, {headers:headers});
  }

  singup(user, gettoken = null): Observable<any>{
    if(gettoken != null){
      user.gettoken = gettoken;
    }

    else if(user.gettoken)
    {
      user.gettoken = null;
    }

    let params = JSON.stringify(user);


    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url+'login', params, {headers:headers});
  }

  getIdentity(){
    this.identity = JSON.parse(localStorage.getItem('identity'));

    if(this.identity== "undefined")
    this.identity = null;

    return this.identity;
  }

  getToken(){
    this.token = localStorage.getItem('token');

    if(this.token== "undefined")
    this.token = null;

    return this.token;
  }

}
