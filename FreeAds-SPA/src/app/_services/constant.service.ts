import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cities } from '../_models/constants/cities';
import { Categories } from '../_models/constants/categories';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

constructor(private http: HttpClient) { }

getCities(): Observable<Cities[]> {
  return this.http.get<Cities[]>('http://localhost:5000/api/values/cities');
}

getCategories(): Observable<Categories[]> {
  return this.http.get<Categories[]>('http://localhost:5000/api/values/categories');
}

}
