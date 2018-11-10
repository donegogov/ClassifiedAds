import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ClassifiedAdsList } from '../_models/classified-ads-list';
import { ClassifiedAdsDetail } from '../_models/classified-ads-detail';
import { ClassifiedAdsForUser } from '../_models/classified-ads-for-user';
import { ClassifiedAdsForUserUpdate } from '../_models/classified-ads-for-user-update';
import { SearchQueryParametars } from '../_models/search-query-parametars';
import { ClassifiedAdsForRegister } from '../_models/classified-ads-models/classified-ads-for-register';


@Injectable({
  providedIn: 'root'
})
export class ClassifiedAdsService {
  baseUrl = environment.apiUrl;
  classifiedAdsFromSearch = new BehaviorSubject<ClassifiedAdsList[]>([]);
  classifiedAdsList = this.classifiedAdsFromSearch.asObservable();

constructor(private http: HttpClient) { }

getRelevantClassifiedAds(): Observable<ClassifiedAdsList[]> {
  return this.http.get<ClassifiedAdsList[]>(this.baseUrl + 'classifiedads/relevant');
}

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

deletePhoto(userId: number, classifiedAdId: number, photoId: number) {
  return this.http.delete(this.baseUrl + userId + '/photos/' + classifiedAdId + '/' + photoId);
}

searchQuery(searchQueryParametars: SearchQueryParametars): Observable<ClassifiedAdsList[]> {
  return this.http.post<ClassifiedAdsList[]>(this.baseUrl + 'classifiedads/search', searchQueryParametars);
}

changeClassifiedAdsListFromSearch(classifiedAdsList: ClassifiedAdsList[]) {
  this.classifiedAdsFromSearch.next(classifiedAdsList);
}

createClassifiedAds(id: number, classifiedAdsForRegister: ClassifiedAdsForRegister): Observable<ClassifiedAdsForRegister> {
  return this.http.put<ClassifiedAdsForRegister>(this.baseUrl + 'classifiedads/add/' + id, classifiedAdsForRegister);
}

}
