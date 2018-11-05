import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'new-profile',
    template: `<edit-new-profile></edit-new-profile>`
})
export class NewProfileComponent implements OnInit{

    private _profileService: ProfileService;

    constructor(profileService: ProfileService){
        this._profileService = profileService;
    }

    ngOnInit(){
        this._profileService.resetEditNewProfile();

        this._profileService.setEditNewProfileType('profile')
    }
}