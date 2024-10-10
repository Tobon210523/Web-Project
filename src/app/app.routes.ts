import { Routes } from '@angular/router';
import { SignInComponent } from './auth/login/pages/sign-in/sign-in.component';
import { HomeComponent } from './features/home/pages/home.component';
import { ViewProfileComponent } from './features/profile/pages/view-profile/view-profile.component';
import { SignUpComponent } from './auth/login/pages/sign-up/sign-up.component';
import { NewPropertieComponent } from './features/properties/pages/new-propertie/new-propertie.component';
import { EditProfileComponent } from './features/profile/pages/edit-profile/edit-profile.component';


export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'sign-in', component: SignInComponent },
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ViewProfileComponent },
    {path: 'sign-up', component: SignUpComponent},
    {path: 'prueba', component: NewPropertieComponent},
    {path: 'edit-profile', component: EditProfileComponent},
    {path: 'properties', component: NewPropertieComponent},
    {path: '**', component: SignInComponent}

    


];
