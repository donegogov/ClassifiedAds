import { Component, OnInit, Input } from '@angular/core';
import { ClassifiedAdsList } from '../../_models/classified-ads-list';
import { ClassifiedAdsService } from 'src/app/_services/classifiedAds.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-classified-ads-card',
  templateUrl: './classified-ads-card.component.html',
  styleUrls: ['./classified-ads-card.component.css']
})
export class ClassifiedAdsCardComponent implements OnInit {
  @Input() classifiedAd: ClassifiedAdsList;
  classifiedAdLikes: string;

  constructor(private classifiedAdsService: ClassifiedAdsService, private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.classifiedAdsService.getNumberOfLikes(this.classifiedAd.id).subscribe(numberOfLikes => {
      this.classifiedAdLikes = numberOfLikes.toString();
    }, error => {
      this.alertify.error(error);
    });
  }

  sendLike(classifiedAdId: number) {
    this.classifiedAdsService.sendLike(this.authService.decodedToken.nameid, classifiedAdId).subscribe(data => {
      this.alertify.success(data + this.classifiedAd.title);

      this.classifiedAdsService.getNumberOfLikes(this.classifiedAd.id).subscribe(numberOfLikes => {
        this.classifiedAdLikes = numberOfLikes.toString();
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
