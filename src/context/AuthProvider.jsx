import {useState, useEffect, createContext} from "react"
import clienteAxios from "../config/axios"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticaUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            //Cabeceras de autenticacion 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios.get("/veterinarios/perfil",config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.error)
                setAuth({})
               /* setAlerta({
                    Message : error.response.data.error,
                    Error: true
                });*/
            }
            setCargando(false)
        }
        autenticaUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos =>{
        const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            //Cabeceras de autenticacion 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = `/veterinarios/actualizarPerfil/${datos.id}`
                const {data} = await clienteAxios.put(url, datos, config)

                return{
                    Message : "Almacenado Correctamente"
                }
            } catch (error) {
                console.log(error.response.data.error)
            }
    }

    const guardarPassword = async (datos) =>{
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        //Cabeceras de autenticacion 
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = "/veterinarios/actualizarPassword"
            const {data} = await clienteAxios.put(url, datos, config)
            return{
                Messsage : data.message.message,
                Error : false
            }
        } catch (error) {
            return{
                Messsage :error.response.data.error,
                Error: true
            } 
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext