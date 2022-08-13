import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HvFormularioComponent } from './hv-formulario.component';

describe('HvFormularioComponent', () => {
  let component: HvFormularioComponent;
  let fixture: ComponentFixture<HvFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HvFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HvFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
