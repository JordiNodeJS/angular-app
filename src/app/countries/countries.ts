import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Country } from '../models/country';
import { CountryService } from './country.service';

@Component({
  selector: 'app-countries',
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
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

  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(startWith('')),
    { initialValue: '' },
  );

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

  protected clearSearch(): void {
    this.searchControl.setValue('');
  }

  protected onFlagError(event: Event, country: Country): void {
    const img = event.target as HTMLImageElement;
    if (country.flags.svg && img.src !== country.flags.svg) {
      img.src = country.flags.svg;
    }
  }
}
