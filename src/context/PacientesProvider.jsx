import {useState, useEffect, createContext} from "react"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"

const PacientesContext = createContext()

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState([])
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.get("/pacientes", config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/actualizarPaciente/${paciente.id}`, paciente, config)
                
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === data.id ? data : pacienteState)
                setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error.response.data.error)
            }
        }else{

            try {                
                const {data} = await clienteAxios.post("/pacientes/agregarPaciente", paciente, config)
                console.log("setEd",data)
                setPacientes([data])
            } catch (error) {
                console.log(error.response.data.error)
            }
        }
    }

    const setEdicion = (paciente) => {
       setPaciente(paciente)
    }

    const eliminarPaciente = async id =>{
        
        const confirmar = confirm("Comfirmas que deseas eliminar")
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

               const {data} = await clienteAxios.delete(`/pacientes/eliminarPaciente/${id}`, config)

               const pacienteActualizado = pacientes.filter(pacienteState => pacienteState.id !== id)
               setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export{
    PacientesProvider
}

export default PacientesContext;  