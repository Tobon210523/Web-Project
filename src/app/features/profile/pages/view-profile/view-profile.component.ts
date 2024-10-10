import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { UserService } from '../../../../auth/services/user.service';

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

  constructor(private userService: UserService) {}
  ngOnInit(){
    this.userName = this.userService.getUserName();
    this.email = this.userService.getEmail();
    this.profilePicture = this.userService.getProfilePicture();
    this.biography = this.userService.getBiography();
  }

  isOwner(){
    const user = this.userService.getUser();
    console.log(user.role === 'owner')
    return user.role === 'owner'
  }
}
