import { Component, OnInit } from '@angular/core';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ClassifiedAdsList } from '../../_models/classified-ads-list';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  classifiedAdsList: ClassifiedAdsList[];
  pagination: Pagination;

  constructor(private classifiedAdsService: ClassifiedAdsService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // this.classifiedAdsList = data['classifiedAdsList'];
      this.classifiedAdsService.changeClassifiedAdsListFromSearch(data['classifiedAdsList'].result);
      this.classifiedAdsService.classifiedAdsFromSearch.subscribe(ca => this.classifiedAdsList = ca);
      this.pagination = data['classifiedAdsList'].pagination;
      console.log(data['classifiedAdsList']);
      console.log(this.pagination);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadClassifiedAds();
  }

  loadClassifiedAds() {
    this.classifiedAdsService.getClassifiedAds(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<ClassifiedAdsList[]>) => {
      this.classifiedAdsList = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
      console.log(error);
    });
  }

}
