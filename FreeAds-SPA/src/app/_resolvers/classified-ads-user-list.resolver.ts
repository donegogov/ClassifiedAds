import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ClassifiedAdsService } from '../_services/classifiedAds.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClassifiedAdsForUser } from '../_models/classified-ads-for-user';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class ClassifiedAdsUserListResolver implements Resolve<ClassifiedAdsForUser[]> {
    constructor(private classifiedAdsService: ClassifiedAdsService, private router: Router,
        private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ClassifiedAdsForUser[]> {
        return this.classifiedAdsService.getClassifiedAdsForUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                console.log('error');
                this.alertify.error('Problem retrieving data ' + error);
                this.router.navigate(['/ads-list']);
                return of(null);
            })
        );
    }
}
