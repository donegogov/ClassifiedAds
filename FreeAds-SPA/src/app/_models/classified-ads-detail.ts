import { PhotoForDetail } from './photo-for-detail';

export interface ClassifiedAdsDetail {
    id: number;
    title: string;
    description: string;
    city: string;
    category: string;
    dataAdded: Date;
    validTo: Date;
    photos: PhotoForDetail[];
    userId: number;
}
