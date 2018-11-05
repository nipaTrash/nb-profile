import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProfileService } from '../profile.service';
import { editNewProfileMenuOptions, EditNewProfileVars } from '../profile.config';

import { Profile } from '../profile';

@Component({
  selector: 'edit-new-profile',
  templateUrl: './edit-new-profile.component.html',
  styleUrls: ['./edit-new-profile.component.css']
})
export class EditNewProfileComponent implements OnInit, OnDestroy{

    private _subscriptions: Subscription[] = [];

    public cancelConfirmation: boolean = false;
    
    public menuOptions = editNewProfileMenuOptions;
    public vars = EditNewProfileVars;
    
    public tabActive: any = this.vars.basic;

    public editNewProfile: Profile;
    private _profileService: ProfileService;


    constructor(profileService: ProfileService){
      this._profileService = profileService;
    }

    ngOnInit(){
      this.getEditNewProfile();
    }

    private getEditNewProfile(): void {

      this._subscriptions.push(

        this._profileService.getEditNewProfile()
          .subscribe((editNewProfile: Profile) => {
            this.editNewProfile = editNewProfile;
          })

      );
    }

    public doSave(): void{

      this._profileService.saveUserProfileChanges();
      this._profileService.navigateOnEditNewSave();

    }

    public doCancel(): void{
      this._profileService.resetEditNewProfile();
      this._profileService.navigateOnEditNewCancel();
    }

    ngOnDestroy(){
      this._subscriptions.forEach(sub => sub.unsubscribe());
    }
    
}
