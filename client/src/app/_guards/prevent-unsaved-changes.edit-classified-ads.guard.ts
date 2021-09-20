import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ClassifiedAdsEditComponent } from '../classified-ads/classified-ads-edit/classified-ads-edit.component';

@Injectable()
export class PreventUnsavedChangesEditClassifiedAds implements CanDeactivate<ClassifiedAdsEditComponent> {
    canDeactivate(component: ClassifiedAdsEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
