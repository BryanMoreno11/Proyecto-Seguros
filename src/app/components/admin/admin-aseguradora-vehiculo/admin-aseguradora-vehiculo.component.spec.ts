import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAseguradoraVehiculoComponent } from './admin-aseguradora-vehiculo.component';

describe('AdminAseguradoraVehiculoComponent', () => {
  let component: AdminAseguradoraVehiculoComponent;
  let fixture: ComponentFixture<AdminAseguradoraVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAseguradoraVehiculoComponent]
    });
    fixture = TestBed.createComponent(AdminAseguradoraVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
