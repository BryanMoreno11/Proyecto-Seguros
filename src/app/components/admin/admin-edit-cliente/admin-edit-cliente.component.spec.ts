import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditClienteComponent } from './admin-edit-cliente.component';

describe('AdminEditClienteComponent', () => {
  let component: AdminEditClienteComponent;
  let fixture: ComponentFixture<AdminEditClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditClienteComponent]
    });
    fixture = TestBed.createComponent(AdminEditClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
