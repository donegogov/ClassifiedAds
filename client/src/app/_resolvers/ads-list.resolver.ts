import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ClassifiedAdsService } from '../_services/classifiedAds.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ClassifiedAdsList } from '../_models/classified-ads-list';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AdsListResolver implements Resolve<ClassifiedAdsList[]> {
    pageNumber = 1;
    pageSize = 12;

    constructor(private classifiedAdsService: ClassifiedAdsService, private router: Router,
        private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ClassifiedAdsList[]> {
      let id: string = '123';
          this.authService.currentUser$.pipe(take(1)).subscribe(user => {
            id = user.id;
          });
        if (id == '123') {
            return this.classifiedAdsService.getClassifiedAds(this.pageNumber, this.pageSize).pipe(
                catchError(error => {
                    // this.alertify.error('Problem retrieving data ' + error);
                    this.alertify.error('Проблем со податоците ' + error);
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
        }
        else {
          return this.classifiedAdsService.getRelevantClassifiedAds(this.pageNumber, this.pageSize,
                    id).pipe(
            catchError(error => {
                // this.alertify.error('Problem retrieving data ' + error);
                this.alertify.error('Проблем со податоците ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
          );
        }
    }
}
