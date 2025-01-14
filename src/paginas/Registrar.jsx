import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({Message: "Hay campos vacios", Error: true});
                return;
        }

        if(password !== repetirPassword){
            setAlerta({Message: "los password no son iguales", Error: true});
            return;
        }

        if(password.length < 6){
            setAlerta({Message: "El password es muy corto, agrega minimo 6 caracteres", Error: true});
            return;
        }

        setAlerta({})

        //Crear el usuario en la api
        try {
           
            const url  = await clienteAxios.post('/veterinarios/registrar', {nombre, email, password});
            setAlerta({
                Message: "Creado Correctamente, revisa tu email",
                Error: false
            });
        } catch (error) {
            //Error desde el backend
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
                Crea tu Cuenta y Administra tus {""}
                <span className="text-black">Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {Message && <Alerta
                alerta={alerta}
            />}
           <form
                onSubmit={handleSubmit}
           >
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Password
                    </label>
                    <input
                        type="password"
                        placeholder="Repite tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                    />
                </div>
                <input
                type="submit"
                value="Crear Cuenta"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                    className="block text-ceneter my-5 text-gray-500"
                 to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link
                    className="block text-ceneter my-5 text-gray-500"
                 to="/olvide-password">Olvide mi Password</Link>
           </nav>
        </div>
    </>
  )
}

export default Registrar