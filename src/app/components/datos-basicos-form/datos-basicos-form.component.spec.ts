import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasicosFormComponent } from './datos-basicos-form.component';

describe('DatosBasicosFormComponent', () => {
  let component: DatosBasicosFormComponent;
  let fixture: ComponentFixture<DatosBasicosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBasicosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosBasicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
