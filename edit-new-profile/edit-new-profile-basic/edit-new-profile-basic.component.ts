import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProfileService } from '../../profile.service';

import { langs } from '../../profile.config';

import { Profile } from '../../profile';
import { User } from '../../user';

@Component({
    selector:'edit-new-profile-basic',
    templateUrl:'edit-new-profile-basic.component.html'
})
export class EditNewProfileBasicComponent implements OnInit, OnDestroy{

    @Input() editNewProfile: Profile;
    
    public loggedUser: User;
    public urlAvailability = true;
    
    public profileFrom: string = '';
    public profileName: string = '';
    public profileUrlName: string = '';
    public profileEmail: string = '';
    public profileLang: string = '';
    
    public langs: string[] = langs;
    
    editNewForm: FormGroup;

    private _profileService: ProfileService;
    private _subscriptions: Subscription[] = [];
    
    constructor(profileService:ProfileService){
        this._profileService = profileService;
    }

    ngOnInit(){

        this.getLoggedUser();
        this.setProfileFrom()

        this.setFormDfltValues();
 
    } 

    getLoggedUser(): void{
        this._subscriptions.push(
            this._profileService.getLoggedUser()
                .subscribe((loggedUser: User) => {
                    this.loggedUser = loggedUser;
                })  
        )   
    }

    setProfileFrom(): void{
        this._subscriptions.push(
            this._profileService.getUserProfile()
                .subscribe((userProfile: Profile) =>{
                    this.profileFrom = userProfile.id;
                }) 
        ); 
    }

    setFormDfltValues(): void{
        this._subscriptions.push(
            this._profileService.getEditNewProfile()
                .subscribe((editNewProfile: Profile) => {

                    this.editNewProfile = editNewProfile;
                    this.profileName = this.editNewProfile.name;
                    this.profileUrlName = this.editNewProfile.urlName;
                    this.profileEmail = (this.editNewProfile.id)? this.editNewProfile.email : this.loggedUser.email;
                    this.profileLang = this.editNewProfile.lang;
                    
                    this.setForm();
                }) 
        );  
    }
    
    setForm(): void{
        this.editNewForm = new FormGroup({
            'profileFrom': new FormControl(this.profileFrom),
            'name': new FormControl(this.profileName, [Validators.required]),
            'urlName':new FormControl(this.profileUrlName, [Validators.required]),
            'email': new FormControl(this.profileEmail, [Validators.email]),
            'lang': new FormControl(this.profileLang) 
        });

        this._subscriptions.push(
            this.editNewForm.valueChanges
                .subscribe((value)=>{
                    this.editNewProfile.profileFrom = value.profileFrom;
                    this.editNewProfile.name = value.name;
                    this.editNewProfile.urlName = value.urlName;
                    this.editNewProfile.email = value.email;
                    this.editNewProfile.lang = value.lang;
                    
                })
        );
    }
    setUrlName({target}): void{
        
        const urlName = target.value.replace(/\s/g,'_');
        this.editNewForm.patchValue({
            'urlName':urlName
        });
    }

    

    checkUrlNameAvailability(): void{
        this._subscriptions.push(
            this._profileService.checkUrlNameAvailability(this.editNewProfile.urlName)
                .subscribe((res: boolean) => {
                    this.urlAvailability = res;   
                })
        )    
    }
    createProfile():  void{
        this._subscriptions.push(
            this._profileService.checkUrlNameAvailability(this.editNewProfile.urlName)
                .subscribe((res: boolean) => {
                    this.urlAvailability = res; 
                      
                    if(this.urlAvailability){
                        this._profileService.saveUserProfileChanges()
                    }  
                })
        ) 
    }


    ngOnDestroy(){
        this._subscriptions.forEach(sub => sub.unsubscribe())
    }
}