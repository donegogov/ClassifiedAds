import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ClassifiedAdsForUserUpdate } from '../../_models/classified-ads-for-user-update';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AuthService } from '../../_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-classified-ads-edit',
  templateUrl: './classified-ads-edit.component.html',
  styleUrls: ['./classified-ads-edit.component.css']
})
export class ClassifiedAdsEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
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
  }

  updateClassifiedAd() {
    this.classifiedAdsService.updateClassifiedAd(this.authService.decodedToken.nameid,
      this.classifiedAdsForUserUpdate).subscribe(next => {
      this.alertify.success('Classified Ad updated successfully');
      this.editForm.reset(this.classifiedAdsForUserUpdate);
    }, error => {
      this.alertify.error(error);
    });
  }

}
