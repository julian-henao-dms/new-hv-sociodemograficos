import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAdicionalesFormComponent } from './datos-adicionales-form.component';

describe('DatosAdicionalesFormComponent', () => {
  let component: DatosAdicionalesFormComponent;
  let fixture: ComponentFixture<DatosAdicionalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosAdicionalesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosAdicionalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
