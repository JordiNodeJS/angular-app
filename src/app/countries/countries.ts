import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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
export class Countries implements OnInit {
  private readonly countryService = inject(CountryService);

  protected readonly countries = signal<Country[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly searchTerm = signal('');

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

  ngOnInit(): void {
    this.countryService.getAll().subscribe({
      next: (data) => {
        this.countries.set(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los países. Inténtalo de nuevo más tarde.');
        this.loading.set(false);
      },
    });
  }

  protected onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  protected onFlagError(event: Event, country: Country): void {
    const img = event.target as HTMLImageElement;
    if (country.flags.svg && img.src !== country.flags.svg) {
      img.src = country.flags.svg;
    }
  }
}
