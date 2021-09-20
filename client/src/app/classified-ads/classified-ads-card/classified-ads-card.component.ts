import { Component, OnInit, Input } from '@angular/core';
import { ClassifiedAdsList } from '../../_models/classified-ads-list';
import { ClassifiedAdsService } from 'src/app/_services/classifiedAds.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-classified-ads-card',
  templateUrl: './classified-ads-card.component.html',
  styleUrls: ['./classified-ads-card.component.css']
})
export class ClassifiedAdsCardComponent implements OnInit {
  @Input() classifiedAd: ClassifiedAdsList;
  classifiedAdLikes: string;
  is_liked: boolean = false;

  constructor(private classifiedAdsService: ClassifiedAdsService, private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    console.log(this.classifiedAd);
    this.classifiedAdsService.getNumberOfLikes(this.classifiedAd.id).subscribe(numberOfLikes => {
      this.classifiedAdLikes = numberOfLikes.toString();
    }, error => {
      this.alertify.error(error);
    });
    this.is_liked = this.classifiedAd.isLiked;
  }

  sendLike(classifiedAdId: string) {
    let id: string = '123';
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      id = user.id;
    });
    console.log(this.authService.currentUser$);
    this.classifiedAdsService.sendLike(id, classifiedAdId).subscribe(data => {
      this.alertify.success(data + this.classifiedAd.title);
      this.is_liked = !this.is_liked;
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
