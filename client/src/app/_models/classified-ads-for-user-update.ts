import { PhotoForDetail } from './photo-for-detail';

export interface ClassifiedAdsForUserUpdate {
    id: string;
    title: string;
    description: string;
    city: string;
    category: string;
    email: string;
    phone: string;
    photos: PhotoForDetail[];
    userId: string;
}
