import { Component } from '@angular/core';
import { PropertieService } from '../../services/propertie.service';
import { Propertie } from '../../interfaces/propertie.interface';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-propertie',
  standalone: true,
  imports: [SHARED_IMPORTS, FormsModule],
  templateUrl: './edit-propertie.component.html',
  styleUrl: './edit-propertie.component.css'
})
export class EditPropertieComponent {
  propertie: Propertie = {
    userName: '',
    title: '',
    price: 0,
    bathrooms: 0,
    location: '',
    rooms: 0,
    description: ''
  }
  title: string = '';
  price: number = 0;
  bathrooms: number = 0;
  location: string = '';
  rooms: number = 0;
  date: Date | undefined;
  description: string = '';
  principalPhoto: string = '';

  constructor (private propertieService: PropertieService, private router: Router){}

  ngOnInit(){
    this.propertie = this.propertieService.getPropertie();
    this.title = this.propertie.title;
    this.price = this.propertie.price;
    this.bathrooms = this.propertie.bathrooms;
    this.location = this.propertie.location;
    this.rooms = this.propertie.rooms;
    this.date = this.propertie.date;
    this.description = this.propertie.description;
    if(this.propertie.principalPhoto){
      this.principalPhoto = this.propertie.principalPhoto
    }
  }

  onSave(){
    const propertiesJSON = localStorage.getItem('properties');

    if (propertiesJSON) {
      const properties = JSON.parse(propertiesJSON);
      const index = properties.findIndex((propertie: Propertie) => 
        propertie.title === this.title && propertie.userName === this.propertie.userName
      );
    
      if (index !== -1) {
        properties[index].title = this.title;
        properties[index].price = this.price;
        properties[index].bathrooms = this.bathrooms;
        properties[index].location = this.location;
        properties[index].rooms = this.rooms;
        properties[index].date = this.date;
        properties[index].description = this.description;
        properties[index].principalPhoto = this.principalPhoto;
        localStorage.setItem('properties', JSON.stringify(properties));
      }
      this.router.navigateByUrl('/profile');
    }
  }

  onDelete(){
    // Obtener propiedades desde el localStorage
const propertiesJSON = localStorage.getItem('properties');

if (propertiesJSON) {
    let properties = JSON.parse(propertiesJSON);

    const index = properties.findIndex((propertie: Propertie) => 
      propertie.title === this.title && propertie.userName === this.propertie.userName
    );

    if (index !== -1) {
      properties.splice(index, 1);

      localStorage.setItem('properties', JSON.stringify(properties));
      this.router.navigateByUrl('/profile')
    }
  }
  }

}
