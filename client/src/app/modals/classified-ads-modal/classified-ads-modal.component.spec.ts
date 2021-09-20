import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedAdsModalComponent } from './classified-ads-modal.component';

describe('ClassifiedAdsModalComponent', () => {
  let component: ClassifiedAdsModalComponent;
  let fixture: ComponentFixture<ClassifiedAdsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifiedAdsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedAdsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
