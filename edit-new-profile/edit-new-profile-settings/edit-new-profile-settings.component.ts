import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'

import { ProfileService } from '../../profile.service';

import { settingsOptions } from '../../profile.config'

@Component({
    selector: 'edit-new-profile-settings',
    templateUrl: './edit-new-profile-settings.component.html'
})
export class EditNewProfileSettingsComponent implements OnInit, OnDestroy {

    @Input() editNewProfile;

    private _subscriptions: Subscription[] = [];

    private _fb: FormBuilder;
    public settingsForm: FormGroup;
    private _profileService: ProfileService;

    public settingsOptions = settingsOptions;
    public profilesSelected = [];
    public showProfiles = [];
  

    settingsFormViewers: string | string[] = '';
    settingsFormAdministrators: string | string[] = '';
    settingsFormContactableByMsg: string | string[] = '';
    settingsFormAuthors: string | string[] = '';
    settingsFormFellows: string | string[] = '';
    settingsFormContributors: string | string[] = '';

    public profilesAllowed: string | string[] = [];
   
    constructor (profileService: ProfileService, fb: FormBuilder ) {
        this._profileService = profileService;
        this._fb = fb;
    }

    ngOnInit(){

        this.setSettingsForm();

        this.setProfilesToSelect();

    }

    setSettingsForm(): void{
        this._subscriptions.push(
            this._profileService.getEditNewProfile()
                .subscribe(profileInfo => {
        
                    this.editNewProfile = profileInfo;
                    this.settingsFormViewers = profileInfo.viewers;
                    this.settingsFormContactableByMsg = profileInfo.contactableByMsg;
                    this.settingsFormAdministrators = profileInfo.administrators;
                    this.settingsFormAuthors = profileInfo.authors;
                    this.settingsFormFellows = profileInfo.fellows;
                    this.settingsFormContributors = profileInfo.contributors;
                    
                    this.setProfilesSelected();

                    this.createSettingsForm();
                })
        )
        
    }

    createSettingsForm(): void{

        this.settingsForm = this._fb.group({
            viewers: [ this.settingsFormViewers ],
            contactableByMsg: [ this.settingsFormContactableByMsg ],
            administrators: [ this.settingsFormAdministrators ],
            authors: [ this.settingsFormAuthors ],
            fellows: [ this.settingsFormFellows ],
            contributors: [ this.settingsFormContributors ]
        });


        this._subscriptions.push(

            this.settingsForm.valueChanges
                .subscribe((value)=>{

                    for (let option of settingsOptions){

                        this.editNewProfile[option.option] =  value[option.option];
                        this.editNewProfile[option.option+'Profiles'] = this.profilesSelected[option.option];
                        this.showProfiles[option.option] = (value[option.option] === 'selectProfiles')? true : false;

                    }
                })
                
        )
        
    }

    setProfilesSelected(): void{

        for (let option of settingsOptions){

            this.profilesSelected[option.option] = (this.editNewProfile[option.option+'Profiles'])? this.editNewProfile[option.option+'Profiles'] : [];
           
            this.showProfiles[option.option] = (this.editNewProfile[option.option] === 'selectProfiles')? true : false;

        }

    }

    setProfilesToSelect(): void{
        this._subscriptions.push(
            this._profileService.getProfileSocialDetails('profile', 'following')
                .subscribe(res => {
                    this.profilesAllowed = res;
                })
        )

    }

    addProfilesToSettingsOption(option: string): void{

        this.editNewProfile[option] = [];
        this.profilesSelected[option].forEach(profile => this.editNewProfile[option].push(profile.id));
        
    }

    ngOnDestroy(){
        this._subscriptions.forEach(subs => subs.unsubscribe());
    }   

}