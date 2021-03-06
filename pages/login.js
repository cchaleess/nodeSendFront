import React from 'react';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';
import {useRouter} from 'next/router';


const Login = () => {

//Definir context
const AuthContext = React.useContext(authContext);
const {mensaje, iniciarSesion, autenticado} = AuthContext;

//Next router
const router = useRouter();

React.useEffect(() => {
 
    if(autenticado){
        router.push('/');
    }

}, [autenticado])


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().required('El email es obligatorio').email('El email no es valido'),
            password: Yup.string().required('La contraseña no puede estar vacia')
        }),
            onSubmit: values => {
                iniciarSesion(values);
        }
    });


    return ( 
        <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">        
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar Sesion</h2>

            {mensaje && <Alerta mensaje={mensaje} />}
           
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" 
                        onSubmit={formik.handleSubmit}
                         >                     
                   
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                         <input type="email" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                placeholder="correo del usuario"
                                value={formik.values.email}
                                     onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                         />

                                {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>                                
                                </div>  
                        ) : null }
                        </div>


                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                         <input type="password" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                placeholder="ingrese password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                         />

                                 {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>                                
                                </div>  
                        ) : null }
                        </div>


                        <input 
                            type="submit" 
                            className = "bg-black hover:bg-gray-900 w-full text-white uppercase py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            value="Iniciar Sesion"                             
                            />

                    </form>
                  </div>
                  </div>

        </div>
        </Layout>
     );
}

export default Login;