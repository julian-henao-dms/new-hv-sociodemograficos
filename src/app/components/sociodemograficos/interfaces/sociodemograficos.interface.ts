export interface Sociodemograficos {
  idRhCandidato:number;
  consentimientoinformado: number;
  idAntiguedadCargo:number;
  idAntiguedadEmpresa: number;
  idTipoAfiliacion:number;
  numeroHijos:number;
  idEdadHijos:number;
  idingresos:number;
  idCaracteristicaVivienda:number;
  idZonaUbica:number;
  idEstratoServicios:number;// list or array
  serviciosVivienda:string;// list or array
  servicios:number;
  personasVive:number;
  tamanoVivienda:number;
  condicionVivienda:number;
  personasDepende:string;
  personaDiscapacidad:number;
  serviciosSalud:number;
  tipoTransporte:string;
  rutaSegura:number;
  tiempoDescanso:number;
  otrasActividades:string;
  actividadFisica:number;
  fumador:number;
  usaLentes:number;
  // empresa:string;
  // sede:string;
  // area:string;
  // fechaIngreso:Date;
  // arl:number;
  // paisNacimiento:number;
  // deptoNacimiento:number;
  // ciudadNacimiento:number;
}
