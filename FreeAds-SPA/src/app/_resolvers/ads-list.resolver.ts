import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ClassifiedAdsService } from '../_services/classifiedAds.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClassifiedAdsList } from '../_models/classified-ads-list';

@Injectable()
export class AdsListResolver implements Resolve<ClassifiedAdsList[]> {
    constructor(private classifiedAdsService: ClassifiedAdsService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ClassifiedAdsList[]> {
        return this.classifiedAdsService.getClassifiedAds().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
