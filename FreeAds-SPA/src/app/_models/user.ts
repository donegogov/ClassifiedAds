import { ClassifiedAds } from './classified-ads';

export interface User {
    id: number;
    username: string;
    userRole: string;
    classifiedAds?: ClassifiedAds[];
}
