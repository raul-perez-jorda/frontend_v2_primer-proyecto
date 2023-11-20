export interface CodigoNDatosMeteo {
    codigo: string,
    datosMeteoHoy: string,
    datosMeteoManana: string,
    datosMeteoPasado: string
}

export interface DatosMeteoRepresentar {
    temp_horas_hoy: {valor:number}[],
    temp_maximas: {valor:number}[],
    temp_minimas: {valor:number}[],
    estados_Cielo: {descripcion:string}[],
    probPrecipitacion: {valor:number}[]
}
