import { Material } from "../../types"

type UserFormProps = {
    user?: Material
}


export default function MaterialesForm({user} : UserFormProps) {
  return (
      <>
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="nombre"
              >Nombre del material didactico:</label>
              <input
                  id="tipo"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Material"
                  name="tipo"
                  defaultValue={user?.tipo}
              />
          </div>


          {/* Email */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="email"
              >Url:</label>
              <input
                  id="url"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Url del material"
                  name="url"
                  defaultValue={user?.url}
              />
          </div>



      </>
  )
}
