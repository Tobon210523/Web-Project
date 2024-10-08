import { Component } from '@angular/core';
import { UserService } from '../../../../auth/services/user.service';
import { SupabaseService } from '../../services/supabase.service';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [SHARED_IMPORTS, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  userName: string = 'Nombre de usuario';
  email: string = 'email de usuario';
  profilePicture: string = 'foto del usuario';
  biography: string = 'Aquí puedes añadir tu biografía';
  selectedFile: File | null = null;

  ngOnInit(){
    this.userName = this.userService.getUserName();
    this.email = this.userService.getEmail();
    this.profilePicture = this.userService.getProfilePicture();
    this.biography = this.userService.getBiography() || "Aquí puedes añadir tu biografía";
  }
  constructor(private userService: UserService, private supabaseService: SupabaseService, private router: Router){}

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file; 
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.profilePicture = e.target.result; 
      };
      fileReader.readAsDataURL(file);
    }
  }

  updateProfilePicture(imageUrl: string) {
    const user = this.userService.getUser();
    user.profilePicture = imageUrl;
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }
  async onSave() {
    let publicUrl: string | undefined;
    if (this.selectedFile) {
      const fileName = `profile_${Date.now()}.${this.selectedFile.name.split('.').pop()}`;
      const folderName = 'profile-pictures';
      publicUrl = await this.supabaseService.upload(this.selectedFile, fileName, folderName);

      if (!publicUrl) {
        return;
      }
    }
    const user = this.userService.getUser();
    user.email = this.email;
    user.biography = this.biography;

    if (publicUrl) {
      user.profilepicture = publicUrl;
    }

    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.router.navigateByUrl('/profile')
  }
}
