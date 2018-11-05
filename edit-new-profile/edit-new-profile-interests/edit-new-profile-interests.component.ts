import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ProfileService } from '../../profile.service';

import { Profile } from '../../profile'; 

import { profileInterestsOptions } from '../../profile.config';

@Component({
    selector:'edit-new-profile-interests',
    templateUrl: 'edit-new-profile-interests.component.html'
})
export class EditNewProfileInterestsComponent implements OnInit, OnDestroy{

    @Input() editNewProfile;


    private _subscriptions: Subscription[] = [];

    interestsOptions = profileInterestsOptions;
    interestsSelected = [];


    detailsForm: FormGroup;

    interestTabActive: string = '';

    private _profileService: ProfileService;

    constructor(profileService: ProfileService){
        this._profileService = profileService;
    }

    ngOnInit() {
        this.setDefaultValues();

    }

    setDefaultValues(){
        this._subscriptions.push(
            this._profileService.getEditNewProfile()
                .subscribe((editNewProfile: Profile) => {
                    this.editNewProfile = editNewProfile;
                    this.interestsSelected = this.editNewProfile.interests;
                })
        );
        
    }

    selectInterestMenu(interest: string): void{
        this.interestTabActive = interest;
    }

    isTabSelected(interest: string): void{
        return this.interestTabActive == interest;
    }

    isSelected(interest: string): boolean{

        const index = this.interestsSelected.indexOf(interest);

        return (index > -1)? true : false;

    }

    onClickInterest(interest: string): void{

        this.interestTabActive = '';

        const isSelected = this.isSelected(interest);

        if (isSelected){
            this.interestsSelected.splice(this.interestsSelected.indexOf(interest), 1);
        }else{
            this.interestsSelected.push(interest)
        }

        this.updateInterestsChanges();
        
    }
    
    updateInterestsChanges(): void{
        this.editNewProfile.interests = this.interestsSelected;
    }

    ngOnDestroy(){
        this._subscriptions.forEach(subs => subs.unsubscribe());
    }

}