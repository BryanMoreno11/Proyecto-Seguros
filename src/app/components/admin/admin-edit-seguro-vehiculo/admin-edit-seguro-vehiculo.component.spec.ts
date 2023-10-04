import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSeguroVehiculoComponent } from './admin-edit-seguro-vehiculo.component';

describe('AdminEditSeguroVehiculoComponent', () => {
  let component: AdminEditSeguroVehiculoComponent;
  let fixture: ComponentFixture<AdminEditSeguroVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditSeguroVehiculoComponent]
    });
    fixture = TestBed.createComponent(AdminEditSeguroVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
