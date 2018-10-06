import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { CreateAdsComponent } from './create-ads/create-ads.component';
import { SearchAdsComponent } from './search-ads/search-ads.component';
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

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'search-ads', component: SearchAdsComponent },
            { path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard] },
            { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges] },
            { path: 'create-ads', component: CreateAdsComponent },
            { path: 'ads-list', component: AdsListComponent,
                resolve: {classifiedAdsList: AdsListResolver } },
            { path: 'ads-list/:id', component: ClassifiedAdsDetailComponent,
                resolve: {classifiedAdsDetail: ClassifiedAdsDetailResolver } },
            { path: 'classified-ads-user-list', component: ClassifiedAdsUserListComponent,
                resolve: {classifiedAdsForUser: ClassifiedAdsUserListResolver }},
            { path: 'classified-ads-edit/:id', component: ClassifiedAdsEditComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
