export interface Sociodemograficos {
  idRhCandidato:number | null;
  consentimientoinformado: number | null;
  idAntiguedadCargo:number | null;
  idAntiguedadEmpresa: number | null;
  idTipoAfiliacion:number | null;
  numeroHijos:number | null;
  idEdadHijos:number | null;
  idingresos:number | null;
  idCaracteristicaVivienda:number | null;
  idZonaUbica:number | null;
  idEstratoServicios:number | null;// list or array
  serviciosVivienda:string;// list or array
  servicios:number | null;
  personasVive:number | null;
  tamanoVivienda:number | null;
  condicionVivienda:number | null;
  personasDepende:string;
  personaDiscapacidad:number | null;
  serviciosSalud:number | null;
  tipoTransporte:string;
  rutaSegura:number | null;
  tiempoDescanso:number | null;
  otrasActividades:string;
  actividadFisica:number | null;
  fumador:number | null;
  usaLentes:number | null;
  // empresa:string;
  // sede:string;
  // area:string;
  // fechaIngreso:Date;
  // arl:number;
  // paisNacimiento:number;
  // deptoNacimiento:number;
  // ciudadNacimiento:number;
}
