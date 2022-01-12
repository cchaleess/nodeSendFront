import {REGISTRO_EXITOSO, 
        REGISTRO_ERROR, OCULTAR_ALERTA, LOGIN_ERROR, LOGIN_EXITOSO, USUARIO_AUTENTICADO, CERRAR_SESION} from '../../types';



// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case 'REGISTRO_ERROR':
        case 'REGISTRO_EXITOSO':
        case 'LOGIN_ERROR':
            return {
                ...state,
                mensaje: action.payload,
            }

        case 'OCULTAR_ALERTA':
            return {
                ...state,
                mensaje: null,
            }

        case 'LOGIN_EXITOSO':

            localStorage.setItem('RNS_token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true,
            }
        
        case 'USUARIO_AUTENTICADO':
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
            }

        case 'CERRAR_SESION':
            localStorage.removeItem('RNS_token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
            }

        default:
            return state;
    }
}