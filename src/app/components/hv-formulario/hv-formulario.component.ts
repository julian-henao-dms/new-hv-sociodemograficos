import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-hv-formulario',
  templateUrl: './hv-formulario.component.html',
  styleUrls: ['./hv-formulario.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class HvFormularioComponent implements OnInit {
  // @ViewChild('tabGroup', { static: false })
  // tabGroup!: MatTabGroup;
  stepperOrientation: Observable<StepperOrientation>;

  public isDatosBasicos:number = 1;
  public isVisible = -1;
  public typeCandidato: number = 0;
  public operacionesDisabled = true;
  public isLinear = true;
  public isActive = true;


  constructor(
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
    ) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));


  }


  ngOnInit() {
    // console.log('prueba tabs', this.tabGroup);
  }

  ngOnChanges(){
    // console.log('prueba tabs', this.tabGroup);
  }

public onActiveTab(tabActive:boolean){
console.log("Evento tab", tabActive);
console.log("Evento tab  data", tabActive);
this.isActive = tabActive;
}

  public changeDatosBasicos(evento:any){
    console.log("Evento del hijo", evento);
    this.isDatosBasicos = evento.data;

  }


}


