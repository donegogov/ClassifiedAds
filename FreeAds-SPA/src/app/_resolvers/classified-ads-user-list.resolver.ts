import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ClassifiedAdsService } from '../_services/classifiedAds.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClassifiedAdsForUser } from '../_models/classified-ads-for-user';

@Injectable()
export class ClassifiedAdsUserListResolver implements Resolve<ClassifiedAdsForUser[]> {
    constructor(private classifiedAdsService: ClassifiedAdsService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ClassifiedAdsForUser[]> {
        return this.classifiedAdsService.getClassifiedAdsForUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data ' + error);
                this.router.navigate(['/ads-list']);
                return of(null);
            })
        );
    }
}
