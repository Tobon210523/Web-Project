import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../constants/shared-imports';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userservice: UserService, private router: Router){}

  async onLogout(){
    await this.userservice.logout()
    this.router.navigateByUrl('/sign-in')
  }

}
