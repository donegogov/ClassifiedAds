import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassifiedAdsList } from '../_models/classified-ads-list';
import { ClassifiedAdsDetail } from '../_models/classified-ads-detail';
import { ClassifiedAdsForUser } from '../_models/classified-ads-for-user';
import { ClassifiedAdsForUserUpdate } from '../_models/classified-ads-for-user-update';

@Injectable({
  providedIn: 'root'
})
export class ClassifiedAdsService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getClassifiedAds(): Observable<ClassifiedAdsList[]> {
  return this.http.get<ClassifiedAdsList[]>(this.baseUrl + 'classifiedads');
}

getClassifiedAdsDetail(id: number): Observable<ClassifiedAdsDetail> {
  return this.http.get<ClassifiedAdsDetail>(this.baseUrl + 'classifiedads/' + id);
}

getClassifiedAdsForUserUpdate(id: number): Observable<ClassifiedAdsForUserUpdate> {
  return this.http.get<ClassifiedAdsForUserUpdate>(this.baseUrl + 'classifiedads/' + id);
}

getClassifiedAdsForUser(id: number): Observable<ClassifiedAdsForUser> {
  return this.http.get<ClassifiedAdsForUser>(this.baseUrl + 'classifiedads/user/' + id);
}

updateClassifiedAd(id: number, classifiedAdsForUserUpdate: ClassifiedAdsForUserUpdate) {
  return this.http.put(this.baseUrl + 'classifiedads/' + id, classifiedAdsForUserUpdate);
}

setMainPhoto(userId: number, classifiedAdId: number, photoId: number) {
  return this.http.post(this.baseUrl + userId + '/photos/' + classifiedAdId + '/setMain/' + photoId, {});
}

}
