import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAutomovilComponent } from './admin-edit-automovil.component';

describe('AdminEditAutomovilComponent', () => {
  let component: AdminEditAutomovilComponent;
  let fixture: ComponentFixture<AdminEditAutomovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditAutomovilComponent]
    });
    fixture = TestBed.createComponent(AdminEditAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
