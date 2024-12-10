import { User } from "../types"

type UserFormProps = {
    user?: User
}

export default function UserForm({user} : UserFormProps) {
  return (
      <>
          {/* Nombre */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="nombre"
              >Nombre:</label>
              <input
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Usuario"
                  name="nombre"
                  defaultValue={user?.nombre}
              />
          </div>

          {/* Email */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="email"
              >Email:</label>
              <input
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del usuario"
                  name="email"
                  defaultValue={user?.email}
              />
          </div>

          {/* Password */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="password"
              >Contraseña:</label>
              <input
                  id="password"
                  type="password"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Contraseña"
                  name="password"
                  defaultValue={user?.password}
              />
          </div>

          {/* Rol */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="rol"
              >Rol:</label>
              <input
                  id="rol"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Rol del usuario"
                  name="rol"
                  defaultValue={user?.rol}
              />
          </div>


      </>
  )
}
