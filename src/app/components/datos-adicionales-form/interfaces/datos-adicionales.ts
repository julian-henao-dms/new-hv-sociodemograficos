export interface Licencia{
  id: number;
  idCandidato: number;
  idCategoria: number;
  fechaVence: Date;
  accion: number;
}
export interface DatosAdicionalesCandidato{
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
fecha_vence_licencia: string;
id_rh_categoria: number | null;
id_rh_color_piel: number | null;
id_rh_grupo_sanguineo: number | null;
rh: number | null;
peso: number | null;
altura: number | null;
}
