import { Component, OnInit, Input } from '@angular/core';
import { ClassifiedAdsForUser } from '../../_models/classified-ads-for-user';

@Component({
  selector: 'app-classified-ads-user-list-card',
  templateUrl: './classified-ads-user-list-card.component.html',
  styleUrls: ['./classified-ads-user-list-card.component.css']
})
export class ClassifiedAdsUserListCardComponent implements OnInit {
  @Input() classifiedAdsForUser: ClassifiedAdsForUser;

  constructor() { }

  ngOnInit() {
  }

}
