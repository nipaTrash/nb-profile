import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { JsNgTranslatorModule, JsNgPopupModule } from '../@js-lib';
import { NbSocialStatsModule } from '../nb-social-stats/nb-social-stats.module';

import { EditNewProfileModule } from './edit-new-profile/edit-new-profile.module';


import { ProfileService } from './profile.service';

@NgModule({
    imports:[ 
        CommonModule, 
        RouterModule,
        JsNgTranslatorModule,
        JsNgPopupModule,
        NbSocialStatsModule,
        EditNewProfileModule 
    ],
    declarations:[ 
    ],
    providers:[
        ProfileService
    ],
    exports:[ 
        EditNewProfileModule
    ]
})
export class ProfileModule{

}