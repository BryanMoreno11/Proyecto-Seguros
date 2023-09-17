import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesPersonasComponent } from './planes-personas.component';

describe('PlanesPersonasComponent', () => {
  let component: PlanesPersonasComponent;
  let fixture: ComponentFixture<PlanesPersonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesPersonasComponent]
    });
    fixture = TestBed.createComponent(PlanesPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
