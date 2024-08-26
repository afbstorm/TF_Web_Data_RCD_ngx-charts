import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../../service/rest.service";

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.css'
})
export class CountriesListComponent {
  countries: any[] = [];
  language: string | null;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language')
    this.loadCountries();
  }

  loadCountries(): void {
    this.restService.getCountries().subscribe(data => {
      this.countries = data.filter(country =>
        Object.values(country.languages || {}).includes(this.language)
      );
    });
  }

  onSelectCountry(country: any): void {
    this.router.navigate(['/country', country.name.common]);
  }
}
