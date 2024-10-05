import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HeroComponent } from './layout/components/hero/hero.component';
import { ServicesCardsComponent } from './layout/components/services-cards/services-cards.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AirCNC';
}
