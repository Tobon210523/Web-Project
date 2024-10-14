import { Component } from '@angular/core';
import { Propertie } from '../../interfaces/propertie.interface';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { PropertieService } from '../../services/propertie.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-propertie',
  standalone: true,
  imports: [SHARED_IMPORTS, FormsModule],
  templateUrl: './search-propertie.component.html',
  styleUrl: './search-propertie.component.css'
})
export class SearchPropertieComponent {

  constructor(private propertieService: PropertieService, private router: Router){}

  keyWord: string = '';
  price: number = 0;
  bathrooms: number = 0;
  rooms: number = 0;
  filteredProperties: Propertie[] = [];
  properties: Propertie[] = [];

  ngOnInit(){
    const propertiesFromStorage = localStorage.getItem('properties');
    if (propertiesFromStorage) {
      this.properties = JSON.parse(propertiesFromStorage);
    }
  }

  onViewPropertie(propertie: Propertie){
    this.propertieService.setPropertie(propertie);
    this.router.navigateByUrl('/view-propertie');
  }

  onSearch(){
    this.filteredProperties = this.properties.filter(
      (propertie) => propertie.title.toLowerCase().includes(this.keyWord.toLowerCase())
    );
  }

  onFilter(){
    this.filteredProperties = this.properties.filter(
      (propertie) => 
        propertie.bathrooms <= this.bathrooms &&
        propertie.price <= this.price &&
        propertie.rooms <= this.rooms
    )
  }
}
