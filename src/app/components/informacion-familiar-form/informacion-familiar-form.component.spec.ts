import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionFamiliarFormComponent } from './informacion-familiar-form.component';

describe('InformacionFamiliarFormComponent', () => {
  let component: InformacionFamiliarFormComponent;
  let fixture: ComponentFixture<InformacionFamiliarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionFamiliarFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionFamiliarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
