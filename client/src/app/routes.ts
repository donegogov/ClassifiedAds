import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { CreateAdsComponent } from './classified-ads/create-ads/create-ads.component';
import { SearchAdsComponent } from './classified-ads/search-ads/search-ads.component';
import { AdsListComponent } from './classified-ads/ads-list/ads-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { ClassifiedAdsDetailComponent } from './classified-ads/classified-ads-detail/classified-ads-detail.component';
import { ClassifiedAdsDetailResolver } from './_resolvers/classified-ads-detail.resolver';
import { AdsListResolver } from './_resolvers/ads-list.resolver';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ClassifiedAdsEditComponent } from './classified-ads/classified-ads-edit/classified-ads-edit.component';
import { ClassifiedAdsUserListComponent } from './classified-ads/classified-ads-user-list/classified-ads-user-list.component';
import { ClassifiedAdsUserListResolver } from './_resolvers/classified-ads-user-list.resolver';
import { ClassifiedAdsForUserUpdateResolver } from './_resolvers/classified-ads-for-user-update.resolver';
import { PreventUnsavedChangesEditClassifiedAds } from './_guards/prevent-unsaved-changes.edit-classified-ads.guard';
import { GetCitiesResolver } from './_resolvers/constant-resolvers/get-cities.resolver';
import { GetCategoriesResolver } from './_resolvers/constant-resolvers/get-categories.resolver';
import { CreateAdsPhotoEditorComponent } from './classified-ads/create-ads-photo-editor/create-ads-photo-editor.component';
import { RegisterComponent } from './register/register.component';
import { ThankYouComponent } from './classified-ads/thank-you/thank-you.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { AdminManagementResolver } from './_resolvers/admin-management.resolver';
import { GetClassifiedAdsForSearchResolver } from './_resolvers/get-classified-ads-for-search.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent,
        resolve: {
            cities: GetCitiesResolver } },
    { path: 'ads-list', component: AdsListComponent,
                resolve: {classifiedAdsList: AdsListResolver,
                    categories: GetCategoriesResolver,
                    cities: GetCitiesResolver,
                    classifiedAdsForSearch: GetClassifiedAdsForSearchResolver } },
    { path: 'ads-list/:id', component: ClassifiedAdsDetailComponent,
        resolve: {classifiedAdsDetail: ClassifiedAdsDetailResolver } },
    { path: 'search-ads', component: SearchAdsComponent,
        resolve: { categories: GetCategoriesResolver,
            cities: GetCitiesResolver } },
    { path: 'thank-you', component: ThankYouComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            /* { path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard] }, */
            /* { path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges] }, */
            { path: 'create-ads', component: CreateAdsComponent,
                resolve: {categories: GetCategoriesResolver, cities: GetCitiesResolver } },
            { path: 'classified-ads-user-list/:id', component: ClassifiedAdsUserListComponent,
                resolve: {classifiedAdsForUser: ClassifiedAdsUserListResolver } },
            { path: 'classified-ads-edit/:id', component: ClassifiedAdsEditComponent,
                resolve: {classifiedAdsDetail: ClassifiedAdsForUserUpdateResolver,
                    categories: GetCategoriesResolver,
                    cities: GetCitiesResolver },
                canDeactivate: [PreventUnsavedChangesEditClassifiedAds] },
            { path: 'create-ads-photo-editor', component: CreateAdsPhotoEditorComponent },
            { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard],
            resolve: {users: AdminManagementResolver } },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
