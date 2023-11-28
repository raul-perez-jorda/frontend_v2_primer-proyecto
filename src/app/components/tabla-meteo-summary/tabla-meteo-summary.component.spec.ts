import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMeteoSummaryComponent } from './tabla-meteo-summary.component';

describe('TablaMeteoSummaryComponent', () => {
  let component: TablaMeteoSummaryComponent;
  let fixture: ComponentFixture<TablaMeteoSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaMeteoSummaryComponent]
    });
    fixture = TestBed.createComponent(TablaMeteoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
