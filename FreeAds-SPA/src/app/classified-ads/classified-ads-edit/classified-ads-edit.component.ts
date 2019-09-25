import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ClassifiedAdsForUserUpdate } from '../../_models/classified-ads-for-user-update';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AuthService } from '../../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Cities } from 'src/app/_models/constants/cities';
import { Categories } from 'src/app/_models/constants/categories';

@Component({
  selector: 'app-classified-ads-edit',
  templateUrl: './classified-ads-edit.component.html',
  styleUrls: ['./classified-ads-edit.component.css']
})
export class ClassifiedAdsEditComponent implements OnInit {
  cities: Cities[];
  categories: Categories[];
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  classifiedAdsForUserUpdate: ClassifiedAdsForUserUpdate;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      return event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private classifiedAdsService: ClassifiedAdsService, private authService: AuthService) { }

  ngOnInit() {
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
    console.log(this.classifiedAdsForUserUpdate);

    console.log(this.cities);

    console.log(this.categories);
  }

  updateClassifiedAd() {
    this.classifiedAdsService.updateClassifiedAd(this.authService.decodedToken.nameid,
      this.classifiedAdsForUserUpdate).subscribe(next => {
      // this.alertify.success('Classified Ad updated successfully');
      this.alertify.success('Промените на огласот се зачувани');
      this.editForm.reset(this.classifiedAdsForUserUpdate);
    }, error => {
      this.alertify.error(error);
    });
  }

}
