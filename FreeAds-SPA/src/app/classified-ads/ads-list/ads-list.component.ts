import { Component, OnInit } from '@angular/core';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ClassifiedAdsList } from '../../_models/classified-ads-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  classifiedAdsList: ClassifiedAdsList[];

  constructor(private classifiedAdsService: ClassifiedAdsService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // this.classifiedAdsList = data['classifiedAdsList'];
      this.classifiedAdsService.changeClassifiedAdsListFromSearch(data['classifiedAdsList']);
      this.classifiedAdsService.classifiedAdsFromSearch.subscribe(ca => this.classifiedAdsList = ca);
    });
  }

  loadClassifiedAds() {
    this.classifiedAdsService.getClassifiedAds().subscribe((classifiedAdsList: ClassifiedAdsList[]) => {
      this.classifiedAdsList = classifiedAdsList;
    }, error => {
      this.alertify.error(error);
      console.log(error);
    });
  }

}
