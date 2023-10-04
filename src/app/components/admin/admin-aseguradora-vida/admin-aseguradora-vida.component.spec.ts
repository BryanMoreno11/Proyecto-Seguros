import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAseguradoraVidaComponent } from './admin-aseguradora-vida.component';

describe('AdminAseguradoraVidaComponent', () => {
  let component: AdminAseguradoraVidaComponent;
  let fixture: ComponentFixture<AdminAseguradoraVidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAseguradoraVidaComponent]
    });
    fixture = TestBed.createComponent(AdminAseguradoraVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
