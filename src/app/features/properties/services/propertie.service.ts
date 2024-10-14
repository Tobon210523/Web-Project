import { Injectable } from '@angular/core';
import { Propertie } from '../interfaces/propertie.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertieService {

  addPropertie(propertie: Propertie){
    const propertieStr = localStorage.getItem('properties');
    const properties: Propertie[] = propertieStr ? JSON.parse(propertieStr) : [];
    properties.push(propertie);
    localStorage.setItem('properties', JSON.stringify(properties));
    return{sucess: true}
  }

  setPropertie(propertie: Propertie){
    localStorage.setItem('propertieSelected', JSON.stringify(propertie))
  }

  getPropertie(){
    const propertieObject = localStorage.getItem('propertieSelected');
    if(propertieObject){
      return JSON.parse(propertieObject);
    }
  }
}
