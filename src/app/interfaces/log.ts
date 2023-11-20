export interface Log {
    id_log: number,
    user: string,
    log_valido: boolean,
    fecha: string,
    direccion_ip: string
}

export interface newLog {
    user: string,
    log_valido: boolean,
    fecha: string
}
