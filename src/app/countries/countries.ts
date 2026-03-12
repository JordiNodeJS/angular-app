import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CountryCard } from './country-card';
import { CountrySearch } from './country-search';
import { CountryService } from './country.service';

@Component({
  selector: 'app-countries',
  imports: [
    DecimalPipe,
    MatIconModule,
    MatProgressSpinnerModule,
    CountryCard,
    CountrySearch,
  ],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Countries {
  private readonly countryService = inject(CountryService);

  protected readonly loading = this.countryService.resource.isLoading;
  protected readonly errorMessage = computed(() =>
    this.countryService.resource.error()
      ? 'No se pudieron cargar los países. Inténtalo de nuevo más tarde.'
      : '',
  );

  protected readonly searchTerm = signal('');

  private readonly countries = computed(() =>
    [...(this.countryService.resource.value() ?? [])].sort((a, b) =>
      a.name.common.localeCompare(b.name.common),
    ),
  );

  protected readonly filteredCountries = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const list = this.countries();
    if (!term) return list;
    return list.filter(
      (c) =>
        c.name.common.toLowerCase().includes(term) ||
        c.name.official.toLowerCase().includes(term) ||
        c.capital.some((cap) => cap.toLowerCase().includes(term)),
    );
  });

  protected readonly totalPopulation = computed(() =>
    this.filteredCountries().reduce((sum, c) => sum + c.population, 0),
  );
}
