import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { CreateAdsComponent } from './create-ads/create-ads.component';
import { SearchAdsComponent } from './search-ads/search-ads.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'search-ads', component: SearchAdsComponent },
            { path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard] },
            { path: 'create-ads', component: CreateAdsComponent },
            { path: 'ads-list', component: AdsListComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
