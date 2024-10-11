import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { UserService } from '../../../../auth/services/user.service';
import { Propertie } from '../../../properties/interfaces/propertie.interface';
import { PropertieService } from '../../../properties/services/propertie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  userName: string = 'Nombre de usuario';
  email: string = 'email de usuario';
  profilePicture: string = 'foto del usuario';
  biography: string = 'Aquí puedes añadir tu biografía';
  properties: Propertie[] = [];

  constructor(private userService: UserService, private propertieService: PropertieService, private router: Router) {}
  ngOnInit(){
    this.userName = this.userService.getUserName();
    this.email = this.userService.getEmail();
    this.profilePicture = this.userService.getProfilePicture();
    this.biography = this.userService.getBiography();
    const propertiesFromStorage = localStorage.getItem('properties');
    if (propertiesFromStorage) {
      this.properties = JSON.parse(propertiesFromStorage);
    }
  }

  setPropertie(propertie: Propertie){
    this.propertieService.setPropertie(propertie);
    this.router.navigateByUrl('/edit-propertie')
  }

  isOwner(){
    const user = this.userService.getUser();
    return user.role === 'owner'
  }
}
