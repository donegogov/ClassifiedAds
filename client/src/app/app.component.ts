import { Component, OnDestroy, OnInit/* , Renderer2, Inject */ } from '@angular/core';
/* import { DOCUMENT } from '@angular/common'; */
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { User } from './_models/user';
import { BusyService } from './_services/busy.service';
import { ClassifiedAdsService } from './_services/classifiedAds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  jwtHelper = new JwtHelperService();
  users: any;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
    public busyService: BusyService, private classifiedAdsService: ClassifiedAdsService/* , */
    /* private _renderer2: Renderer2,
        @Inject(DOCUMENT) private _document: Document */) {}

  ngOnDestroy(): void {
    this.busyService.unsubscribe();
    this.authService.unsubscribe();
    this.classifiedAdsService.classifiedAdsFromSearch.unsubscribe();
  }

  ngOnInit() {
    /* const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    } */
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.authService.setCurrentUser(user);
    }
  }

  /* addScript(scriptScr: string) {
    let script = this._renderer2.createElement('script');
    script.src = scriptScr;
    console.log(script);
    script.async = 'async';
    script['data-cfasync'] = 'false';
    console.log(script);
    script.type = 'text/javascript';
        //script.type = `application/ld+json`;


        this._renderer2.appendChild(this._document.body, script);
  } */

}
