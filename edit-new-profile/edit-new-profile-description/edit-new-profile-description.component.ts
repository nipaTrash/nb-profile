import { Component, Input, OnInit } from '@angular/core';

import { ProfileService } from '../../profile.service';

@Component({
    selector:'edit-new-profile-description',
    templateUrl:'./edit-new-profile-description.component.html'
})
export class EditNewProfileDescriptionComponent implements OnInit{
    
    @Input() editNewProfile;

    private _profileService: ProfileService;
    public langs: string[];

    constructor(profileService: ProfileService){
        this._profileService = profileService;
    }

    ngOnInit(){
        this.langs = this._profileService.getLangs();
    }

}