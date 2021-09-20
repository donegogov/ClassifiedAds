import { ClassifiedAds } from './classified-ads';

export interface User {
    id: string;
    username: string;
    roles: string[];
    classifiedAds?: ClassifiedAds[];
    token: string;
}
