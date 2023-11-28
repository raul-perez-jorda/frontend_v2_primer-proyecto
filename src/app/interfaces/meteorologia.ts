export interface CodigoNDatosMeteo {
    codigo: string,
    datosMeteoHoy: string,
    datosMeteoManana: string,
    datosMeteoPasado: string
}

export interface DatosMeteoRepresentar {
    temp_horas_hoy: {valor_int:number}[],
    sensTermica_hoy: {valor_int:number}[],
    temp_maximas: {valor_int:number}[],
    temp_minimas: {valor_int:number}[],
    estados_Cielo: {
        descripcion:string,
        valor_string:string} [],
    probPrecipitacion: {valor_int:number}[]
}
