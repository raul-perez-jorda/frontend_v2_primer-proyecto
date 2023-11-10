import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClienteComponent } from './add-edit-cliente.component';

describe('AddEditClienteComponent', () => {
  let component: AddEditClienteComponent;
  let fixture: ComponentFixture<AddEditClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditClienteComponent]
    });
    fixture = TestBed.createComponent(AddEditClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
