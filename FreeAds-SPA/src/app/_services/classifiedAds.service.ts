import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassifiedAdsList } from '../_models/classified-ads-list';
import { ClassifiedAdsDetail } from '../_models/classified-ads-detail';

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

}
