import { Routes } from '@angular/router';
import { SignInComponent } from './auth/login/pages/sign-in/sign-in.component';
import { HomeComponent } from './features/home/pages/home.component';
import { UserProfileComponent } from './features/profile/pages/user-profile/user-profile.component';
import { SignUpComponent } from './auth/login/pages/sign-up/sign-up.component';


export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'sign-in', component: SignInComponent },
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: UserProfileComponent },
    {path: 'sign-up', component: SignUpComponent},
    {path: '**', component: SignInComponent}

    


];
