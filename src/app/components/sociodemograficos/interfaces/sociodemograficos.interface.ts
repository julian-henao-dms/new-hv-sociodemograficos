export interface Sociodemograficos {
  consentimiento_informado: number;
  // empresa:string;
  // sede:string;
  // area:string;
  // fechaIngreso:Date;
  id_antiguedad_empresa:number;
  id_antiguedad_cargo: number;
  id_ingresos:number;
  // arl:number;
  id_tipo_afiliacion:number;
  // paisNacimiento:number;
  // deptoNacimiento:number;
  // ciudadNacimiento:number;
  id_caracteristica_vivienda:number;
  id_zona_ubica:number;
  servicios:number;
  servicios_vivienda:number;// list or array
  id_estrato_servicios:number;// list or array
  tamano_vivienda:number;
  condicion_vivienda:number;
  personas_vive:number;
  numero_hijos:number;
  id_edad_hijos:number;
  personas_depende:number;
  persona_discapacidad:number;
  tipo_transporte:number;
  ruta_segura:number;
  tiempo_descanso:number;
  otras_actividades:string;
  actividad_fisica:number;
  fumador:number;
  servicios_salud:number;
  usa_lentes:number;
}
