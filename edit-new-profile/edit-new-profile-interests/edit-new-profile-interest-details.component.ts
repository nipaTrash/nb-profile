import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/subscription';

import { ProfileService } from '../../profile.service';

import { profileInterestsDetails } from '../../../nb-config';

@Component({
    selector:'edit-new-profile-interest-details',
    templateUrl:'edit-new-profile-interest-details.component.html'
})
export class EditNewProfileInterestDetailsComponent implements OnInit, OnDestroy{
    

    @Input() editNewProfile;
    @Input() interest: string;

    private _subscription: Subscription[] = [];
    detailsForm: FormGroup;
 
    details: string[] = [];
    detailsSelected: string[] = [];
  
    private _profileService: ProfileService;

    constructor (profileService: ProfileService){
        this._profileService = profileService;
    }

    ngOnInit(){
        this.details = profileInterestsDetails[this.interest];
        this.setDetailsForm();
    } 
 
    setDetailsForm(): void{
        let profileDetails = new FormArray([]);

        if (this.editNewProfile.interestsDetails){

            if (this.editNewProfile.interestsDetails[this.interest]){
                for (let detail of this.editNewProfile.interestsDetails[this.interest]){
                    profileDetails.push( new FormGroup({
                        'detail': new FormControl(detail) 
                    }));
                    this.detailsSelected.push(detail);
                }
            }
        }

        this.detailsForm = new FormGroup({
            'details': profileDetails
        })

        this._subscription.push(
            this.detailsForm.valueChanges
                .subscribe(change => {

                    this.editNewProfile.interestsDetails[this.interest] = [];
                    this.detailsSelected = [];

                    change.details.forEach(detail => {
                        this.editNewProfile.interestsDetails[this.interest].push(detail.detail);

                        this.detailsSelected.push(detail.detail);
                    })

                })
        );
        
    }
    onAddDetail(){
        (<FormArray>this.detailsForm.get('details')).push(new FormGroup({
            'detail': new FormControl(null)
        }));
    }

    onDeleteDetail(index: number): void{
        (<FormArray>this.detailsForm.get('details')).removeAt(index);
    }

    ngOnDestroy(){
        this._subscription.forEach(sub => sub.unsubscribe())
    }
    

}