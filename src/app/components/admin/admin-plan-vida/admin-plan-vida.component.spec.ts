import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanVidaComponent } from './admin-plan-vida.component';

describe('AdminPlanVidaComponent', () => {
  let component: AdminPlanVidaComponent;
  let fixture: ComponentFixture<AdminPlanVidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPlanVidaComponent]
    });
    fixture = TestBed.createComponent(AdminPlanVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
