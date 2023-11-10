import jsPDF from "jspdf";

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
    id_consumo: number;
    consumo: number;
    fecha: Date;
}

export interface NuevoConsumo {
    id_cli: number;
    id_tel: number;
    consumo: number;
    fecha: string;
}

export interface Estadisticas {
    media_consumo: number;
    max_consumo: number;
    min_consumo: number;
}

export interface DatosCorreo {
    pdf_path: string;
    destinatario: string;
    nombre_archivo: string;
}