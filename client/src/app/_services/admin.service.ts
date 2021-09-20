import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<any[]>(this.baseUrl + 'admin/user-with-roles/');
  }

  updateUserRoles(id: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + id + '?roles=' + roles, {});
  }

  approveOrDissapproveClassifiedAds(id: string, approveOrDissapprove: string) {
    let formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('approveOrDisapprove', approveOrDissapprove);

    return this.http.post(this.baseUrl + 'admin/approve-or-disaprove-classified-ads-and-photos/', formData);
  }
}
