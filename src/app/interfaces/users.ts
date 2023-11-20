export interface User {
    nombre: string,
    email: string,
    password: string,
    id_rol: number
}

export interface Login {
    usuario: string;
    contraseña: string
}

export interface InfoToken {
    id_credencial: number,
    id_rol: number,
    id_cli: number
}