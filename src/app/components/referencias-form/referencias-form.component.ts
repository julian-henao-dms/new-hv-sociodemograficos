import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Referencias } from './interfaces/referencias.interface';
import { MatTableDataSource } from '@angular/material/table';

export interface user {
  userName: string;
  age: number;
}
export interface Referencia {
  institucion: string;
  titulo: string;
  estado: string;
  tipo: string;
  nivel: string;
}

@Component({
  selector: 'app-referencias-form',
  templateUrl: './referencias-form.component.html',
  styleUrls: ['./referencias-form.component.scss']
})
export class ReferenciasFormComponent implements OnInit {
  public datosReferencias: Referencias = {
    idCandidato: 0,
    nombre: '',
    celular: '',
    telefono: '',
    mail: '',
    tipo: 0,
    idUsuario: 0,
    empresa: '',
    cargo: '',
    observaciones: '',
    id: 0,
    accion: 0,
    tiempoLaborado: '',
    motivoRetiro: '',
  }

   public tiposReferencia = [
      { value: 0, name: "Personal" },
      { value: 1, name: "Laboral" }
    ];

  stepperOrientation: Observable<StepperOrientation>;
  cols : number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };
  constructor(private breakpointObserver: BreakpointObserver) {
    // this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }

    });
  }


  ngOnInit(): void {
  }

  // columnsToDisplay: string[] = ["userName", "age"];
  // columnsReference: string[] = ["institucion", "titulo", "estado", "tipo", "nivel" ];
  // public USER_DATA: user[] = [
  //   { userName: "Wacco", age: 12 },
  //   { userName: "Wacca", age: 13 },
  //   { userName: "Waccu", age: 14 }
  // ];
  // public REFERENCE_DATA: Referencia[] = [];
  // public newUser = {userName: "", age: 0};
  // public newReference = {institucion: '', titulo: '', estado: '', tipo: '', nivel: '' };
  // public myDataArray: any;
  // public myReferenceArray: any;

  // addName() {
  //   const newUsersArray = this.USER_DATA;
  //   newUsersArray.push(this.newUser);
  //   this.myDataArray = [...newUsersArray];
  //   this.newUser = {userName:"", age: 0};
  //   console.warn(this.myDataArray);
  // }

  // addReference() {
  //   const newReferencesArray = this.REFERENCE_DATA;
  //   newReferencesArray.push(this.newReference);
  //   this.myReferenceArray = [...newReferencesArray];
  //   this.newReference = {institucion: '', titulo: '', estado: '', tipo: '', nivel: ''};
  //   console.warn(this.myReferenceArray);
  // }



  public guardarProgreso(){
    console.log('Referencias Guardadas')
  }
}
