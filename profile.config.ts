import { 
    NbEditNewProfileMenuOptions, 
    profileSettingsOptions, 
    nbProfileInterestsOptions, 
    nbEditNewProfileMenuOptions, 
    nbLangs 
} from '../nb-config';


export const settingsOptions = profileSettingsOptions;
export const profileInterestsOptions = nbProfileInterestsOptions;
export const editNewProfileMenuOptions = nbEditNewProfileMenuOptions;
export const langs = nbLangs;


export enum EditNewProfileVars {
    basic = NbEditNewProfileMenuOptions.basic,
    settings = NbEditNewProfileMenuOptions.settings,
    interests = NbEditNewProfileMenuOptions.interests,
    description = NbEditNewProfileMenuOptions.description
}

