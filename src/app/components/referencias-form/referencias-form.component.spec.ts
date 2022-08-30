import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasFormComponent } from './referencias-form.component';

describe('ReferenciasFormComponent', () => {
  let component: ReferenciasFormComponent;
  let fixture: ComponentFixture<ReferenciasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenciasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
