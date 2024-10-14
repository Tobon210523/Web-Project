import { Component } from '@angular/core';
import { Propertie } from '../../interfaces/propertie.interface';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { PropertieService } from '../../services/propertie.service';

@Component({
  selector: 'app-view-propertie',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './view-propertie.component.html',
  styleUrl: './view-propertie.component.css'
})
export class ViewPropertieComponent {
  constructor(private propertieService: PropertieService){}

  propertie!: Propertie;

  ngOnInit(){
    this.propertie = this.propertieService.getPropertie();
  }
}
