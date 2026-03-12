import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Country } from '../models/country';

@Component({
  selector: 'app-country-card',
  imports: [DecimalPipe, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './country-card.scss',
  template: `
    <img
      class="country-card__flag"
      [src]="country().flags.png"
      [alt]="country().flags.alt || 'Bandera de ' + country().name.common"
      width="96"
      height="64"
      loading="lazy"
      (error)="onFlagError($event)"
    />
    <div class="country-card__body">
      <h3 class="country-card__name">{{ country().name.common }}</h3>
      <p class="country-card__official">{{ country().name.official }}</p>
      <dl class="country-card__details">
        <div class="country-card__detail">
          <dt>
            <mat-icon class="country-card__detail-icon" aria-hidden="true" fontIcon="location_city" />
            Capital
          </dt>
          <dd>{{ country().capital.length ? country().capital.join(', ') : 'N/A' }}</dd>
        </div>
        <div class="country-card__detail">
          <dt>
            <mat-icon class="country-card__detail-icon" aria-hidden="true" fontIcon="people" />
            Población
          </dt>
          <dd>{{ country().population | number }}</dd>
        </div>
      </dl>
    </div>
  `,
})
export class CountryCard {
  readonly country = input.required<Country>();

  protected onFlagError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const flags = this.country().flags;
    if (flags.svg && img.src !== flags.svg) {
      img.src = flags.svg;
    }
  }
}
