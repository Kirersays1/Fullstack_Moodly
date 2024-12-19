import { User,UserEdit } from "../../types"

type UserFormProps = {
    user?: User
    userEdit?: UserEdit
}
const userOptions = [
    { name: 'I', value: 'I'},
    { name: 'A', value: 'A'}
]


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

          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="rol"
              >Rol:</label>
              <select
                  id="rol"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="rol"
                  defaultValue={user?.rol}
              >
                  {userOptions.map(option => (
                      <option key={option.name} value={option.value.toString()}>{option.name}</option>
                  ))}
              </select>
          </div>


      </>
  )
}

export function EditUserForm({userEdit}: UserFormProps) {
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
                    defaultValue={userEdit?.nombre}
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
                    defaultValue={userEdit?.password}
                />
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="rol"
                >Rol:</label>
                <select
                    id="rol"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="rol"
                    defaultValue={userEdit?.rol}
                >
                    {userOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>

        </>
    )
}
