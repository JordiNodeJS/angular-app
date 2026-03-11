import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.scss',
})
export class Hello {
  protected readonly title = 'Interacción mínima';
  protected readonly isDisabled = signal(false);
  protected readonly count = signal(0);
  protected readonly counterFeedback = signal('');
  protected readonly statusLabel = computed(() => (this.isDisabled() ? 'Desactivado' : 'Activo'));

  protected onClick() {
    this.isDisabled.update((value) => !value);
  }

  protected doubleCount = computed(() => this.count() * 2);

  private countSideEffect = effect((onCleanup) => {
    const currentCount = this.count();

    this.counterFeedback.set(
      currentCount === 0 ? 'El contador está en cero. Pulsa “+” o “-” para cambiarlo.' : `Nuevo valor: ${currentCount}`,
    );

    const timeout = window.setTimeout(() => {
      this.counterFeedback.set('');
    }, 1400);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  protected increaseCounter() {
    this.count.update((value) => value + 1);
  }

  protected decreaseCounter() {
    this.count.update((value) => value - 1);
  }

  protected resetCounter() {
    this.count.set(0);
  }
}
