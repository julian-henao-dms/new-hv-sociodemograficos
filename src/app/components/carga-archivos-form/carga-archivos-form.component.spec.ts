import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaArchivosFormComponent } from './carga-archivos-form.component';

describe('CargaArchivosFormComponent', () => {
  let component: CargaArchivosFormComponent;
  let fixture: ComponentFixture<CargaArchivosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaArchivosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaArchivosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
