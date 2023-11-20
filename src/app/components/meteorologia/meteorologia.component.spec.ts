import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteorologiaComponent } from './meteorologia.component';

describe('MeteorologiaComponent', () => {
  let component: MeteorologiaComponent;
  let fixture: ComponentFixture<MeteorologiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeteorologiaComponent]
    });
    fixture = TestBed.createComponent(MeteorologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
