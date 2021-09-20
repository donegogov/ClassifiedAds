import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../_services/admin.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class AdminManagementResolver implements Resolve<any[]> {
    constructor(private adminService: AdminService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        return this.adminService.getUsersWithRoles().pipe(
            catchError(error => {
                // this.alertify.error('Problem retrieving data ' + error);
                this.alertify.error('Проблем со податоците ' + error);
                this.router.navigate(['/ads-list']);
                return of(null);
            })
        );
    }
}
