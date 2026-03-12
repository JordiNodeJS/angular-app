import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Country } from '../models/country';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags';

  getAll() {
    return this.http.get<Country[]>(this.apiUrl);
  }
}
