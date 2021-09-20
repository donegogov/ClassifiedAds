/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ClassifiedAdsService } from './classifiedAds.service';

describe('Service: ClassifiedAds', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassifiedAdsService]
    });
  });

  it('should ...', inject([ClassifiedAdsService], (service: ClassifiedAdsService) => {
    expect(service).toBeTruthy();
  }));
});
