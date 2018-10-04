import { Component, OnInit, Input } from '@angular/core';
import { ClassifiedAdsList } from '../../_models/classified-ads-list';

@Component({
  selector: 'app-classified-ads-card',
  templateUrl: './classified-ads-card.component.html',
  styleUrls: ['./classified-ads-card.component.css']
})
export class ClassifiedAdsCardComponent implements OnInit {
  @Input() classifiedAd: ClassifiedAdsList;

  constructor() { }

  ngOnInit() {
  }

}
