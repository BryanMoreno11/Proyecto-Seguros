import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAseguradoraVehiculoComponent } from './admin-edit-aseguradora-vehiculo.component';

describe('AdminEditAseguradoraVehiculoComponent', () => {
  let component: AdminEditAseguradoraVehiculoComponent;
  let fixture: ComponentFixture<AdminEditAseguradoraVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditAseguradoraVehiculoComponent]
    });
    fixture = TestBed.createComponent(AdminEditAseguradoraVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
