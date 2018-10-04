import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './member/member-list/member-list.component';
import { CreateAdsComponent } from './create-ads/create-ads.component';
import { AdsListComponent } from './classified-ads/ads-list/ads-list.component';
import { SearchAdsComponent } from './search-ads/search-ads.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { ClassifiedAdsService } from './_services/classifiedAds.service';
import { ClassifiedAdsCardComponent } from './classified-ads/classified-ads-card/classified-ads-card.component';
import { ClassifiedAdsDetailComponent } from './classified-ads/classified-ads-detail/classified-ads-detail.component';
import { ClassifiedAdsDetailResolver } from './_resolvers/classified-ads-detail.resolver';
import { AdsListResolver } from './_resolvers/ads-list.resolver';
import { MemberEditComponent } from './member/member-edit/member-edit.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      CreateAdsComponent,
      AdsListComponent,
      SearchAdsComponent,
      ClassifiedAdsCardComponent,
      ClassifiedAdsDetailComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:5000'],
              blacklistedRoutes: ['localhost:5000/api/auth']
          }
      })
   ],
   providers: [
       AuthService,
       ErrorInterceptorProvider,
       AlertifyService,
       AuthGuard,
       UserService,
       ClassifiedAdsService,
       ClassifiedAdsDetailResolver,
       AdsListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
