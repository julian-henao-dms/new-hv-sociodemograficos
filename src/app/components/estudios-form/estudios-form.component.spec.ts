import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosFormComponent } from './estudios-form.component';

describe('EstudiosFormComponent', () => {
  let component: EstudiosFormComponent;
  let fixture: ComponentFixture<EstudiosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
