import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cities } from '../_models/constants/cities';
import { Categories } from '../_models/constants/categories';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getCities(): Observable<Cities[]> {
  return this.http.get<Cities[]>(this.baseUrl + 'values/cities');
}

getCategories(): Observable<Categories[]> {
  return this.http.get<Categories[]>(this.baseUrl + 'values/categories');
}

}
