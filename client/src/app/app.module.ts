import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { BsDropdownModule, PaginationModule, CollapseModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
/* import { NgxGalleryModule } from 'ngx-gallery'; */
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './member/member-list/member-list.component';
import { CreateAdsComponent } from './classified-ads/create-ads/create-ads.component';
import { AdsListComponent } from './classified-ads/ads-list/ads-list.component';
import { SearchAdsComponent } from './classified-ads/search-ads/search-ads.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { ClassifiedAdsService } from './_services/classifiedAds.service';
import { ClassifiedAdsCardComponent } from './classified-ads/classified-ads-card/classified-ads-card.component';
import { ClassifiedAdsDetailComponent } from './classified-ads/classified-ads-detail/classified-ads-detail.component';
import { ClassifiedAdsDetailResolver } from './_resolvers/classified-ads-detail.resolver';
import { AdsListResolver } from './_resolvers/ads-list.resolver';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ClassifiedAdsEditComponent } from './classified-ads/classified-ads-edit/classified-ads-edit.component';
import { ClassifiedAdsUserListComponent } from './classified-ads/classified-ads-user-list/classified-ads-user-list.component';
import { ClassifiedAdsUserListResolver } from './_resolvers/classified-ads-user-list.resolver';
import { ClassifiedAdsUserListCardComponent } from './classified-ads/classified-ads-user-list-card/classified-ads-user-list-card.component';
import { ClassifiedAdsForUserUpdateResolver } from './_resolvers/classified-ads-for-user-update.resolver';
import { PreventUnsavedChangesEditClassifiedAds } from './_guards/prevent-unsaved-changes.edit-classified-ads.guard';
import { PhotoEditorComponent } from './classified-ads/photo-editor/photo-editor.component';
import { GetCategoriesResolver } from './_resolvers/constant-resolvers/get-categories.resolver';
import { GetCitiesResolver } from './_resolvers/constant-resolvers/get-cities.resolver';
import { CreateAdsPhotoEditorComponent } from './classified-ads/create-ads-photo-editor/create-ads-photo-editor.component';
import { ThankYouComponent } from './classified-ads/thank-you/thank-you.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { ClassifiedAdsManagementComponent } from './admin/classified-ads-management/classified-ads-management.component';
import { take } from 'rxjs/operators';
import { AdminManagementResolver } from './_resolvers/admin-management.resolver';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { ClassifiedAdsModalComponent } from './modals/classified-ads-modal/classified-ads-modal.component';
import { GetClassifiedAdsForSearchResolver } from './_resolvers/get-classified-ads-for-search.resolver';
import { LoadingInterceptor } from './_interseptor/loading.interceptor';

export function tokenGetter() {
    if (localStorage.getItem("user") != null) {
        return JSON.parse(localStorage.getItem("user")).token;
    }
    else { return; }
}

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig  {
    overrides = {
        pinch: { enable: false },
        rotate: { enable: false }
    };
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
      MemberEditComponent,
      ClassifiedAdsEditComponent,
      ClassifiedAdsUserListComponent,
      ClassifiedAdsUserListCardComponent,
      PhotoEditorComponent,
      CreateAdsPhotoEditorComponent,
      ThankYouComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      ClassifiedAdsManagementComponent,
      RolesModalComponent,
      ClassifiedAdsModalComponent
    ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
      /* NgxGalleryModule, */
      FileUploadModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:5000'],
              blacklistedRoutes: ['localhost:5000/api/auth/login/', 'localhost:5000/api/auth/register/']
          }
      }),
      BrowserAnimationsModule,
      CollapseModule.forRoot(),
      NgxNavbarModule,
      MatGridListModule,
      NgxMasonryModule,
      TabsModule.forRoot(),
      MatTabsModule,
      MatButtonModule,
      MatTableModule,
      MatDialogModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatIconModule,
      MatAutocompleteModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatPaginatorModule
   ],
   providers: [
       AuthService,
       ErrorInterceptorProvider,
       AlertifyService,
       AuthGuard,
       UserService,
       ClassifiedAdsService,
       ClassifiedAdsDetailResolver,
       AdsListResolver,
       MemberEditResolver,
       PreventUnsavedChanges,
       ClassifiedAdsUserListResolver,
       ClassifiedAdsForUserUpdateResolver,
       PreventUnsavedChangesEditClassifiedAds,
       GetCategoriesResolver,
       GetCitiesResolver,
       AdminManagementResolver,
       GetClassifiedAdsForSearchResolver,
       { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
       { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
