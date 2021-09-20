import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.alertify.error('You shall not pass!')
      })
    )
    // this.alertify.error('Link Not Allowed');
    //this.alertify.error('Линкот не е дозволен');
    //this.router.navigate(['/home']);
    //return false;
  }
}
