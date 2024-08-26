import { Routes } from '@angular/router';
import {CountriesComponent} from "./components/countries/countries.component";
import {CountryDetailsComponent} from "./components/country-details/country-details.component";
import {CountriesListComponent} from "./components/countries-list/countries-list.component";

export const routes: Routes = [
  { path: '', component: CountriesComponent },
  { path: 'country/:name', component: CountryDetailsComponent },
  { path: 'language/:language', component: CountriesListComponent }
];
