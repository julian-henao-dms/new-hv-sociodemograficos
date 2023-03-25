export interface DatosBasicosCandidato {
  // [x: string]: any;
  id:number;
  emp: number;
  id_usuario: number;
  id_tipo_candidato: number | null;
  id_rh_tipo_documento: number | null;//*
  nit: string;  //*
  fecExpedicion: Date;//*
  lugarExpedicion: string;//*
  idCotClientePais: number | null;//
  nombre: string;//*
  apellido: string;//*
  genero: number | null;//*
  fecha_nacimiento: Date;//*
  idRhEstadoCivil: number | null;//*
  estado: number;
  telefono: string;//*
  mail: string;//*
  celular: string;//*
  direccion: string;//*
  id_cot_cliente_pais: number | null;//*
  id_cot_cliente_barrio: number | null;//*
  id_rh_experiencia: number | null;//*
  id_rh_nivel_academico: number | null;//*
  id_rh_perfil: number | null;// cargo?
  depto:number | null;
  deptoExp:number | null;
  pais:number | null;
  paisExp:number | null;
  fuente:string;
}

export interface TodosDatosCandidato{
  candidato: {
    id:number;
    emp: number;
    id_usuario: number;
    id_tipo_candidato: number | null;
    id_rh_tipo_documento: number | null;//*
    nit: string;  //*
    fecExpedicion: Date;//*
    lugarExpedicion: string;//*
    idCotClientePais: number | null;//
    nombre: string;//*
    apellido: string;//*
    genero: number | null;//*
    fecha_nacimiento: Date;//*
    idRhEstadoCivil: number | null;//*
    estado: number;
    telefono: string;//*
    mail: string;//*
    celular: string;//*
    direccion: string;//*
    id_cot_cliente_pais: number | null;//*
    id_cot_cliente_barrio: number | null;//*
    id_rh_experiencia: number | null;//*
    id_rh_nivel_academico: number | null;//*
    id_rh_perfil: number | null;// cargo?
    depto:number | null;
    deptoExp:number | null;
    pais:number | null;
    paisExp:number | null;
    fuente:string;
    id_rh_experiencia_sector: number | null;
    id_rh_experiencia_equipo: number | null;
    id_salario: number | null;
    salario: number | null;
    id_rh_fuente_reclutamiento: number | null;
    tarjeta: string;
    id_Entidad: number | null;
    id_participacion_anterior: number;
    id_trajo_hoja_vida: number;
    id_disponibilidad_viaje: number;
    runt: number;
    idRhEps: number | null;
    idRhFondoPension: number | null;
    idRhFondoCaja: number | null;
    idRhFondoCesantias: number | null;
    licencia: string;
    tipo_licencia: number | null;
    fecha_vence_licencia: Date;
    id_rh_categoria: number | null;
    id_rh_color_piel: number | null;
    id_rh_grupo_sanguineo: number | null;
    rh: number | null;
    peso: number | null;
    altura: number | null;
},
referencias_familiares: any [
  // ...this.infoFamilia
],
estudios: any [
    // ...this.estudios
],
idiomas: any [
    // ...this.idiomas
],
referencias: any [
  //  ...this.referencias
],
categorias: any [
  // ...this.categoriaLicencia
],
cargos: any [
  //  ...this.cargos
]
}

export interface Perfiles {
  id: number;
  idPerfil: number;
  idCandidato: number;
  idUsuario: number;
  accion: number;
  }
  export interface Idioma{
    id: number;
    idIdi: number;
    idCandidato: number;
    idUsuario: number;
    accion: number;
   }
   export interface IdiomaCandidato{
    id: number;
    idIdi: number;
    id_rh_candidato: number;
    id_rh_idioma: number;
    descripcion: string;
   }
   export interface PerfilCandidato{
    id: number;
    idCargo: number;
    id_rh_candidato: number;
    id_rh_perfil: number;
    cargo: string;
   }
// export interface Candidato {
// id: number;
// emp: number;
// nit: string;
// id_rh_tipo_documento: number;
// nombre: string;
// apellido: string;
// id_usuario: number;
// genero: number;
// fecha_nacimiento: Date;
// id_cot_cliente_pais: number;
// direccion: string;
// telefono: string;
// celular: string;
// mail: string;
// id_rh_perfil: number;
// id_cot_cliente: number;
// id_rh_requisicion_personal: number;
// id_rh_nivel_academico: number;
// id_rh_experiencia: number;
// observaciones: string;
// id_tipo_candidato: number;// es 1 o 2
// id_rh_experiencia_sector: number;
// id_disponibilidad_viaje: number;
// id_participacion_anterior: number;
// id_salario: number;
// id_rh_fuente_reclutamiento: number;
// id_trajo_hoja_vida: number;
// estado: number;
// bloqueado: number;
// motivo: string;
// licencia: string;
// tarjeta: string;
// tipo_licencia: number;
// fecha_vence_licencia: string;
// runt: number;
// id_rh_categoria: number;
// id_rh_color_piel: number;
// id_rh_grupo_sanguineo: number;
// rh: number;
// id_rh_experiencia_equipo: number;
// peso: number;
// altura: number;
// salario: number;
// accion: number;
// id_Usuario_Asociado: number;
// id_con_cco: number;
// id_Entidad: number;
// fecExpedicion: Date;
// lugarExpedicion: string;
// idRhEstadoCivil: number;
// idRhEps: number;
// idRhFondoPension: number;
// idRhFondoCaja: number;
// idRhFondoCesantias: number;
// pais:number; // Verificar como se consumiran
// depto:number;
// ciudad:number;
// barrio:number;
// cargoAplica: number;
// //sync 2
// }



// export interface LicCategoria{
// id_candidato: number;
// idCategoria: number;
// fechaVence: Date;
// id: number;
// accion: number;
// }


// export interface newCandidato{
//   emp: number;
//   id_usuario: number;
//   id_tipo_candidato: number;
//   nit: string;  //*
//   id_rh_tipo_documento: number;//*
//   fecExpedicion: string;//*
//   lugarExpedicion: string;//*
//   idCotClientePais: number;//
//   nombre: string;//*
//   apellido: string;//*
//   genero: number;//*
//   fecha_nacimiento: string;//*
//   idRhEstadoCivil: number;//*
//   telefono: string;//*
//   mail: string;//*
//   celular: string;//*
//   direccion: string;//*
//   id_cot_cliente_pais: number;//*
//   id_cot_cliente_barrio: number;//*
//   id_rh_experiencia: number;//*
//   id_rh_nivel_academico: number;//*
//   id_rh_perfil: number;// cargo?
//   //
//   observaciones: string;
//   //
//   id_rh_experiencia_sector: number;//?
//   id_rh_experiencia_equipo: number;//?
//   id_salario: number;//?
//   salario: number;//?
//   id_rh_fuente_reclutamiento: number;
//   tarjeta: string;
//   id_Entidad: number; //?
//   id_participacion_anterior: number;
//   id_trajo_hoja_vida: number;
//   id_disponibilidad_viaje: number;
//   runt: number;
//   estado: number;
//   idRhEps: number;
//   idRhFondoPension: number;
//   idRhFondoCaja: number;
//   idRhFondoCesantias: number;
//   licencia: string;
//   tipo_licencia: number;
//   fecha_vence_licencia: string;
//   id_rh_categoria: number;
//   id_rh_color_piel: number;
//   id_rh_grupo_sanguineo: number;
//   rh: number;
//   peso: number;
//   altura: number;
//   bloqueado: number;
//   id_rh_requisicion_personal: number;//?
//   motivo: string;
//   id: number;
//   accion: number;
//   id_Usuario_Asociado: number;
//   id_con_cco: number;
//   sync: number;
//   id_cot_cliente: number;

// }
