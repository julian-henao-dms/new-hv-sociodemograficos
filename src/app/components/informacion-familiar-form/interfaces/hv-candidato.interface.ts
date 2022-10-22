export interface CandidatoHv{
    candidato: {
        id: number;
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
        fecha_vence_licencia: Date;
        runt: number;
        id_rh_categoria: number;
        id_rh_color_piel: number;
        id_rh_grupo_sanguineo: number;
        rh: number;
        id_rh_experiencia_equipo: number;
        peso: number;
        altura: number;
        salario: number;
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
        id_cot_cliente_barrio: number;
        sync: number;
        idCotClientePais: number
    },
    referencias_familiares: [
        {
            id: number;
            id_candidato: number;
            nombre: string;
            idParentesco: number;
            edad: number;
            ne: number;
            ec: number;
            ocupacion: string;
            empresa: string;
            telResidencia: string;
            otroFamiliar: number;
            accion: number;
            nit: string;
            fechaNace: Date
        }
    ],
    estudios: [
        {
            id: number;
            idEstudio: number;
            idCandidato: number;
            idUsuario: number;
            idInstitucion: number;
            fecha_Desde: Date;
            fecha_Hasta: Date;
            id_estado_estudio: number;
            id_tipo_estudio: number;
            id_nivel_estudio: number;
            id_tipo_curso: number;
            accion: number
        }
    ],
    idiomas: [
        {
            id: number;
            idIdi: number;
            idCandidato: number;
            idUsuario: number;
            accion: number
        }
    ],
    referencias: [
        {
            id: number;
            idCandidato: number;
            nombre: string;
            celular: string;
            telefono: string;
            mail: string;
            tipo: number;
            idUsuario: number;
            empresa: string;
            Cargo: string;
            Observaciones: string;
            TiempoLaborado: string;
            MotivoRetiro: string;
            accion: number
        }
    ],
    categorias: [
        {
            id: number;
            idCandidato: number;
            IdCategoria: number;
            FechaVence: Date;
            accion: number;
        }
    ],
    cargos: [
        {
            id: number;
            idCandidato: number;
            idPerfil: number;
            idUsuario: number;
            accion: number
        }
    ]

}

