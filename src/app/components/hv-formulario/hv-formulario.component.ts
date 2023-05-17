import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  StepperOrientation,
  STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hv-formulario',
  templateUrl: './hv-formulario.component.html',
  styleUrls: ['./hv-formulario.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class HvFormularioComponent implements OnInit {
  @ViewChild('tabGroup', { static: false })
  tabGroup!: MatTabGroup;
  stepperOrientation: Observable<StepperOrientation>;

  public activeTabIndex = 0;

  @ViewChild('stepper')
  stepper!: MatStepper;
  selectedStep = 0;

  public isDatosBasicos: number = 1;
  public isVisible = -1;
  public typeCandidato: number = 0;
  public operacionesDisabled = true;
  public isLinear = true;
  public isActive = true;

  constructor(
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) // private tabGroup: MatTabGroup
  {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {}

  ngOnChanges() {}
  onTabChange(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
    if (event.index === 0) {  // Si la pestaña "Datos Candidato" está seleccionada
      this.selectedStep = 0;
    }
  }
  activeTab(event: any): void {
    this.isActive = event;
  }
  flexibleTabs(event: any): void {
    this.isLinear = event;
  }

  public changeDatosBasicos(evento: any) {
    this.isDatosBasicos = evento.data;
  }

  stepChanged(event: any) {
    this.selectedStep = event.selectedIndex;

  }
}
