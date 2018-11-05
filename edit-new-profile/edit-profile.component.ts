import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';
//import { Route } from '@angular/router';

@Component({
  selector: 'edit-profile',
  template: `<edit-new-profile></edit-new-profile>`
})
export class EditProfileComponent implements OnInit, OnDestroy{

  private _subscriptions: Subscription[] = [];
  private _profileService: ProfileService;

  constructor ( profileService: ProfileService){
    this._profileService = profileService;
  }
    
  ngOnInit(){
    this._profileService.setUserProfileToEdit();

    this.getEditNewProfile();
  }

  getEditNewProfile(): void{
    this._subscriptions.push(

      this._profileService.getEditNewProfile()
        .take(1)
        .subscribe(res => {

          if (res && !res.id){
            this.doCancel();
          }

        })

    );
  }

  public doCancel(): void{

    this._profileService.resetEditNewProfile();
    this._profileService.navigateOnEditNewCancel();
    
  }

  ngOnDestroy(){
    this._subscriptions.forEach(sub => sub.unsubscribe())
  }
}
