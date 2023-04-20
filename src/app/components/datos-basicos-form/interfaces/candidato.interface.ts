export interface DatosBasicosCandidato {

  id:number;
  emp: number;
  id_usuario: number;
  id_tipo_candidato: number | null;
  id_rh_tipo_documento: number | null;
  nit: string;
  fecExpedicion: Date;
  lugarExpedicion: string;
  idCotClientePais: number | null;
  nombre: string;
  apellido: string;
  genero: number | null;
  fecha_nacimiento: Date;
  idRhEstadoCivil: number | null;
  estado: number;
  telefono: string;
  mail: string;
  celular: string;
  direccion: string;
  id_cot_cliente_pais: number | null;
  id_cot_cliente_barrio: number | null;
  id_rh_experiencia: number | null;
  id_rh_nivel_academico: number | null;
  id_rh_perfil: number | null;
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
    id_rh_tipo_documento: number | null;
    nit: string;
    fecExpedicion: Date;
    lugarExpedicion: string;
    idCotClientePais: number | null;
    nombre: string;
    apellido: string;
    genero: number | null;
    fecha_nacimiento: Date;
    idRhEstadoCivil: number | null;
    estado: number;
    telefono: string;
    mail: string;
    celular: string;
    direccion: string;
    id_cot_cliente_pais: number | null;
    id_cot_cliente_barrio: number | null;
    id_rh_experiencia: number | null;
    id_rh_nivel_academico: number | null;
    id_rh_perfil: number | null;
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

