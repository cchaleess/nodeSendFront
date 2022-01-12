import React from 'react'
import { useContext } from 'react'
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'


const Alerta = () => {

    //Mensaje error usuarios
    const AuthContext = useContext(authContext)
    const { mensaje } = AuthContext
    //Mensaje error archivos 
    const AppContext = useContext(appContext)
    const { mensaje_archivo } = AppContext

    return ( 

        <div className="flex justify-center">
            <div className="bg-red-500 px-3 w-full my-3 max-w-lg py-2 text-center text-white">
                <p>{mensaje || mensaje_archivo}</p>
            </div>
        </div>

     );
}

 
export default Alerta;