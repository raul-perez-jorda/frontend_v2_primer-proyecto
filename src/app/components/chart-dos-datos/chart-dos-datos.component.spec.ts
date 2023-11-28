import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDosDatosComponent } from './chart-dos-datos.component';

describe('ChartDosDatosComponent', () => {
  let component: ChartDosDatosComponent;
  let fixture: ComponentFixture<ChartDosDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartDosDatosComponent]
    });
    fixture = TestBed.createComponent(ChartDosDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
