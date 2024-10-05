import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { SupabaseService } from '../../services/supabase.service';
import { UserService } from '../../../../auth/services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  profileImageUrl: string | undefined;

  constructor(private supabaseService: SupabaseService) {}
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileName = `profile_${Date.now()}.${file.name.split('.').pop()}`;
      const folderName = 'profile-pictures';
      const publicUrl = await this.supabaseService.upload(file, fileName, folderName);

      if (publicUrl) {
        this.profileImageUrl = publicUrl; 
      } else {
        alert('Error al subir la imagen');
      }
    }
  }
}
