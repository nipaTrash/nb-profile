import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';

import { 
    NbProfileService, 
    NbUserService, 
    NbLangsService, 
    NbNavigationService 
} from '../nb-services';

import { Profile } from './profile';
import { User } from './user';
import { ProfileSocialStats } from './profile-social-stats';

@Injectable()
export class ProfileService{
    
    private _nbProfileService: NbProfileService;
    private _nbUserService: NbUserService;
    private _nbLangsService: NbLangsService;
    private _nbNavigationService: NbNavigationService;


    constructor(
        nbProfileService: NbProfileService, 
        nbUserService: NbUserService,
        nbLangsService: NbLangsService,
        nbNavigationService: NbNavigationService
    ){
        this._nbProfileService = nbProfileService;
        this._nbUserService = nbUserService;
        this._nbLangsService = nbLangsService;
        this._nbNavigationService = nbNavigationService;
    }
 
    getLangs(): Observable<string[]>{
        return this._nbLangsService.getLangs();
    }

    getProfileInfo(profileId): Observable<Profile>{
        return this._nbProfileService.getProfileInfo(profileId);
    }
   
    setUserProfileToEdit(): void{
        this._nbProfileService.setUserProfileToEdit()
    }
    getUserProfile(): Observable<Profile>{
        return this._nbProfileService.getUserProfile();
    }
    getProfile(): Observable<Profile>{
        return this._nbProfileService.getProfile();
    }
    getLoggedUser(): Observable<User>{
        return this._nbUserService.getLoggedUser();
    }
    
    getProfileSocialDetails(itemstype, list): Observable<ProfileSocialStats>{
        return this._nbProfileService.getProfileSocialDetails(itemstype, list)
    }

    getEditNewProfile(): Observable<Profile>{
        return this._nbProfileService.getEditNewProfile();
    }
    resetEditNewProfile(): void{
        this._nbProfileService.resetEditNewProfile();
    }

  
    saveUserProfileChanges(): void{
        this._nbProfileService.saveUserProfileChanges();

    }
   
    updateProfile(profile): void{
        this._nbProfileService.updateProfile(profile);

    }

    createNewProfile(newProfile): void{
        this._nbProfileService.createNewProfile(newProfile);
    }

    setEditNewProfileType(type): void{
        this._nbProfileService.updateEditNewProfile({type: type});
    }
  
    checkUrlNameAvailability(urlName): Observable<boolean>{
        return this._nbProfileService.checkProfileAvailability({urlName:urlName})
    }
    
    navigateOnEditNewSave(): void{
        this._nbNavigationService.redirectToHome();
    }

    navigateOnCreateProfile(type): void{
        this._nbNavigationService.redirectToEditProfile(type);
    }   
       
    navigateOnEditNewCancel(): void{
        this._nbNavigationService.redirectTo();
    }      
     
}