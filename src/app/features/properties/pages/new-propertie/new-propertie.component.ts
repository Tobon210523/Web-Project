import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertieService } from '../../services/propertie.service';
import { UserService } from '../../../../auth/services/user.service';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { SupabaseService } from '../../../profile/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-propertie',
  standalone: true,
  imports: [SHARED_IMPORTS, ReactiveFormsModule],
  templateUrl: './new-propertie.component.html',
  styleUrl: './new-propertie.component.css'
})
export class NewPropertieComponent {

  newPropertieForm!: FormGroup;
  principalPhoto: string = "foto principal";
  firtsPhoto: string = "primera foto";
  secondPhoto: string = "segunda foto";
  thirdPhoto: string = "tercera foto"; 
  principalPhotoFile: File | null = null;
  firtsPhotoFile: File | null = null;
  secondPhotoFile: File | null = null;
  thirdPhotoFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private propertieService: PropertieService, private userService: UserService, private supabaseService: SupabaseService, private router: Router){
    this.newPropertieForm= this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      bathrooms: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      rooms: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  triggerPrincipalInput() {
    const principalPhoto = document.getElementById('principalPhoto') as HTMLInputElement;
    principalPhoto.click();
  }
  triggerFirtsInput(){
    const firtsPhoto = document.getElementById('firtsPhoto') as HTMLInputElement;
    firtsPhoto.click();
  }

  triggerSecondInput(){
    const secondPhoto = document.getElementById('secondPhoto') as HTMLInputElement;
    secondPhoto.click();
  }

  triggerThirdInput(){
    const thirdPhoto = document.getElementById('thirdPhoto') as HTMLInputElement;
    thirdPhoto.click();
  }

  onFilePrincipalPhoto(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.principalPhotoFile = file; 
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.principalPhoto = e.target.result; 
      };
      fileReader.readAsDataURL(file);
    }
  }
  onFileFirtsPhoto(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.firtsPhotoFile = file; 
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.firtsPhoto = e.target.result; 
      };
      fileReader.readAsDataURL(file);
    }
  }
  onFileSecondPhoto(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.secondPhotoFile = file; 
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.secondPhoto = e.target.result; 
      };
      fileReader.readAsDataURL(file);
    }
  }
  onFileThirdPhoto(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.thirdPhotoFile = file; 
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.thirdPhoto = e.target.result; 
      };
      fileReader.readAsDataURL(file);
    }
  }

  async onSave() {
    let publicUrl: string | undefined;
    let images = [this.principalPhoto,this.firtsPhoto,this.secondPhoto,this.thirdPhoto]
    let imagesFiles = [this.principalPhotoFile,this.firtsPhotoFile, this.secondPhotoFile, this.thirdPhotoFile]
    for (let index = 0; index < images.length; index++) {
      const file = imagesFiles[index];
      if (file instanceof File){
        const fileName = `propertie_${Date.now()}.${file.name.split('.').pop()}`;
        const folderName = 'properties-pictures';
        publicUrl = await this.supabaseService.upload(file, fileName, folderName);
        if (!publicUrl) {
          return;
        }
        images[index] = publicUrl;
      }
    }
    this.principalPhoto=images[0];
    this.firtsPhoto=images[1];
    this.secondPhoto = images[2];
    this.thirdPhoto = images[3];
  }

  async onAddPropertie(){
    if(this.dataValidate()){
      await this.onSave();
      let title = this.newPropertieForm.value.title || '';
      let price = this.newPropertieForm.value.price || '';
      let bathrooms = this.newPropertieForm.value.bathrooms || '';
      let date = this.newPropertieForm.value.date || '';
      let location = this.newPropertieForm.value.location || '';
      let rooms = this.newPropertieForm.value.rooms || '';
      let description = this. newPropertieForm.value.description || '';
      let userName = this.userService.getUser()?.userName;
      let principalPhoto = this.principalPhoto;
      let firtsPhoto = this.firtsPhoto;
      let secondPhoto = this.secondPhoto;
      let thirdPhoto = this.thirdPhoto
      let response = this.propertieService.addPropertie({
        userName, 
        title,
        price,
        bathrooms,
        date,
        location,
        rooms, 
        description, 
        principalPhoto,
        firtsPhoto,
        secondPhoto,
        thirdPhoto})
      if(response.sucess){
        console.log('exitoso')
        this.router.navigateByUrl('/profile')
      }else{
        console.log('falló')
      }
    }
  }
  
  dataValidate(){
    let validated: boolean = true;
    const titleControl = this.newPropertieForm.get('title');
    const priceControl = this.newPropertieForm.get('price');
    const bathroomsControl = this.newPropertieForm.get('bathrooms');
    const dateControl = this.newPropertieForm.get('date');
    const locationControl = this.newPropertieForm.get('location');
    const roomsControl = this.newPropertieForm.get('rooms');
    const descriptionControl = this.newPropertieForm.get('description');
     if(!titleControl || !priceControl || !bathroomsControl || !dateControl || !locationControl || !roomsControl || !descriptionControl){
      console.log('error');
      validated = false;
     }else if(!titleControl.valid){
      console.log(titleControl.errors)
      validated = false;
     }else if(!priceControl.valid){
      console.log(priceControl.errors)
      validated = false;
     }else if(!bathroomsControl.valid){
      console.log(bathroomsControl.errors)
      validated = false;
     }else if(!dateControl.valid){
      console.log(dateControl.errors)
      validated = false;
     }else if(!locationControl.valid){
      console.log(locationControl.errors)
      validated = false;
     }else if(!roomsControl.valid){
      console.log(roomsControl.errors)
      validated = false;
     }else if(!descriptionControl.valid){
      console.log(descriptionControl.errors)
      validated = false;
     }
     
     return validated;
  }

}
