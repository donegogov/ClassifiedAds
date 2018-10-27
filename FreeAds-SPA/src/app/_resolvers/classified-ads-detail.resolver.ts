import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ClassifiedAdsDetail } from '../_models/classified-ads-detail';
import { ClassifiedAdsService } from '../_services/classifiedAds.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ClassifiedAdsDetailResolver implements Resolve<ClassifiedAdsDetail> {
    constructor(private classifiedAdsService: ClassifiedAdsService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ClassifiedAdsDetail> {
        return this.classifiedAdsService.getClassifiedAdsDetail(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data ' + error);
                console.log(error);
                this.router.navigate(['/ads-list']);
                return of(null);
            })
        );
    }
}
