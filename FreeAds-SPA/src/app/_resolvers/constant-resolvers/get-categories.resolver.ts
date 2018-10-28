import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantService } from 'src/app/_services/constant.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Categories } from 'src/app/_models/constants/categories';

@Injectable()
export class GetCategoriesResolver implements Resolve<Categories[]> {
    constructor(private constantService: ConstantService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Categories[]> {
        return this.constantService.getCategories().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
