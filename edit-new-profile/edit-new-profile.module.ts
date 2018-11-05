import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { 
    JsNgPopupModule,
    JsNgBasicModule
} from '../../@js-lib';

import { JsNgTranslatorModule } from '../../@js-lib/js-ng-translator/js-ng-translator.module';

import { EditProfileComponent } from './edit-profile.component';
import { NewProfileComponent } from './new-profile.component';
import { EditNewProfileComponent } from './edit-new-profile.component';
import { EditNewProfileBasicComponent } from './edit-new-profile-basic/edit-new-profile-basic.component';
import { EditNewProfileSettingsComponent } from './edit-new-profile-settings/edit-new-profile-settings.component';
import { EditNewProfileInterestsComponent } from './edit-new-profile-interests/edit-new-profile-interests.component';
import { EditNewProfileDescriptionComponent } from './edit-new-profile-description/edit-new-profile-description.component';

import { JsNgFormModule } from '../../@js-lib';
import { JsNgItemsSelectorModule } from '../../@js-lib';

import { EditNewProfileInterestDetailsComponent } from './edit-new-profile-interests/edit-new-profile-interest-details.component';

@NgModule({
    declarations: [ 
        EditProfileComponent, 
        NewProfileComponent,
        EditNewProfileComponent, 
        EditNewProfileBasicComponent,
        EditNewProfileSettingsComponent, 
        EditNewProfileInterestsComponent, 
        EditNewProfileInterestDetailsComponent,
        EditNewProfileDescriptionComponent
    ],
    imports: [
        CommonModule, 
        JsNgBasicModule,
        JsNgFormModule,
        JsNgPopupModule,
        JsNgItemsSelectorModule,
        JsNgTranslatorModule,
        ReactiveFormsModule
    ],
    exports: [  ]
})
export class EditNewProfileModule{
    
}