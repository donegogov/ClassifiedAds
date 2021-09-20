import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ClassifiedAdsService } from '../_services/classifiedAds.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClassifiedAdsList } from '../_models/classified-ads-list';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class GetClassifiedAdsForSearchResolver implements Resolve<ClassifiedAdsList[]> {
    pageNumber = 1;
    pageSize = 12;

    constructor(private classifiedAdsService: ClassifiedAdsService, private router: Router,
        private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ClassifiedAdsList[]> {

            return this.classifiedAdsService.getClassifiedAdsForSearch().pipe(
                catchError(error => {
                    // this.alertify.error('Problem retrieving data ' + error);
                    this.alertify.error('Проблем со податоците ' + error);
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
