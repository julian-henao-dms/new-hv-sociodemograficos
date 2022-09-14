import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Estudios } from "./interfaces/estudios.interface"
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/services/local-storage.service';


interface Institucion{
  value: number;
  viewValue: string;
}
interface TipoEstudio{
  value: number;
  viewValue: string;
}
interface NivelEstudio{
  value: number;
  viewValue: string;
}
interface Titulo{
  value: number;
  viewValue: string;
}
interface EstadoEstudio{
  value: number;
  viewValue: string;
}
interface TipoCurso{
  value: number;
  viewValue: string;
}

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
interface EstudiosList {
  institucion: {
    value: number;
    description: string;
  };
  titulo: {
    value: number;
    description: string;
  };
  estado: {
    value: number;
    description: string;
  };
  tipo: {
    value: number;
    description: string;
  };
  nivel: {
    value: number;
    description: string;
  };
}

@Component({
  selector: 'app-estudios-form',
  templateUrl: './estudios-form.component.html',
  styleUrls: ['./estudios-form.component.scss']
})
export class EstudiosFormComponent implements OnInit {
  public disabledButtonNext: boolean = true;
  public datosEstudios: Estudios ={
    idEstudio: 0,
    idCandidato: 0,
    idUsuario: 0,
    idInstitucion: 0,
    fecha_Desde: new Date,
    fecha_Hasta: new Date,
    id_estado_estudio: 0,
    id_tipo_estudio: 0,
    id_nivel_estudio: 0,
    id_tipo_curso: 0,
    id: 0,
    accion: 0,
    titulo: 0 // subitem?
  }


  // public selectedInstitucion ="";
  public instituciones: Institucion[] = [
    {value: 0, viewValue: 'SENA'},
    {value: 1, viewValue: 'Universidad del Valle'},
    {value: 2, viewValue: 'Universidad Nacional'},
    {value: 3, viewValue: 'Universidad Haveriana'},
  ];
  public titulos: Titulo[] = [
    {value: 0, viewValue: 'Abogado'},
    {value: 1, viewValue: 'Ingeniero Civil'},
    {value: 2, viewValue: 'Ingeniero de Sistemas'},
    {value: 3, viewValue: 'Analista'},
    {value: 3, viewValue: 'Economista'},
  ];
  public estadosEstudio: EstadoEstudio[] = [
    {value: 0, viewValue: 'Culminado'},
    {value: 1, viewValue: 'En Curso'},
    {value: 2, viewValue: 'Abandonado'},
    {value: 3, viewValue: 'Aplazado'},
    {value: 3, viewValue: 'Economista'},
  ];

  public tiposEstudio: TipoEstudio[] = [
    {value: 0, viewValue: 'Pregrado'},
    {value: 1, viewValue: 'Especialización'},
    {value: 2, viewValue: 'Estudio Complementario'},
    {value: 3, viewValue: 'Maestría'},
    {value: 3, viewValue: 'Doctorado'},
  ];
  public nivelesEstudio: NivelEstudio[] = [
    {value: 0, viewValue: 'Técnica Laboral'},
    {value: 1, viewValue: 'Formación Técnica Profesional'},
    {value: 2, viewValue: 'Tecnológica'},
    {value: 3, viewValue: 'Universidad'},
  ];
  public tiposCurso: TipoCurso[] = [
    {value: 0, viewValue: 'Curso'},
    {value: 1, viewValue: 'Taller'},
    {value: 2, viewValue: 'Seminario'},
    {value: 3, viewValue: 'Diplomado'},
    {value: 3, viewValue: 'Otros'},
  ];
  public stepperOrientation: Observable<StepperOrientation>;
  public cols : number | undefined;
  public gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };
  constructor(private breakpointObserver: BreakpointObserver, private _guardarProgreso: LocalStorageService) {

    this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);
    this.myReferenceArray = new MatTableDataSource<EstudiosList>([...this.REFERENCE_DATA]);
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


  columnsToDisplay: string[] = ["userName", "age"];
  columnsReference: string[] = ["institucion", "titulo", "estado", "tipo", "nivel" ];
  public USER_DATA: user[] = [
    { userName: "Wacco", age: 12 },
    { userName: "Wacca", age: 13 },
    { userName: "Waccu", age: 14 }
  ];
  public REFERENCE_DATA: EstudiosList[] = [];
  public newUser = {userName: "", age: 0};
  public newReference = {
    institucion: {
      value: 0,
      description: '',
    },
    titulo: {
      value: 0,
      description: '',
    },
    estado: {
      value: 0,
      description: '',
    },
    tipo: {
      value: 0,
      description: '',
    },
    nivel: {
      value: 0,
      description: '',
    },
   };
  public myDataArray: any;
  public myReferenceArray: any;

  addName() {
    const newUsersArray = this.USER_DATA;
    newUsersArray.push(this.newUser);
    this.myDataArray = [...newUsersArray];
    this.newUser = {userName:"", age: 0};
    console.warn(this.myDataArray);
  }

  addReference() {
    const newReferencesArray = this.REFERENCE_DATA;
    newReferencesArray.push(this.newReference);
    this.myReferenceArray = [...newReferencesArray];
    this.newReference = {
      institucion: {
        value: 0,
        description: '',
      },
      titulo: {
        value: 0,
        description: '',
      },
      estado: {
        value: 0,
        description: '',
      },
      tipo: {
        value: 0,
        description: '',
      },
      nivel: {
        value: 0,
        description: '',
      },
     };
    console.warn(this.myReferenceArray);
  }


  public guardarProgreso(){
    console.log('Datos Estudios Guardados', this.datosEstudios);
    this._guardarProgreso.set('datosEstudiosStorage', this.datosEstudios);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    console.log('Cargar Datos Estudios', this.datosEstudios);
    this._guardarProgreso.get('datosEstudiosStorage');
  }
}
