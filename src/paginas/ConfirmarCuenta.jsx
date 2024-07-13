import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    const {id} = params

    useEffect(() => {
      const confirmaCuentaa = async () => {

        try {
          
          const url = `/veterinarios/confirmar/${id}`
          const {data} = await clienteAxios.get(url)

          setCuentaConfirmada(true)
          setAlerta({
            Message : message.response.data.message,
            Error : false
          })

          
        } catch (error) {
          setAlerta({
            Message : error.response.data.error,
            Error : true
          })
        }

        setCargando(false)
      } 
      confirmaCuentaa() 
    }, [])
    

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Confirma tu Cuenta y Comienza a Administra {""}
                <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {!cargando && <Alerta
            alerta={alerta}
          />}

          {cuentaConfirmada && (
            <Link
            className="block text-ceneter my-5 text-gray-500"
            to="/">Iniciar Sesión</Link>
          ) }
        </div>
    </>
  )
}

export default ConfirmarCuenta