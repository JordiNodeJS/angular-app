import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header and router outlet', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('app-header')).toBeTruthy();
    expect(host.querySelector('router-outlet')).toBeTruthy();
  });
});
