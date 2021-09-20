import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ClassifiedAdsForUserUpdate } from '../../_models/classified-ads-for-user-update';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Cities } from 'src/app/_models/constants/cities';
import { Categories } from 'src/app/_models/constants/categories';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-classified-ads-edit',
  templateUrl: './classified-ads-edit.component.html',
  styleUrls: ['./classified-ads-edit.component.css']
})
export class ClassifiedAdsEditComponent implements OnInit {
  cities: Cities[];
  categories: Categories[];
  /* @ViewChild('editForm', { static: true }) editForm: NgForm; */
  classifiedAdsForUserUpdate: ClassifiedAdsForUserUpdate;
  /* @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.is_title_invalid || this.is_description_invalid || this.is_city_invalid || this.is_category_invalid ||
      this.is_email_invalid || this.is_phone_invalid) {
      return event.returnValue = true;
    }
  } */
  editForm: FormGroup;
  is_title_invalid = false;
  is_description_invalid = false;
  is_city_invalid = false;
  is_category_invalid = false;
  is_email_invalid = false;
  is_phone_invalid = false;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private classifiedAdsService: ClassifiedAdsService, private authService: AuthService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      title: [Validators.required],
      description: [Validators.required],
      email: [Validators.required],
      phone: [Validators.required],
      city: [Validators.required],
      category: [Validators.required]
    });
    this.route.data.subscribe(data => {
      this.classifiedAdsForUserUpdate = data['classifiedAdsDetail'];
    });
    this.route.data.subscribe(data => {
      this.cities = data['cities'];
    });
    this.route.data.subscribe(data => {
      // console.log(data);
      this.categories = data['categories'];
    });
    // console.log(this.classifiedAdsForUserUpdate);

    // console.log(this.cities);

    // console.log(this.categories);
  }

  updateClassifiedAd() {
    this.is_category_invalid = false;
    this.is_city_invalid = false;
    this.is_description_invalid = false;
    this.is_phone_invalid = false;
    this.is_title_invalid = false;
    this.is_email_invalid = false;

    let formValid = true;


    console.log(this.classifiedAdsForUserUpdate.category);
    if (this.classifiedAdsForUserUpdate.category == '' || this.classifiedAdsForUserUpdate.category == null) {
      this.is_category_invalid = true;
      formValid = false;
    }

    if (this.classifiedAdsForUserUpdate.city == '' || this.classifiedAdsForUserUpdate.city == null) {
      this.is_city_invalid = true;
      formValid = false;
    }

    if (this.classifiedAdsForUserUpdate.description == '' || this.classifiedAdsForUserUpdate.description == null) {
      this.is_description_invalid = true;
      formValid = false;
    }

    if (this.classifiedAdsForUserUpdate.title == '' || this.classifiedAdsForUserUpdate.title == null) {
      this.is_title_invalid = true;
      formValid = false;
    }

    if (this.classifiedAdsForUserUpdate.phone == '' || this.classifiedAdsForUserUpdate.phone == null) {
      this.is_phone_invalid = true;
      formValid = false;
    }

    if (this.classifiedAdsForUserUpdate.email == '' || this.classifiedAdsForUserUpdate.email == null) {
      this.is_email_invalid = true;
      formValid = false;
    }

    if (formValid) {
      let id: string = '123';
      this.authService.currentUser$.pipe(take(1)).subscribe(user => {
        id = user.id;
      });
      if (id != '123') {
        this.classifiedAdsService.updateClassifiedAd(id,
          this.classifiedAdsForUserUpdate).subscribe(next => {
          // this.alertify.success('Classified Ad updated successfully');
          this.alertify.success('Промените на огласот се зачувани');
          this.editForm.reset(this.classifiedAdsForUserUpdate);
        }, error => {
          this.alertify.error(error);
        });
      }
    }
  }

}
