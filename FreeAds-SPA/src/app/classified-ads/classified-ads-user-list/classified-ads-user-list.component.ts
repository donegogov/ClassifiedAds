import { Component, OnInit } from '@angular/core';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ClassifiedAdsForUser } from '../../_models/classified-ads-for-user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classified-ads-user-list',
  templateUrl: './classified-ads-user-list.component.html',
  styleUrls: ['./classified-ads-user-list.component.css']
})
export class ClassifiedAdsUserListComponent implements OnInit {
  classifiedAdsForUser: ClassifiedAdsForUser[];

  constructor(private classifiedAdsService: ClassifiedAdsService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.classifiedAdsForUser = data['classifiedAdsForUser'];
    });
  }

}
