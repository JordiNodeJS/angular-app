import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Country } from '../models/country';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly apiUrl =
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags';

  readonly resource = httpResource<Country[]>(() => this.apiUrl);
}
