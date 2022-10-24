import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Sociodemograficos } from './interfaces/sociodemograficos.interface';

interface AnioAntiguedad {
  id: number;
  descripcion: string;
}
interface AnioAntigEmpresa {
  id: number;
  descripcion: string;
}
interface RangoEdad {
  id: number;
  descripcion: string;
}
interface Salario {
  id: number;
  descripcion: string;
}
interface CaracteristicaVivienda {
  id: number;
  descripcion: string;
}
interface UbicacionVivienda {
  id: number;
  descripcion: string;
}
interface EstratoServicios {
  id: number;
  descripcion: string;
}
interface ServicioVivienda {
  id: number;
  descripcion: string;
}
interface NumPersonasVive {
  id: number;
  descripcion: string;
}
interface DependeEconomica {
  id: number;
  descripcion: string;
}
interface TipoTransporte {
  id: number;
  descripcion: string;
}
interface Pais {
  id: string;
  descripcion: string;
}
interface Depto {
  id: string;
  descripcion: string;
}
interface Ciudad {
  id: string;
  descripcion: string;
}
@Component({
  selector: 'app-sociodemograficos',
  templateUrl: './sociodemograficos.component.html',
  styleUrls: ['./sociodemograficos.component.scss'],
})
export class SociodemograficosComponent implements OnInit {
  public idEmp: number = 3;
  public numRegla: number = 159;

  public isDisable: boolean = true;
  public buttonDisabled: boolean = true;

  public sociodemograficos: Sociodemograficos = {
    consentimiento_informado: -1,
    // empresa:'',
    // sede:'',
    // area:'',e
    // fechaIngreso: new Date,
    id_antiguedad_empresa: 0,
    id_antiguedad_cargo: 0,
    id_ingresos: 0,
    // arl: 0,
    id_tipo_afiliacion: 0,
    // paisNacimiento: 0,
    // deptoNacimiento: 0,
    // ciudadNacimiento: 0,
    id_caracteristica_vivienda: 0,
    id_zona_ubica: 0,
    servicios: 0, // cuenta con servicios
    servicios_vivienda: 0,
    tamano_vivienda: 0,
    condicion_vivienda: 0,
    id_estrato_servicios: 0,
    personas_vive: 0,
    numero_hijos: 0,
    id_edad_hijos: 0,
    personas_depende: 0,
    persona_discapacidad: 0,
    tipo_transporte: 0,
    ruta_segura: 0,
    tiempo_descanso: 0,
    otras_actividades: '',
    actividad_fisica: 0,
    fumador: 0,
    servicios_salud: 0,
    usa_lentes: 0,
  };

  public showFields = false;
  typeAfiliado = 0;
  tiposAfiliado = [
    { value: 0, name: 'Dependiente' },
    { value: 1, name: 'Independiente' },
  ];

  optionsYesNo = [
    { value: 1, name: 'Si' },
    { value: 0, name: 'No' },
  ];

  aniosAntigCargo: AnioAntiguedad[] = [
    { id: 0, descripcion: '0 a 2 años' },
    { id: 1, descripcion: '2 a 5 años' },
  ];
  aniosAntigEmpresa: AnioAntigEmpresa[] = [
    { id: 0, descripcion: '0 a 2 años' },
    { id: 1, descripcion: '2 a 5 años' },
  ];
  rangosEdad: RangoEdad[] = [
    { id: 0, descripcion: '0 a 2 años' },
    { id: 1, descripcion: '2 a 5 años' },
  ];
  salarios: Salario[] = [
    { id: 0, descripcion: '0 a 2 años' },
    { id: 1, descripcion: '2 a 5 años' },
  ];
  caracteristicas: CaracteristicaVivienda[] = [
    { id: 0, descripcion: 'Arrendada' },
    { id: 1, descripcion: 'Propia' },
    { id: 2, descripcion: 'Familiar' },
  ];
  ubicaciones: UbicacionVivienda[] = [
    { id: 0, descripcion: 'Rural' },
    { id: 1, descripcion: 'Urbana' },
  ];
  estratos: EstratoServicios[] = [
    { id: 0, descripcion: '1' },
    { id: 1, descripcion: '2' },
    { id: 2, descripcion: '3' },
    { id: 3, descripcion: '4' },
  ];
  numPersonas: NumPersonasVive[] = [
    { id: 0, descripcion: '1' },
    { id: 1, descripcion: '2' },
    { id: 2, descripcion: '3' },
    { id: 3, descripcion: '4' },
    { id: 4, descripcion: '5' },
    { id: 5, descripcion: '6 o más' },
  ];
  paises: Pais[] = [];
  deptos: Depto[] = [];
  ciudades: Ciudad[] = [];

  serviciosPublicos: EstratoServicios[] = [
    { id: 0, descripcion: 'Agua Potable' },
    { id: 1, descripcion: 'Luz' },
    { id: 2, descripcion: 'Gas' },
    { id: 3, descripcion: 'Teléfono' },
    { id: 4, descripcion: 'Internet' },
  ];
  dependencias: DependeEconomica[] = [
    { id: 0, descripcion: 'Hijos' },
    { id: 1, descripcion: 'Madre' },
    { id: 2, descripcion: 'Padre' },
    { id: 3, descripcion: 'Pareja' },
    { id: 4, descripcion: 'Nadie' },
  ];

  tiposTransporte: TipoTransporte[] = [
    { id: 0, descripcion: 'Caminando' },
    { id: 1, descripcion: 'Bicicleta' },
    { id: 2, descripcion: 'Moto' },
    { id: 3, descripcion: 'Vehiculo Particular' },
    { id: 4, descripcion: 'Transporte Público' },
  ];

  cols: number | undefined;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1,
  };
  colsAlt: number | undefined;

  gridByBreakpointAlt = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1,
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
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
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.colsAlt = this.gridByBreakpointAlt.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.colsAlt = this.gridByBreakpointAlt.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.colsAlt = this.gridByBreakpointAlt.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.colsAlt = this.gridByBreakpointAlt.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.colsAlt = this.gridByBreakpointAlt.xl;
          }
        }
      });
  }

  public onChange(event: any) {
    console.log('OnChanges', event);
    if (event.value != -1) {
      this.buttonDisabled = false;
      this.sociodemograficos.consentimiento_informado = event.value;
    }
  }

  async ngOnInit(): Promise<void> {
    const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');

    const idEmp = this.idEmp;
    const numRegla = this.numRegla

    const paises = await this.getAnyInformation('/pais/' + idEmp);
   if(paises === null){
     this.messageService.error('Error', 'Error interno del servidor al cargar los paises');
     return;
    }
    this.paises = paises;

    const aniosAntigEmpresa = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdAntiEmp');
    console.log('regla antg empresa',aniosAntigEmpresa)
    if(aniosAntigEmpresa === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los años de antigüedad en la empresa');
         return;
        }
    this.aniosAntigEmpresa = aniosAntigEmpresa;

    const aniosAntigCargo = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdAnticargo');
    console.log('regla antg cargo',aniosAntigCargo)
    if(aniosAntigCargo === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los años de antigüedad en el cargo');
         return;
        }
    this.aniosAntigCargo = aniosAntigCargo;


    const promIngresos = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdIngresos');
    console.log('regla antg ingresos',promIngresos)
    if(promIngresos === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los años de antigüedad en el cargo');
         return;
        }
    this.salarios = promIngresos;

    const caracteristicasVivienda = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'IdCaraVivi');
    console.log('regla caracteristicas vivienda',caracteristicasVivienda)
    if(caracteristicasVivienda === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los años de antigüedad en el cargo');
         return;
        }
    this.caracteristicas = caracteristicasVivienda;

    const ubicacionVivienda = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'id_zona_ubica');
    console.log('regla ubicación',ubicacionVivienda)
    if(ubicacionVivienda === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar las zonas de ubicación');
         return;
        }
    this.ubicaciones = ubicacionVivienda;

    const estratos = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'id_zona_ubica');
    console.log('regla estratos',estratos)
    if(estratos === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los datos de estratificación social ');
         return;
        }
    this.estratos = estratos;

    const numPersonasVive = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'id_zona_ubica');
    console.log('regla Personas vive',numPersonasVive)
    if(numPersonasVive === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los datos de estratificación social ');
         return;
        }
    this.numPersonas = numPersonasVive;

    const rangoEdadHijos = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'id_zona_ubica');
    console.log('regla rango edad hijos',rangoEdadHijos)
    if(rangoEdadHijos === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los rangos de edad ');
         return;
        }
    this.rangosEdad = rangoEdadHijos;

    const personasDependen = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'id_zona_ubica');
    console.log('regla personas dependientes',personasDependen)
    if(personasDependen === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los');
         return;
        }
    this.dependencias = personasDependen;

    const tiposTransporte = await this.getAnyInformation('/hojadevida/subcriterios/' + idEmp + '/' + numRegla + '/' + 'id_zona_ubica');
    console.log('regla tipo transporte',tiposTransporte)
    if(tiposTransporte === null){
         this.messageService.error('Error', 'Error interno del servidor al cargar los tipos de transporte');
         return;
        }
    this.tiposTransporte = tiposTransporte;



    loading.close();
  }

  private async getAnyInformation(service: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getInformacion(service).subscribe({
        next: (v) => resolve(v),
        error: (e) => {
          console.info(e);
          resolve(null);
        },
      });
    });
  }

  // public async onSelectionChangeDepto(idDepto:number): Promise<void> {
  //   const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
  //   const idEmp = this.idEmp;
  //   console.log('Datos pais', idEmp, idDepto);
  //   const ciudades = await this.getAnyInformation('/pais/ciudades/' + idEmp + '/' + idDepto);
  //    if(ciudades.length === 0){
  //     this.messageService.error('Error', 'Error interno del servidor al cargar las ciudades');
  //     return;
  //   }
  //   console.log('deptos', ciudades);
  //   this.ciudades = ciudades;
  //   console.log('datos select deptos', this.ciudades);
  //   loading.close();
  // }
  // public async onSelectionChangeCiudad(idCiudad:number): Promise<void> {
  //   const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
  //   const idEmp = this.idEmp;
  //   console.log('Datos pais', idEmp, idCiudad);
  //   const barrios = await this.getAnyInformation('/pais/barrios/' + idCiudad);
  //    if(barrios === null){
  //     this.messageService.error('Error', 'Error interno del servidor al cargar los barrios');
  //     return;
  //   }else{
  //     console.log('deptos', barrios);
  //     this.barrios = barrios;
  //     console.log('datos select deptos', this.barrios);
  //     loading.close();
  //   }

  // }

  public enviarSociodemograficos() {

    if (this.sociodemograficos.consentimiento_informado == 0) {
      this.messageService.info(
        'Consentimiento no aceptado',
        'Ha marcado NO en la casilla de consentimiento informado, solo almacenaremos esta respuesta.'
      );
    } else if (this.sociodemograficos.consentimiento_informado == 1) {
      this.messageService.success(
        'Perfecto',
        'Los datos sociodemográficos se almacenaron correctamente'
      );
    } else {
      this.messageService.error('Error', 'No se pudo almacenar la información');
    }

    console.log('Enviar', this.sociodemograficos);
  }


}
