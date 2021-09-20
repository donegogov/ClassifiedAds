import { PhotoForDetail } from './photo-for-detail';

export interface ClassifiedAdsDetail {
    id: string;
    title: string;
    description: string;
    city: string;
    category: string;
    dataAdded: Date;
    validTo: Date;
    email: string;
    phone: string;
    photos: PhotoForDetail[];
    userId: string;
    userPublishedUserName: string;
}
