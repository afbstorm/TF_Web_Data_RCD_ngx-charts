import { Component } from '@angular/core';
import { RestService} from "../../service/rest.service";
import  { NgxChartsModule } from '@swimlane/ngx-charts';
import {Router} from "@angular/router";



@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent {

  europeanPopulationData: {name: string, value: number}[] = [];
  regionData: {name: string, value: number}[] = [];

  // TOP
  topPopulationData: { name: string, value: number }[] = [];
  topLanguageData: { name: string, value: number }[] = [];
  topAreaData: { name: string, value: number }[] = [];


  view: [number, number] = [800, 500]; // Défini la taille du chart

  // Vertical Bar chart
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Pays';
  yAxisLabelEuPopulation = 'Population';

  // Pie chart
  showLabels = true;
  showLegend = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit(): void {
    this.loadCountriesDatas()
  }

  loadCountriesDatas(): void {
    this.restService.getCountries().subscribe(data => {
      // Récupération des 25 premiers pays d'Europe
      const topEuropeanCountries = data.filter(country => country.region === 'Europe').slice(0,25);
      // Récupération des 50 premiers pays du monde
      const areaCountries = data.slice(0,50);

      // Insertion des datas dans le tableau
      this.europeanPopulationData = topEuropeanCountries.map(country => ({
        name: country.name.common,
        value: country.population
      }))

      this.regionData = areaCountries.map(country => ({
        name: country.name.common,
        value: country.area
      }))

      this.restService.getTopPopulatedCountries().subscribe(data => {
        console.log(data)
        this.topPopulationData = data;
      });

      this.restService.getTopLanguages().subscribe(data => {
        this.topLanguageData = data;
      });

      this.restService.getTopCountriesByArea().subscribe(data => {
        this.topAreaData = data;
      });
    })
  }
  onSelect(event: any): void {
    // Check if the selection was from the language chart or country chart
    if (this.topLanguageData.some(language => language.name === event.name)) {
      this.router.navigate(['/language', event.name]);
    } else {
      this.router.navigate(['/country', event.name]);
    }
  }

  formatTooltipText(data: { name: string, value: number }): string {
    return `${data.value} km²`;
  }
}
