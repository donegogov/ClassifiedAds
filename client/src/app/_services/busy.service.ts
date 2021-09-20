import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  private isLoadingSource = new BehaviorSubject<boolean>(false);
  isLoadingAsObservable = this.isLoadingSource.asObservable();

  constructor() { }

  setLoading(isLoading: boolean) {
    this.isLoadingSource.next(isLoading);
  }

  unsubscribe() {
    this.isLoadingSource.unsubscribe();
  }

}
