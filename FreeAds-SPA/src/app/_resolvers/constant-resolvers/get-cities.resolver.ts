import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cities } from 'src/app/_models/constants/cities';
import { ConstantService } from 'src/app/_services/constant.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Injectable()
export class GetCitiesResolver implements Resolve<Cities[]> {
    constructor(private constantService: ConstantService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Cities[]> {
        return this.constantService.getCities().pipe(
            catchError(error => {
                // this.alertify.error('Problem retrieving data ' + error);
                this.alertify.error('Проблем со податоците ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
