import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeguroVehiculoComponent } from './admin-seguro-vehiculo.component';

describe('AdminSeguroVehiculoComponent', () => {
  let component: AdminSeguroVehiculoComponent;
  let fixture: ComponentFixture<AdminSeguroVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSeguroVehiculoComponent]
    });
    fixture = TestBed.createComponent(AdminSeguroVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
