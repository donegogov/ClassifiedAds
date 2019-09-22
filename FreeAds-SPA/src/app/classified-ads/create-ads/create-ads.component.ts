import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassifiedAdsForRegister } from 'src/app/_models/classified-ads-models/classified-ads-for-register';
import { ClassifiedAdsService } from 'src/app/_services/classifiedAds.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Cities } from 'src/app/_models/constants/cities';
import { Categories } from 'src/app/_models/constants/categories';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CreateAdsPhotoEditorComponent } from '../create-ads-photo-editor/create-ads-photo-editor.component';

@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.css']
})
export class CreateAdsComponent implements OnInit {
  @ViewChild(CreateAdsPhotoEditorComponent, { static: true }) uploaderChild: CreateAdsPhotoEditorComponent;
  @ViewChild('createForm', { static: true }) createForm: NgForm;
  classifiedAdsForRegister: ClassifiedAdsForRegister;
  cities: Cities[];
  categories: Categories[];

  constructor(private classifiedAdsService: ClassifiedAdsService,
    private authServoce: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.cities = data['cities'];
    });
    this.route.data.subscribe(data => {
      // console.log(data);
      this.categories = data['categories'];
    });
    this.initializeClassfiedAdsForRegister();
  }

  createClassifiedAd() {
    // console.log(this.classifiedAdsForRegister);
    if (Array.isArray(this.uploaderChild.uploader.queue) && this.uploaderChild.uploader.queue.length) {
      this.classifiedAdsService.createClassifiedAds(this.authServoce.decodedToken.nameid, this.classifiedAdsForRegister).subscribe(next => {
        this.alertify.success('Successfuly created classified ad');
        this.createForm.reset();
        // console.log('Next = ');
        // console.log(next);
        this.uploaderChild.initializeUploaderUrl(next.id);
        this.uploaderChild.uploader.uploadAll();
      }, error => {
        console.log(error.error);
      });
    } else {
      this.alertify.warning('Must upload at least one image');
    }
  }

  initializeClassfiedAdsForRegister() {
    this.classifiedAdsForRegister = {
      id: 0,
      title: '',
      description: '',
      city: 'Waterford',
      category: 'PC',
      email: '',
      phone: ''
    };
  }
}
