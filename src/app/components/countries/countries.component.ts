import { Component } from '@angular/core';
import { RestService} from "../../service/rest.service";
import  { NgxChartsModule } from '@swimlane/ngx-charts';



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


  view: [number, number] = [800, 500]; // Défini la taille du chart

  // Vertical Bar chart
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Pays';
  yAxisLabelEuPopulation = 'Population';

  // Pie chart
  pieLabel = 'Superficie (km²)';
  showLabels = true;
  showLegend = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private restService: RestService) { }

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
    })
  }
}
