import { Component } from '@angular/core';
import { Propertie } from '../../interfaces/propertie.interface';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';

@Component({
  selector: 'app-view-propertie',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './view-propertie.component.html',
  styleUrl: './view-propertie.component.css'
})
export class ViewPropertieComponent {
  properties: Propertie[] = [];

  ngOnInit(){
    const propertiesFromStorage = localStorage.getItem('properties');
    if (propertiesFromStorage) {
      this.properties = JSON.parse(propertiesFromStorage);
    }
  }
}
