import { Component, OnInit } from '@angular/core';
import { ClassifiedAdsDetail } from '../../_models/classified-ads-detail';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryOrder } from 'ngx-gallery';

@Component({
  selector: 'app-classified-ads-detail',
  templateUrl: './classified-ads-detail.component.html',
  styleUrls: ['./classified-ads-detail.component.css']
})
export class ClassifiedAdsDetailComponent implements OnInit {
  classifiedAdsDetail: ClassifiedAdsDetail;
  // mainPhotoUrl: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private classifiedAdsService: ClassifiedAdsService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.classifiedAdsDetail = data['classifiedAdsDetail'];
    });
    // this.getMainPhotoUrl();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
        thumbnailsOrder: NgxGalleryOrder.Row
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const mainImageUrl = [];
    const imageUrls = [];
    // const images = this.classifiedAdsDetail.photos;
    for (let i = 0; i < this.classifiedAdsDetail.photos.length; i++) {
      if (this.classifiedAdsDetail.photos[i].isMain) {
        mainImageUrl.push({
          small: this.classifiedAdsDetail.photos[i].url,
          medium: this.classifiedAdsDetail.photos[i].url,
          big: this.classifiedAdsDetail.photos[i].url
        });
        // const index = images.indexOf(images[i], 0);
        // if (index > -1) {
        //  images.splice(index, 1);
        } else if (!this.classifiedAdsDetail.photos[i].isMain) {
          imageUrls.push({
            small: this.classifiedAdsDetail.photos[i].url,
            medium: this.classifiedAdsDetail.photos[i].url,
            big: this.classifiedAdsDetail.photos[i].url
          });
        }
      }
    // for (let j = 0; j < images.length; j++) {
    //   imageUrls.push({
    //     small: images[j].url,
    //     medium: images[j].url,
    //     big: images[j].url
    //   });
    // }
    return mainImageUrl.concat(imageUrls);
  }

  // loadClassifiedAd() {
  //   this.classifiedAdsService.getClassifiedAdsDetail(+this.route.snapshot.params['id'])
  //   .subscribe((classifiedAdsDetail: ClassifiedAdsDetail) => {
  //     this.classifiedAdsDetail = classifiedAdsDetail;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  // getMainPhotoUrl() {
  //   const photos = this.classifiedAdsDetail.photos;
  //   (photos).forEach(photo => {
  //     if (photo.isMain) {
  //       this.mainPhotoUrl = photo.url;
  //     }
  //   });
  // }

}
