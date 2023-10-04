import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPlanVidaComponent } from './admin-edit-plan-vida.component';

describe('AdminEditPlanVidaComponent', () => {
  let component: AdminEditPlanVidaComponent;
  let fixture: ComponentFixture<AdminEditPlanVidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditPlanVidaComponent]
    });
    fixture = TestBed.createComponent(AdminEditPlanVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
