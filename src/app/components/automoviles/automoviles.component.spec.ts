import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovilesComponent } from './automoviles.component';

describe('AutomovilesComponent', () => {
  let component: AutomovilesComponent;
  let fixture: ComponentFixture<AutomovilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomovilesComponent]
    });
    fixture = TestBed.createComponent(AutomovilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
