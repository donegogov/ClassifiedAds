import { Component, OnInit } from '@angular/core';
import { SearchQueryParametars } from 'src/app/_models/search-query-parametars';
import { ClassifiedAdsService } from 'src/app/_services/classifiedAds.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { ClassifiedAdsList } from 'src/app/_models/classified-ads-list';

@Component({
  selector: 'app-search-ads',
  templateUrl: './search-ads.component.html',
  styleUrls: ['./search-ads.component.css']
})
export class SearchAdsComponent implements OnInit {
  searchQueryParametars: SearchQueryParametars;
  // classifiedAdsFromSearch: ClassifiedAdsList[];

  constructor(
    private classifiedAdsService: ClassifiedAdsService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchQueryParametars = {
      query: '',
      city: 'Alamo',
      category: 'TV'
    };
  }

  searchClassifiedAds() {
    console.log(this.searchQueryParametars);
    this.classifiedAdsService.searchQuery(this.searchQueryParametars).subscribe(
      res => {
        this.classifiedAdsService.changeClassifiedAdsListFromSearch(res);
      },
      error => {
        this.alertify.error(error);
        console.log(error);
      }
    );
  }

  refreshAdsList(query: string) {
    if (query === '') {
      this.loadClassifiedAds();
      // this.router
      // .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
      // .then(() => this.router.navigate(['/ads-list']));
    }
  }

  onKey(event: any) { // without type info
    this.refreshAdsList(event.target.value);
  }

  loadClassifiedAds() {
    this.classifiedAdsService.getClassifiedAds().subscribe((classifiedAdsList: ClassifiedAdsList[]) => {
      this.classifiedAdsService.changeClassifiedAdsListFromSearch(classifiedAdsList);
    }, error => {
      this.alertify.error(error);
      console.log(error);
    });
  }
}
