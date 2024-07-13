import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [codigoValido, setCodigoValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const {codigo} = params

  useEffect(() => {
    const ComprobarCodigo = async () => {
        try {
          await clienteAxios.get(`/veterinarios/olvide-password/${codigo}`)
          setAlerta({
            Message : "Coloca tu Nuevo Password",
            Error: false
          })
          setCodigoValido(true)
        } catch (error) {
          setAlerta({
            Message: "Hubo un error con el enlace",
            Error : true
          })
        }
    }
    ComprobarCodigo()
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        Message: "El password debe ser mínimo de 6 caracteres",
        Error: true
      })
      return
    }

    try {
      const url = `/veterinarios/olvide-password/${codigo}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        Message : data.message,
        Error: false
    });
    setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        Message : error.response.data.error,
        Error: true
    });
    }
  }

  const {Message} = alerta
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
            Reestablece tu password y no Pierdas Acceso a {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"> 
            {Message && <Alerta
                alerta={alerta}
            />}         
      
            {codigoValido && (
              <>              
                  <form onSubmit={handleSubmit}>
          
                  <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >
                                Nuevo Password
                            </label>
                            <input
                                type="password"
                                placeholder="Tu Nuevo Password"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                        type="submit"
                        value="Guardar Nuevo Password"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        />
                  </form>
                      
                   </>
            )}  

            {passwordModificado && 
                <Link
                      className="block text-ceneter my-5 text-gray-500"
                   to="/">Iniciar Sesión
                </Link>}
      </div>
    </>      
  )
}

export default NuevoPassword