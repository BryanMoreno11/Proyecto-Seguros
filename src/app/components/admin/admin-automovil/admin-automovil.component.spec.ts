import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAutomovilComponent } from './admin-automovil.component';

describe('AdminAutomovilComponent', () => {
  let component: AdminAutomovilComponent;
  let fixture: ComponentFixture<AdminAutomovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAutomovilComponent]
    });
    fixture = TestBed.createComponent(AdminAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
