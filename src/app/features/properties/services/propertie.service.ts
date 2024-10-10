import { Injectable } from '@angular/core';
import { Propertie } from '../interfaces/propertie.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertieService {

  constructor() { }

  addPropertie(propertie: Propertie){
    const propertieStr = localStorage.getItem('properties');
    const properties: Propertie[] = propertieStr ? JSON.parse(propertieStr) : [];
    properties.push(propertie);
    localStorage.setItem('properties', JSON.stringify(properties));
    return{sucess: true}
  }

  getPropertie(){
    
  }
}
