/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateAdsPhotoEditorComponent } from './create-ads-photo-editor.component';

describe('CreateAdsPhotoEditorComponent', () => {
  let component: CreateAdsPhotoEditorComponent;
  let fixture: ComponentFixture<CreateAdsPhotoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdsPhotoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdsPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
