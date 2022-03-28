export const formatearFecha = fecha => {
    const nuevaFecha = new Date( fecha.split('T')[0].split('-') ); //Necesario este formateo de fecha para que si funcione correctamente
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return nuevaFecha.toLocaleDateString('es-Es', opciones)
}