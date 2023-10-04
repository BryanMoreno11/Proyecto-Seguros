import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAseguradoraVidaComponent } from './admin-edit-aseguradora-vida.component';

describe('AdminEditAseguradoraVidaComponent', () => {
  let component: AdminEditAseguradoraVidaComponent;
  let fixture: ComponentFixture<AdminEditAseguradoraVidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditAseguradoraVidaComponent]
    });
    fixture = TestBed.createComponent(AdminEditAseguradoraVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
