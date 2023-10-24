export interface Telefono {
    id_tel: number;
    telefono: string;
    descripc_tel: string;
}

export interface NuevoTelefono {
    id_cli: number;
    telefono: string;
    descripc_tel: string;
}

export interface Consumo {
    id_cli: number;
    id_tel: number;
    fecha: Date;
    consumo?: number;
}