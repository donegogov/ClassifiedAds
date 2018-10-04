import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { UserForToken } from '../_models/user-for-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login/', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

creteToken(idUser: number, usernameUser: string) {
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
}
