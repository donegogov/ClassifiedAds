import { Injectable } from '@angular/core';
import {map, take} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { UserForToken } from '../_models/user-for-token';
import { UserForRegister } from '../_models/user-for-register';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

constructor(private http: HttpClient) { }

unsubscribe() {
  this.currentUserSource.unsubscribe();
}

login(model: any) {
  let userForLoginDto: FormData = new FormData();
  userForLoginDto.append('Username', model.username);
  userForLoginDto.append('Password', model.password);

  return this.http.post(this.baseUrl + 'login/', userForLoginDto).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        //localStorage.setItem('token', user.token);
        //this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.setCurrentUser(user);
      }
    })
  );
}

register(user: UserForRegister) {
  let userForRegisterDto: FormData = new FormData();
  userForRegisterDto.append('Username', user.username);
  userForRegisterDto.append('Password', user.password);
  userForRegisterDto.append('City', user.city);

  return this.http.post(this.baseUrl + 'register', userForRegisterDto);
}

loggedIn() {
  this.currentUser$
    .pipe(take(1)).subscribe(user => {
      if (user) {
        console.log('true');
        return true;
      }
    });
  console.log('false');
  return false;
}

creteToken(idUser: string, usernameUser: string) {
  const user: UserForToken = {
    id: idUser,
    username: usernameUser
  };
  return this.http.post(this.baseUrl + 'token', user).pipe(
    map((response: any) => {
      const token = response;
      if (token) {
        localStorage.removeItem('token');
        localStorage.setItem('token', token.token);
        this.decodedToken = this.jwtHelper.decodeToken(token.token);
      }
    })
  );
}

getDecodedToken(token) {
  return JSON.parse(atob(token.split('.')[1]));
}

setCurrentUser(user: User) {
  user.roles = [];
  const roles = this.getDecodedToken(user.token).role;
  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('user', JSON.stringify(user));
  this.currentUserSource.next(user);
}

logout() {
  localStorage.removeItem('user');
  this.currentUserSource.unsubscribe();
}

}
