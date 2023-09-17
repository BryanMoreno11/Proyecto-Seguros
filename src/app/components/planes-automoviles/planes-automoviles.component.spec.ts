import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesAutomovilesComponent } from './planes-automoviles.component';

describe('PlanesAutomovilesComponent', () => {
  let component: PlanesAutomovilesComponent;
  let fixture: ComponentFixture<PlanesAutomovilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesAutomovilesComponent]
    });
    fixture = TestBed.createComponent(PlanesAutomovilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
