import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ClassifiedAdsList } from '../_models/classified-ads-list';
import { ClassifiedAdsDetail } from '../_models/classified-ads-detail';
import { ClassifiedAdsForUser } from '../_models/classified-ads-for-user';
import { ClassifiedAdsForUserUpdate } from '../_models/classified-ads-for-user-update';
import { SearchQueryParametars } from '../_models/search-query-parametars';
import { ClassifiedAdsForRegister } from '../_models/classified-ads-models/classified-ads-for-register';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClassifiedAdsService {
  baseUrl = environment.apiUrl;
  classifiedAdsFromSearch = new BehaviorSubject<ClassifiedAdsList[]>([]);
  classifiedAdsList = this.classifiedAdsFromSearch.asObservable();
  paginatedResult: PaginatedResult<ClassifiedAdsList[]> = new PaginatedResult<ClassifiedAdsList[]>();

constructor(private http: HttpClient, private authService: AuthService) { }

getRelevantClassifiedAds(page?, itemsPerPage?, userId?: string): Observable<PaginatedResult<ClassifiedAdsList[]>> {
  const paginatedResult: PaginatedResult<ClassifiedAdsList[]> = new PaginatedResult<ClassifiedAdsList[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userId != null) {
    params = params.append('userId', userId.toString());
  }

  return this.http.get<ClassifiedAdsList[]>(this.baseUrl + 'classifiedads/relevant', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        this.paginatedResult = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

getClassifiedAds(page?, itemsPerPage?): Observable<PaginatedResult<ClassifiedAdsList[]>> {
  const paginatedResult: PaginatedResult<ClassifiedAdsList[]> = new PaginatedResult<ClassifiedAdsList[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<ClassifiedAdsList[]>(this.baseUrl + 'classifiedads', {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          this.paginatedResult = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}

getClassifiedAdsDetail(id: string): Observable<ClassifiedAdsDetail> {
  return this.http.get<ClassifiedAdsDetail>(this.baseUrl + 'classifiedads/' + id);
}

getClassifiedAdsForSearch(): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'classifiedads/get-classified-ads-for-search/');
}

getClassifiedAdsForUserUpdate(id: string): Observable<ClassifiedAdsForUserUpdate> {
  let httpParams = new HttpParams();
  httpParams = httpParams.append('id', id);
  console.log(httpParams);

  return this.http.post<ClassifiedAdsForUserUpdate>(this.baseUrl + 'classifiedads/user-created-ads/', httpParams);
}

getClassifiedAdsForUser(id: string): Observable<ClassifiedAdsForUser> {
  let httpParams = new HttpParams();
  httpParams = httpParams.append('Id', id);
  console.log(httpParams);

  return this.http.post<ClassifiedAdsForUser>(this.baseUrl + 'classifiedads/user/', httpParams);
}

updateClassifiedAd(id: string, classifiedAdsForUserUpdate: ClassifiedAdsForUserUpdate) {
  return this.http.put(this.baseUrl + 'classifiedads/' + id, classifiedAdsForUserUpdate);
}

setMainPhoto(userId: string, classifiedAdId: string, photoId: string) {
  return this.http.post(this.baseUrl + userId + '/photos/' + classifiedAdId + '/setMain/' + photoId, {});
}

deletePhoto(userId: string, classifiedAdId: string, photoId: string) {
  return this.http.delete(this.baseUrl + userId + '/photos/' + classifiedAdId + '/' + photoId);
}

searchQuery(searchQueryParametars: SearchQueryParametars, userId?: string): Observable<ClassifiedAdsList[]> {
  console.log('userId = ' + userId);
  if (userId != null) {
    return this.http.post<ClassifiedAdsList[]>(this.baseUrl + 'classifiedads/search/' + userId, searchQueryParametars);
  } else {
    return this.http.post<ClassifiedAdsList[]>(this.baseUrl + 'classifiedads/search/', searchQueryParametars);
  }
}

changeClassifiedAdsListFromSearch(classifiedAdsList: ClassifiedAdsList[]) {
  this.classifiedAdsFromSearch.next(classifiedAdsList);
}

createClassifiedAds(id: string, formDataTemplate: any): Observable<ClassifiedAdsForRegister> {
  const formData = new FormData();
  formData.append('appUserId', id);
  formData.append('title', formDataTemplate['title']);
  formData.append('description', formDataTemplate['description']);
  formData.append('city', formDataTemplate['city']);
  formData.append('category', formDataTemplate['category']);
  formData.append('email', formDataTemplate['email']);
  formData.append('phone', formDataTemplate['phone']);

  console.log(formData);

  return this.http.put<ClassifiedAdsForRegister>(this.baseUrl + 'classifiedads/add/', formData);
}

sendLike(userId: string, classifiedAdId: string) {
  return this.http.post(this.baseUrl + 'classifiedads/' + userId + '/like/' + classifiedAdId, {});
}

getNumberOfLikes(classifiedAdId: string) {
  return this.http.get(this.baseUrl + 'classifiedads/likes/' + classifiedAdId);
}

}
