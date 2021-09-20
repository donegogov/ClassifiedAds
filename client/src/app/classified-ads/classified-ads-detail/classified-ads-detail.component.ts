import { Component, OnInit } from '@angular/core';
import { ClassifiedAdsDetail } from '../../_models/classified-ads-detail';
import { ClassifiedAdsService } from '../../_services/classifiedAds.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
/* import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryOrder, NgxGalleryImageSize } from 'ngx-gallery'; */
import { Title, Meta } from '@angular/platform-browser';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-classified-ads-detail',
  templateUrl: './classified-ads-detail.component.html',
  styleUrls: ['./classified-ads-detail.component.css', './classified-ads-detail.component.scss']
})
export class ClassifiedAdsDetailComponent implements OnInit {
  classifiedAdsDetail: ClassifiedAdsDetail;
  mainPhotoUrl: string;
  /* galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[]; */
  width:number = window.innerWidth;
  height:number = window.innerHeight;
  images: any[];
  myOptions: NgxMasonryOptions = {
    gutter: 10
  };

  constructor(private classifiedAdsService: ClassifiedAdsService, private alertify: AlertifyService,
    private route: ActivatedRoute, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.classifiedAdsDetail = data['classifiedAdsDetail'];
    });

    this.getMainPhotoUrl();

    this.titleService.setTitle( this.classifiedAdsDetail.title + ' | Солидарност.мк');
    this.metaTagService.addTags([
      { name: 'description', content: this.classifiedAdsDetail.description },
      { property: 'og:title', content: this.classifiedAdsDetail.title + ' | Солидарност.мк' },
      { proprety: 'og:description', content: this.classifiedAdsDetail.description },
      { property: 'og:image', content: this.mainPhotoUrl },
      { property: 'og:url', content: 'https://solidarnost.de' },
      { name: 'twitter:card', content: this.mainPhotoUrl }
    ]);
    // this.getMainPhotoUrl();
    // console.log(this.width);
    // console.log(this.height);

    /* this.galleryOptions = [
      {
        width: '100%',
        height: '610px',
        imagePercent: 100,
        thumbnailsPercent: 100,
        thumbnails: false,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsOrder: NgxGalleryOrder.Row,
        previewZoom: true,
        imageSize: NgxGalleryImageSize.Contain
        },
        {
          breakpoint: 576,
          fullWidth: true,
          width: (this.width - 40).toString() + 'px',
          height:  (this.height / 2).toString() + 'px',
          imagePercent: 100,
          thumbnailsPercent: 100,
          thumbnails: false,
          thumbnailsColumns: 3,
          imageAnimation: NgxGalleryAnimation.Slide,
          thumbnailsOrder: NgxGalleryOrder.Row,
          previewZoom: true,
          imageSize: NgxGalleryImageSize.Cover,
          preview: true
        },
        // max-width 400
        {
            breakpoint: 400,
            fullWidth: true,
            width: (this.width - 40).toString() + 'px',
            height:  (this.height / 2).toString() + 'px',
            imagePercent: 100,
            thumbnailsPercent: 100,
            thumbnails: false,
            thumbnailsColumns: 3,
            imageAnimation: NgxGalleryAnimation.Slide,
            thumbnailsOrder: NgxGalleryOrder.Row,
            previewZoom: true,
            imageSize: NgxGalleryImageSize.Contain,
            preview: true
        }
    ]; */
    // console.log(this.width);
    // console.log(this.height);
    /* this.galleryImages = this.getImages(); */
    this.images = this.getImages();
    this.getMainPhotoUrl();
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

  getMainPhotoUrl() {
    const photos = this.classifiedAdsDetail.photos;
    (photos).forEach(photo => {
      if (photo.isMain) {
        this.mainPhotoUrl = photo.url;
      }
    });
  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
}

}
