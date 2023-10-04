import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorComponent } from './controlador.component';

describe('ControladorComponent', () => {
  let component: ControladorComponent;
  let fixture: ComponentFixture<ControladorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControladorComponent]
    });
    fixture = TestBed.createComponent(ControladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
