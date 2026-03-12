import { ChangeDetectionStrategy, Component, effect, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-country-search',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host { display: block; }
    mat-form-field { width: 100%; }
  `,
  template: `
    <mat-form-field appearance="outline" subscriptSizing="dynamic">
      <mat-label>Buscar país o capital</mat-label>
      <mat-icon matPrefix>search</mat-icon>
      <input
        matInput
        type="search"
        [formControl]="searchControl"
        aria-label="Buscar país o capital"
      />
      @if (searchTerm()) {
        <button matSuffix mat-icon-button (click)="clearSearch()" aria-label="Limpiar búsqueda">
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
})
export class CountrySearch {
  readonly searchChange = output<string>();

  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly searchTerm = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  constructor() {
    effect(() => this.searchChange.emit(this.searchTerm()));
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
  }
}
