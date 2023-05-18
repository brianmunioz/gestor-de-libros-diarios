export default function validacionCuentas(nombre){
    const cuentasActivo = ['MERCADERÍAS','PAPELERÍA Y ÚTILES DE ESCRITORIO','CAJA', 'ARTÍCULOS DE COMPUTACIÓN','DEUDORES VARIOS','INMUEBLES','DOCUMENTOS A COBRAR','BANCO','RODADOS','DEUDORES POR VENTAS','MUEBLES Y ÚTILES','INSTALACIONES','CHEQUE DIFERIDO'];
    const cuentasPasivo = ['PROVEEDORES','ACREEDORES VARIOS'];
    const cuentasResultadoNegativo = ['FALTANTE DE CAJA','ALQUILERES PERDIDOS','INTERESES PERDIDOS','COSTO VENTA DE MERCADERÍAS','FLETES','LUZ Y TELÉFONO','SEGUROS','PAPELERÍA Y ÚTILES CONSUMIDOS','FALTANTE DE MERCADERÍA'];
    const cuentasResultadoPositivo = ['SOBRANTES DE CAJA','VENTAS','INTERESES GANADOS','ALQUILERES GANADOS'];
    const cuentasPatrimonio = ['CAPITAL'];
    const esActivo = cuentasActivo.some(cuenta=> {return cuenta === nombre.toUpperCase()});
    const esPasivo = cuentasPasivo.some(cuenta=> {return cuenta === nombre.toUpperCase()});
    const esRN = cuentasResultadoNegativo.some(cuenta=> {return cuenta === nombre.toUpperCase()});
    const esRP = cuentasResultadoPositivo.some(cuenta=> {return cuenta === nombre.toUpperCase()});
    const esPN = cuentasPatrimonio.some(cuenta=> {return cuenta === nombre.toUpperCase()});
    if(esActivo){
        return {
            debe: 'A+',
            haber: 'A-'
        }
    }else if(esPasivo){
        return {debe: 'P-', haber: 'P+'}
    }else if(esRN){
        return {debe: 'RN+', haber: 'RN-'}
    }else if(esRP){
        return {debe: 'RP-', haber: 'RP+'}
    }else if(esPN){ return {debe: 'PN-',haber: 'PN+'}}else{
        return {error: 'No es una cuenta'}
    }
}