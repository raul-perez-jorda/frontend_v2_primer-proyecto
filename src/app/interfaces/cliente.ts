export interface Cliente {
    id_cli: number;
    nombre: string;
    email: string;
    user: string
}
export interface RespuestaCliente{
    id_cli: number;
    message: string;
}