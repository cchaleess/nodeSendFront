import React,{useCallback, useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import clienteAxios from '../config/axios';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Formulario from '../components/Formulario';

const Dropzone = () => {

// Context de la aplicacion
    const AppContext = useContext(appContext);
    const {mostrarAlerta, subirArchivo, cargando, crearEnlace} = AppContext;


 // Context de autenticación
    const AuthContext = useContext(authContext);
    const { usuario, autenticado } = AuthContext;



    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir, el Limite es 1MB, obten una cuenta gratis para subir archivos más grandes');
    }
    
    const onDropAccepted = useCallback( async (acceptedFiles) => {

        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);
        subirArchivo(formData, acceptedFiles[0].path);
    }, [])
    


//Extraer contenido dropzone
const {getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000})

const archivos = acceptedFiles.map(archivo => (

    <li className = "bg-white flex-1 p-3 mb-4 shadow-lg rounded" key={archivo.lastModified}>
        <p className="font-bold text-xl">{archivo.path}</p>
        <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024,2)).toFixed(2)} MB</p>
    </li>

))


    return ( 

        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
           
        {
            acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                 <ul>
                    {archivos}
                </ul>

                {
                    autenticado ? <Formulario /> : null
                }



                {
                    cargando ? (
                        <p className="text-center text-2xl">Subiendo...</p>
                    ) : (
                          <button
                            type="button"
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            onClick={() => crearEnlace(acceptedFiles[0].path)}
                        >
                            Crear Enlace
                        </button>
                    )
                }

                  

                </div>
            ) : (
                 <div {...getRootProps({ className : 'dropzone w-full py-32'})}>
                    <input className="h-100" {...getInputProps()} />

                    <div className="text-center">

                    {
                        isDragActive ? (
                            <p className="text-2xl text-gray-800 font-bold">Suelta el archivo</p>
                        ) : (
                            <p className="text-2xl font-bold text-gray-800">Arrastra tu archivo aqui</p>
                        )
                    }

                         <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10">Selecciona archivos para subir</button>
                </div>
            </div> 
            )                           
        }           
        </div>
     );

}
export default Dropzone;