import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestService} from "../../service/rest.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css'
})
export class CountryDetailsComponent {
  country: any;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('name');
    this.restService.getCountries().subscribe(data => {
      this.country = data.find(c => c.name.common === countryName);
    });
  }
}
