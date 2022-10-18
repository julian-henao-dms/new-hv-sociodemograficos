import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaArchivosHvComponent } from './carga-archivos-hv.component';

describe('CargaArchivosHvComponent', () => {
  let component: CargaArchivosHvComponent;
  let fixture: ComponentFixture<CargaArchivosHvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaArchivosHvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaArchivosHvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
