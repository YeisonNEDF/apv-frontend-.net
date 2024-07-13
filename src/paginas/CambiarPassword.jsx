import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const {guardarPassword} = useAuth()
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    passwordActual : '',
    nuevoPassword : ''
  }) 
  

  const handleSubmit = async  e => {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        Message: "Todos los campos son obligatorios",
        Error: true
      })
      return
    }

    if(password.nuevoPassword.length < 6){
      setAlerta({
        Message: "El Password debe tener mínimo 6 caracteres",
        Error: true
      })
      return
  }
        const respuesta =  await guardarPassword(password)
        console.log(respuesta)
        console.log("sss",respuesta.message)
        const {Message, Error} = respuesta
        setAlerta({
          Message: respuesta.Message,
          Error: respuesta.Error
        })
}

  const {Message} = alerta

  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
            <span className="text-indigo-600 font-bold">Password aquí</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {Message && <Alerta alerta={alerta}/>}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="passwordActual"
                            placeholder="Escribe tu password actual"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nuevo Password</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nuevoPassword"
                            placeholder="Escribe tu nuevo password"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>
                   
                    <input
                        type="submit"
                        value="Actualizar Password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword