export interface Candidato {
emp: number;
nit: string;
id_rh_tipo_documento: number;
nombre: string;
apellido: string;
id_usuario: number;
genero: number;
fecha_nacimiento: Date;
id_cot_cliente_pais: number;
direccion: string;
telefono: string;
celular: string;
mail: string;
id_rh_perfil: number;
id_cot_cliente: number;
id_rh_requisicion_personal: number;
id_rh_nivel_academico: number;
id_rh_experiencia: number;
observaciones: string;
id_tipo_candidato: number;
id_rh_experiencia_sector: number;
id_disponibilidad_viaje: number;
id_participacion_anterior: number;
id_salario: number;
id_rh_fuente_reclutamiento: number;
id_trajo_hoja_vida: number;
estado: number;
bloqueado: number;
motivo: string;
licencia: string;
tarjeta: string;
tipo_licencia: number;
fecha_vence_licencia: string;
runt: number;
id_rh_categoria: number;
id_rh_color_piel: number;
id_rh_grupo_sanguineo: number;
rh: number;
id_rh_experiencia_equipo: number;
peso: number;
altura: number;
salario: number;
id: number;
accion: number;
id_Usuario_Asociado: number;
id_con_cco: number;
id_Entidad: number;
fecExpedicion: Date;
lugarExpedicion: string;
idRhEstadoCivil: number;
idRhEps: number;
idRhFondoPension: number;
idRhFondoCaja: number;
idRhFondoCesantias: number;
pais:number; // Verificar como se consumiran
depto:number;
ciudad:number;
barrio:number;
cargoAplica: number;
}

export interface Idioma{
 idIdi: number;
 idCandidato: number;
 idUsuario: number;
 id: number;
 accion: number;
}

export interface LicCategoria{
id_candidato: number;
idCategoria: number;
fechaVence: Date;
id: number;
accion: number;
}


