import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PS9Component } from './ps9.component';

describe('PS9Component', () => {
  let component: PS9Component;
  let fixture: ComponentFixture<PS9Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PS9Component]
    });
    fixture = TestBed.createComponent(PS9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
