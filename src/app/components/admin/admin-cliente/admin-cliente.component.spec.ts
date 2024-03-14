import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClienteComponent } from './admin-cliente.component';

describe('AdminClienteComponent', () => {
  let component: AdminClienteComponent;
  let fixture: ComponentFixture<AdminClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClienteComponent]
    });
    fixture = TestBed.createComponent(AdminClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
