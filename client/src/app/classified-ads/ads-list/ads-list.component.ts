import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ClassifiedAdsList } from '../../_models/classified-ads-list';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { Title, Meta } from '@angular/platform-browser';
import { AuthService } from 'src/app/_services/auth.service';
import { catchError, take } from 'rxjs/operators';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  classifiedAdsList: ClassifiedAdsList[];
  pagination: Pagination;
  pageSizeOptions: number[] = [5, 16, 25, 100];
  myOptions: NgxMasonryOptions = {
    gutter: 10
  };
  paginationModel: any = {};

  constructor(private classifiedAdsService: ClassifiedAdsService, private alertify: AlertifyService, private authService: AuthService,
    private route: ActivatedRoute, private titleService: Title, private metaTagService: Meta) {
     }

  ngOnInit() {
    //this.loadClassifiedAds();
    console.log(this.paginationModel);
    this.route.data.subscribe(data => {
      // this.classifiedAdsList = data['classifiedAdsList'];
      this.classifiedAdsService.changeClassifiedAdsListFromSearch(data['classifiedAdsList'].result);
      this.classifiedAdsService.classifiedAdsFromSearch.subscribe(ca => this.classifiedAdsList = ca);
      this.pagination = data['classifiedAdsList'].pagination;
    });

    this.titleService.setTitle('Солидарност.мк');
    this.metaTagService.addTags([
      { name: 'description', content: 'Подари на некој што му е најпотребно и направи добро дело' },
      { property: 'og:title', content: 'Солидарност.мк' },
      { proprety: 'og:description', content: 'Подари на некој што му е најпотребно и направи добро дело' },
      { property: 'og:image', content: 'https://solidarnost.de/assets/img/facebook-og.jpg' },
      { property: 'og:url', content: 'https://solidarnost.de' },
      { name: 'twitter:card', content: 'https://solidarnost.de/assets/img/facebook-og.jpg' }
    ]);
  }

  pageChanged(event: any): void {
    /* if ((this.pagination.currentPage * this.pagination.itemsPerPage) + this.pagination.itemsPerPage > this.pagination.totalItems) {
      this.pagination.currentPage += 1;
      //this.pagination.itemsPerPage = event.pageSize
    } else {
      this.pagination.currentPage = event.pageIndex;
    } */
    this.pagination.currentPage = event.page;
    this.loadClassifiedAds();

  }

  loadClassifiedAds() {
    let id: string = '123';
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      id = user.id;
    });
    if (id != '123') {
      this.classifiedAdsService.getRelevantClassifiedAds(this.pagination.currentPage, this.pagination.itemsPerPage,id)
      .subscribe((res: PaginatedResult<ClassifiedAdsList[]>) => {
          this.classifiedAdsList = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
        this.classifiedAdsService.getClassifiedAds(this.pagination.currentPage, this.pagination.itemsPerPage)
          .subscribe((res: PaginatedResult<ClassifiedAdsList[]>) => {
          this.classifiedAdsList = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
      }
  }

}
