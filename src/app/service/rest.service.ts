import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private apiUrl: string = 'https://restcountries.com/v3.1/all'

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }

  getTopPopulatedCountries(): Observable<{ name: string, value: number }[]> {
    return this.getCountries().pipe(
      map(countries => {
        return countries
          .sort((a, b) => b.population - a.population)
          .slice(0, 10)
          .map(country => ({
            name: country.name.common,
            value: country.population
          }));
      })
    );
  }

  getTopLanguages(): Observable<{ name: string, value: number }[]> {
    return this.getCountries().pipe(
      map(countries => {
        const languageCount = new Map<string, number>();

        countries.forEach(country => {
          if (country.languages) {
            Object.values(country.languages).forEach((language: any) => {
              languageCount.set(language, (languageCount.get(language) || 0) + 1);
            });
          }
        });

        return Array.from(languageCount.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
      })
    );
  }

  getTopCountriesByArea(): Observable<{ name: string, value: number }[]> {
    return this.getCountries().pipe(
      map(countries => {
        return countries
          .sort((a, b) => b.area - a.area)
          .slice(0, 20)
          .map(country => ({
            name: country.name.common,
            value: country.area
          }));
      })
    );
  }
}
