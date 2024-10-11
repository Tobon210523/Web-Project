import { Injectable } from '@angular/core';
import { Propertie } from '../interfaces/propertie.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertieService {

  propertie: Propertie = {
    userName: '',
    title: '',
    price: 0,
    bathrooms: 0,
    location: '',
    rooms: 0,
    description: ''
  }; 

  addPropertie(propertie: Propertie){
    const propertieStr = localStorage.getItem('properties');
    const properties: Propertie[] = propertieStr ? JSON.parse(propertieStr) : [];
    properties.push(propertie);
    localStorage.setItem('properties', JSON.stringify(properties));
    return{sucess: true}
  }

  setPropertie(propertie: Propertie){
    this.propertie = propertie;
  }

  getPropertie(){
    return this.propertie;
  }
}
