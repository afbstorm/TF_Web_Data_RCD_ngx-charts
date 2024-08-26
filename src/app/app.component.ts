import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CountriesComponent} from "./components/countries/countries.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngxcharts';
}
